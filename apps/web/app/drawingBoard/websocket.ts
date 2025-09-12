export const connectWebSocket = (roomId: number): WebSocket => {
  const token = localStorage.getItem("token");
  const ws = new WebSocket(`ws://localhost:8080?token=${token}`);
  ws.onopen = (event: Event) => {
    console.log("WebSocket connected:", event);
    joinRoom(ws, roomId);
  };
  return ws;
};
const joinRoom = (ws: WebSocket, roomId: number): void => {
  ws.send(
    JSON.stringify({
      type: "join",
      roomId,
      message: "",
    })
  );
};
