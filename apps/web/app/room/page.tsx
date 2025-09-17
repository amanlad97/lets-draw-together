"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@repo/common/utils";

const Room = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/signin");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const onclick = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/v1/room/makeRoom`,
        { slug: inputRef.current?.value },
        { headers: { token } }
      );
      //TODO-logic needs to be added
      console.log("Room", res.data);
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  if (!token) return null;

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-900 text-white flex rounded-xl p-8 flex-col items-center shadow-2xl">
          <input
            ref={inputRef}
            placeholder="Want to join a room?"
            className="m-3 p-3 rounded-xl bg-black focus:outline-none text-gray-400"
          />
          <button
            onClick={onclick}
            className="hover:bg-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-gray-100 active:bg-white active:text-black p-3 bg-gray-700 rounded-xl text-white font-bold"
          >
            JOIN ROOM
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
