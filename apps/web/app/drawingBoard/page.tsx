"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { Game } from "./game";
import { connectWebSocket } from "./websocket";
import { ShapeType } from "./types";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";
import { useRouter } from "next/navigation";

const ToolButtons = ({ gameRef }: { gameRef: RefObject<Game | null> }) => {
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");
  const tools: ShapeType[] = ["pencil", "rectangle", "circle"];
  if (!gameRef.current) return;
  return (
    <div className="grid grid-cols-3 bg-gray-500">
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => {
            setActiveShape(tool);
            gameRef.current?.selectShape(activeShape);
          }}
          className={`px-4 py-2 ${
            activeShape === tool
              ? "bg-amber-50 text-black rounded-2xl"
              : "text-white"
          }`}
        >
          {tool}
        </button>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
      return;
    }

    const canvas = drawingRef.current;
    if (!canvas) return;
    console.log("here");
    canvas.style.background = "black";
    const ws = connectWebSocket(12);
    const game = new Game(canvas, 12, ws);
    gameRef.current = game;

    game.final.finally(() => {
      console.log("loaded");
      game.selectShape("rectangle");
      setLoading(false);
    });

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    return () => {
      ws.close();
      game.destroy();
    };
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = drawingRef.current;
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1" />
    </div>
  );
};

export default Dashboard;
