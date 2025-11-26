import { RefObject, useEffect, useRef } from "react";
import { WEBSOCKET_URL } from "@repo/common/utils";

export default function UseWebSocket(
  roomId: number
): RefObject<WebSocket | undefined> {
  const wsRef = useRef<WebSocket>(undefined);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!roomId) {
      return;
    }
    try {
      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);
      wsRef.current = ws;
      console.log("we got till try block with ", token, ws);
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
  }, [roomId]);

  return wsRef;
}
