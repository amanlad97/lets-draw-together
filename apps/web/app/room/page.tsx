"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@repo/common/utils";

export default function Room() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<"create" | "join" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  //TODO- in future if we scale have to make a generic funtion rather than using 2 different funtions and have a json file for translation
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/signin");
    } else {
      setToken(storedToken);
    }
  }, [router]);
  const className = {
    button:
      "hover:bg-amber-300 hover:text-gray-900 hover:shadow-md p-3 bg-gray-700 rounded-xl text-white font-bold disabled:opacity-50",
  };
  const createRoom = async () => {
    if (!token) return;
    const slug = inputRef.current?.value.trim();
    if (!slug) return setMessage("Please enter a room name.");

    try {
      setLoading("create");
      const res = await axios.post(
        `${BACKEND_URL}/v1/room/makeRoom`,
        { slug },
        {
          headers: { token },
          validateStatus: (s) => s < 500,
        }
      );
      if (res.status === 200 || res.status === 201) {
        setMessage(`Room created: ${res.data.room.slug}`);
      } else if (res.status === 409) {
        setMessage("Room already exists");
      } else {
        setMessage(res.data?.message || "Error creating room");
      }
    } catch (err) {
      setMessage("Network or server error");
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const joinRoom = async () => {
    if (!token) return;
    const slug = inputRef.current?.value.trim();
    if (!slug) return setMessage("Please enter a room name.");

    try {
      setLoading("join");
      const res = await axios.get(`${BACKEND_URL}/v1/room/joinRoom`, {
        params: { room: slug },
        headers: { token },
      });
      if (res.status === 200) {
        setMessage(`Joined room: ${slug}`);
        router.push(`/room/${res.data.id}`);
      } else if (res.status === 404) {
        setMessage("Room not found");
      } else {
        setMessage(res.data?.message || "Error joining room");
      }
    } catch (err) {
      setMessage("Network or server error");
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  if (!token) return null;

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-900 text-white flex rounded-xl p-8 flex-col items-center shadow-2xl">
          <input
            ref={inputRef}
            placeholder="Room name"
            className="m-3 p-3 rounded-xl bg-black focus:outline-none text-gray-400"
          />
          <div className="flex gap-4">
            <button
              onClick={createRoom}
              disabled={loading !== null}
              className={className.button}
            >
              {loading === "create" ? "...creating" : "Create Room"}
            </button>
            <button
              onClick={joinRoom}
              disabled={loading !== null}
              className={className.button}
            >
              {loading === "join" ? "...joining" : "Join Room"}
            </button>
          </div>
          {message && (
            <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
