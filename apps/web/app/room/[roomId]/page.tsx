"use client";
import { use, useEffect, useRef, useState } from "react";
import { connectWebSocket } from "../../hooks/websocket";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";
import { useRouter } from "next/navigation";
import ToolButtons from "@repo/ui/ToolButton";
import { getExistingShapes } from "./https";
import { Game } from "@repo/common/game";

const Dashboard = (props: PageProps<"/room/[roomId]">) => {
  const { roomId } = use(props.params);
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const canvas = drawingRef.current;
    if (!canvas) return;
    canvas.style.background = "black";
    const ws = connectWebSocket(parseInt(roomId));
    const game = new Game(canvas, parseInt(roomId), ws, getExistingShapes);
    gameRef.current = game;

    game.selectShape("rectangle");
    setLoading(false);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      ws.close();
      game.destroy();
    };
  }, [roomId]);

  useEffect(() => {
    const handleResize = () => {
      if (!localStorage.getItem("token")) {
        router.push("/signin");
        return;
      }
      const canvas = drawingRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1"></canvas>
    </div>
  );
};

export default Dashboard;
