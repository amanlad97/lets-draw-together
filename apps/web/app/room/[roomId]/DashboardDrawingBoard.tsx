"use client";
import { useEffect, useRef } from "react";
import ToolButtons from "@repo/ui/ToolButton";
import { Game } from "@repo/common/game";
import { UseResize } from "../../hooks/useResize";
import { Shape } from "@repo/common/shapeTypes";
import UseWebSocket from "../../hooks/UseWebsocket";

const DashboardDrawingBoard = (props: {
  roomId: number;
  existingShapes: Shape[];
}) => {
  const { roomId, existingShapes } = props;
  const ws = UseWebSocket(roomId);
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const size = UseResize();

  useEffect(() => {
    const canvas = drawingRef.current;
    if (canvas && ws.current) {
      canvas.width = size.width;
      canvas.height = size.height;
      canvas.style.background = "black";
      const game = new Game(canvas, roomId, ws.current, existingShapes);

      gameRef.current = game;
      game.selectShape("rectangle");

      return () => {
        game.destroy();
      };
    }
  }, [roomId, size, ws, existingShapes]);
  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden">
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1"></canvas>
    </div>
  );
};

export default DashboardDrawingBoard;
