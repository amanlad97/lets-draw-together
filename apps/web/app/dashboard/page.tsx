"use client";
import { useEffect, useRef } from "react";
import { Game } from "./game";
import { connectWebSocket } from "./websocket";

const Dashboard = () => {
  const drawing = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = drawing.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.background = "black";
      const ws = connectWebSocket(12);

      const game = new Game(canvas, 12, ws);
      game.selectShape("pencil");


      return () => {
        ws.close();
        game.destroy();
      };
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const canvas = drawing.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <canvas ref={drawing} className="w-screen h-screen"></canvas>
    </div>
  );
};

export default Dashboard;
