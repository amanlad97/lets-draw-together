export const connectWebSocket = (): WebSocket => {
  const token = localStorage.getItem("token");
  const ws = new WebSocket(`ws://localhost:8080?token=${token}`);
  ws.onopen = (event: Event) => {
    console.log("WebSocket connected:", event);
  };
  return ws;
};
export const joinRoom = (ws: WebSocket, roomId: number): void => {
  ws.send(
    JSON.stringify({
      type: "join",
      roomId,
      message: "",
    })
  );
};
