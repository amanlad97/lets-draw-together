import { useContext, useEffect, useRef } from "react";
import { WEBSOCKET_URL } from "@repo/common/utils";
import { User, UseUser } from "../provider";

export default function useConnectWebSocket(roomId: number | null) {
  const { state, dispatch } = UseUser();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId || !state.user?.token) {
      throw new Error("missing token or roomId");
    }

    try {
      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${state.user.token}`);
      wsRef.current = ws;
      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(JSON.stringify({ type: "join", roomId, message: "" }));
        dispatch({ type: "SET_ROOMS", payload: { [roomId]: ws } });
      };

      ws.onclose = () => console.log("WebSocket closed");
      ws.onerror = (err) => console.error("WebSocket error", err);
    } catch (error) {
      console.error(error);
      throw Error("something went wrong with websocket connection");
    }
  }, [roomId, state?.user?.token]);

  return wsRef;
}
