"use client";
import { useEffect, useRef, useState } from "react";
import { connectWebSocket } from "./websocket";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";
import { useRouter } from "next/navigation";
import ToolButtons from "@repo/ui/ToolButton";
import { getExistingShapes } from "./https";
import { Game } from "@repo/common/game";

const Dashboard = () => {
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const canvas = drawingRef.current;
    if (!canvas) return;
    canvas.style.background = "black";
    const ws = connectWebSocket(12);
    const game = new Game(canvas, 12, ws, getExistingShapes);
    gameRef.current = game;

    game.final.finally(() => {
      console.log("loaded");
      game.selectShape("rectangle");
      setLoading(false);
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      ws.close();
      game.destroy();
    };
  }, []);

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
//need to fix this 
  }, );

  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1"></canvas>
    </div>
  );
};

export default Dashboard;
