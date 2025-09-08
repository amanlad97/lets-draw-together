"use client";
import { useEffect, useRef } from "react";
import { draw } from "./draw";

const Dashboard = () => {
  const drawing = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (drawing.current) {
      const canvas = drawing.current;
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      draw(canvas);
    }
  }, [drawing]);
  return <canvas ref={drawing} className="w-screen h-screen"></canvas>;
};
export default Dashboard;
