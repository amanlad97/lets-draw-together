"use client";
import { useEffect, useRef, useState } from "react";
import { Game } from "./game";
import { connectWebSocket } from "./websocket";
import { ShapeType } from "./types";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";

const ToolButtons = ({ activeShape, setActiveShape }: ToolButtonsProps) => {
  const tools: ShapeType[] = ["pencil", "rectangle", "circle"];

  return (
    <div className="grid grid-cols-3 ">
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => setActiveShape(tool)}
          className={`px-4 py-2 ${
            activeShape === tool
              ? "bg-amber-50 text-black rounded-2xl"
              : "text-white bg-black"
          }`}
        >
          {tool}
        </button>
      ))}
    </div>
  );
};
const Dashboard = () => {
  const drawing = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");
  useEffect(() => {
    const canvas = drawing.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "black";

    const ws = connectWebSocket(12);
    const game = new Game(canvas, 12, ws);
    gameRef.current = game;
    game.final.finally(() => {
      console.log("loaded");
      game.selectShape("rectangle");
      setActiveShape("rectangle");
      setLoading(false);
    });

    const handleResize = () => {
      if (drawing.current) {
        drawing.current.width = window.innerWidth;
        drawing.current.height = window.innerHeight;
      }
    };
    console.log(loading);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ws.close();
      game.destroy();
    };
  });

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.selectShape(activeShape);
    }
  }, [activeShape]);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <ToolButtons activeShape={activeShape} setActiveShape={setActiveShape} />
      <canvas ref={drawing} className="w-screen h-screen"></canvas>
    </div>
  );
};

type ToolButtonsProps = {
  activeShape: ShapeType;
  setActiveShape: (shape: ShapeType) => void;
};

export default Dashboard;
