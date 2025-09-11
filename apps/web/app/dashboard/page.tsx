"use client";
import { useEffect, useRef, useState } from "react";
import { Game } from "./game";
import { connectWebSocket } from "./websocket";

type Shape = "pencil" | "rectangle" | "circle";

const Dashboard = () => {
  const drawing = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [activeShape, setActiveShape] = useState<Shape>("rectangle");

  useEffect(() => {
    const canvas = drawing.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.background = "black";

      const ws = connectWebSocket(12);
      const game = new Game(canvas, 12, ws);
      gameRef.current = game;

      game.selectShape("rectangle");
      setActiveShape("rectangle");

      return () => {
        ws.close();
        game.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.selectShape(activeShape);
    }
  }, [activeShape]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = drawing.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ToolButtons activeShape={activeShape} setActiveShape={setActiveShape} />
      <canvas ref={drawing} className="w-screen h-screen"></canvas>
    </div>
  );
};

type ToolButtonsProps = {
  activeShape: Shape;
  setActiveShape: (shape: Shape) => void;
};

const ToolButtons = ({ activeShape, setActiveShape }: ToolButtonsProps) => {
  const tools: Shape[] = ["pencil", "rectangle", "circle"];

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

export default Dashboard;
