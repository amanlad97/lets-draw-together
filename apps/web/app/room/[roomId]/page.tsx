"use client";
import { use, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";
import { useRouter } from "next/navigation";
import ToolButtons from "@repo/ui/ToolButton";
import { getExistingShapes } from "./https";
import { Game } from "@repo/common/game";
import { UseResize } from "../../hooks/useResize";
import useConnectWebSocket from "../../hooks/UseWebsocket";
import { UseUser } from "../../hooks/UseUser";

const Dashboard = (props: PageProps<"/room/[roomId]">) => {
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const { roomId } = use(props.params);
  const size = UseResize();
  const router = useRouter();
  const user = UseUser();
  const ws = useConnectWebSocket(roomId ? parseInt(roomId) : undefined);
  useEffect(() => {
    const canvas = drawingRef.current;
    if (!user) {
      router.push("/signin");
      return;
    }
    if (!ws) {
      router.push("/room");
      return;
    }
    if (canvas && ws.current) {
      canvas.width = size.width;
      canvas.height = size.height;
      canvas.style.background = "black";

      const game = new Game(
        canvas,
        parseInt(roomId),
        ws.current,
        getExistingShapes
      );

      gameRef.current = game;
      game.selectShape("rectangle");
      setLoading(false);

      return () => {
        game.destroy();
      };
    }
  }, [roomId, router, size, ws, user]);

  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      <ToolButtons gameRef={gameRef} />
      <canvas ref={drawingRef} className="flex-1"></canvas>
    </div>
  );
};

export default Dashboard;
