"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@repo/common/utils";
import useConnectWebSocket from "../hooks/UseWebsocket";

type LoadingState = "create" | "join" | null;

type MakeRoomRes = { room: { id: string; slug: string } };
type JoinRoomRes = { id: string };

export default function Room() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState<LoadingState>(null);
  const [message, setMessage] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);

  useConnectWebSocket(roomId ? parseInt(roomId) : null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) {
      router.replace("/signin");
      return;
    }
    setToken(stored);
  }, [router]);

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

  const handleRequest = useCallback(
    async (type: "create" | "join") => {
      if (!token) return;
      const slug = normalize(roomName);
      if (!slug) {
        setMessage("Please enter a room name.");
        return;
      }
      try {
        setLoading(type);
        if (type === "create") {
          const res = await axios.post<MakeRoomRes>(
            `${BACKEND_URL}/v1/room/makeRoom`,
            { slug },
            { headers: { token }, validateStatus: (s) => s < 500 }
          );
          if (res.status === 200 || res.status === 201) {
            setMessage(`Room created: ${res.data.room.slug}`);
            setRoomId(res.data.room.id);
            router.push(`/room/${res.data.room.id}`);
          } else if (res.status === 409) {
            setMessage("Room already exists");
          } else {
            setMessage("Error creating room");
          }
        } else {
          const res = await axios.get<JoinRoomRes>(
            `${BACKEND_URL}/v1/room/joinRoom`,
            {
              params: { room: slug },
              headers: { token },
            }
          );
          if (res.status === 200) {
            setMessage(`Joined room: ${slug}`);
            setRoomId(res.data.id);
            router.push(`/room/${res.data.id}`);
          } else if (res.status === 404) {
            setMessage("Room not found");
          } else {
            setMessage("Error joining room");
          }
        }
      } catch {
        setMessage("Network or server error");
      } finally {
        setLoading(null);
      }
    },
    [token, roomName, router]
  );

  if (!token) return null;

  const buttonClass =
    "hover:bg-amber-300 hover:text-gray-900 hover:shadow-md p-3 bg-gray-700 rounded-xl text-white font-bold disabled:opacity-50";

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-900 text-white rounded-xl p-8 flex flex-col items-center shadow-2xl">
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          className="m-3 p-3 rounded-xl bg-black focus:outline-none text-gray-300"
        />
        <div className="flex gap-4">
          <button
            onClick={() => handleRequest("create")}
            disabled={loading !== null}
            className={buttonClass}
          >
            {loading === "create" ? "...creating" : "Create Room"}
          </button>
          <button
            onClick={() => handleRequest("join")}
            disabled={loading !== null}
            className={buttonClass}
          >
            {loading === "join" ? "...joining" : "Join Room"}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
