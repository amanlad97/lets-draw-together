import { useEffect, useRef } from "react";
import { WEBSOCKET_URL } from "@repo/common/utils";
import { UseUser } from "./UseUser";

export default function useConnectWebSocket(roomId: number | undefined) {
  const wsRef = useRef<WebSocket | undefined>(undefined);
  const  user = UseUser();
  useEffect(() => {
    if (!roomId || !user?.token) {
      return;
    }

    try {
      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${user.token}`);
      wsRef.current = ws;
      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(JSON.stringify({ type: "join", roomId, message: "" }));
      };

      ws.onclose = () => console.log("WebSocket closed");
      ws.onerror = (err) => console.error("WebSocket error", err);
    } catch (error) {
      console.error(error);
      throw Error("something went wrong with websocket connection");
    }
  }, [roomId, user]);

  return wsRef;
}
