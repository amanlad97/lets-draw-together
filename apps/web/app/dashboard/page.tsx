"use client";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const drawing = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (drawing.current) {
      const canvas = drawing.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillRect(30, 30, 30, 30);
      ctx.stroke();
      console.log(ctx);
    }
  }, [drawing]);
  return <canvas ref={drawing} className="w-screen h-screen"></canvas>;
};
export default Dashboard;
