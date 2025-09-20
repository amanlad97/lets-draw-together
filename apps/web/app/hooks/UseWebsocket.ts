import { useContext, useEffect, useRef } from "react";
import { WEBSOCKET_URL } from "@repo/common/utils";
import { User } from "../provider";

export default function useConnectWebSocket(roomId: number | null) {
  const { dispatch, state } = useContext(User) || {
    dispatch: null,
    state: null,
  };
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId || !state?.user?.token || !dispatch) return;

    const ws = new WebSocket(`${WEBSOCKET_URL}?token=${state.user.token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "join", roomId, message: "" }));
      dispatch({ type: "SET_ROOMS", payload: { [roomId]: ws } });
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (err) => console.error("WebSocket error", err);
  }, [roomId, state?.user?.token, dispatch]);

  return wsRef;
}
