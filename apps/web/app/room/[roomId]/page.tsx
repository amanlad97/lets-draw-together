"use client";
import { use, useContext, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";
import { useRouter } from "next/navigation";
import ToolButtons from "@repo/ui/ToolButton";
import { getExistingShapes } from "./https";
import { Game } from "@repo/common/game";
import { UseResize } from "../../hooks/useResize";
import { UseUser } from "../../hooks/UseUser";

const Dashboard = (props: PageProps<"/room/[roomId]">) => {
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const { roomId } = use(props.params);
  const { state } = UseUser();
  const size = UseResize();
  const router = useRouter();

  useEffect(() => {
    const canvas = drawingRef.current;
    const ws = state.rooms?.[roomId];
    if (!ws || !localStorage.getItem("token")) {
      router.push("/room");
      return;
    }
    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
      canvas.style.background = "black";

      const game = new Game(canvas, parseInt(roomId), ws, getExistingShapes);

      gameRef.current = game;
      game.selectShape("rectangle");
      setLoading(false);

      return () => {
        ws.close();
        game.destroy();
      };
    }
  }, [roomId, router, size, state]);

  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1"></canvas>
    </div>
  );
};

export default Dashboard;
