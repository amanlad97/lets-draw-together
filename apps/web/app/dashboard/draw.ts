import axios from "axios";
import { BACKEND_URL } from "../config";
import { connectWebSocket, joinRoom } from "./websocket";

type Shape = { x: number; y: number; width: number; height: number };

type ExistingShapesResponse = {
  ws: WebSocket;
  chats: Shape[];
};

function normalizeShape(shape: Shape): Shape {
  let { x, y, width, height } = shape;

  if (width < 0) {
    x += width;
    width = Math.abs(width);
  }
  if (height < 0) {
    y += height;
    height = Math.abs(height);
  }

  return { x, y, width, height };
}

export const draw = async (canvas: HTMLCanvasElement): Promise<void> => {
  const { chats, ws } = await getExistingShapes(12);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "black";

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const final: Shape[] = [...chats];
  let isclicked = false;
  let x = 0;
  let y = 0;

  const renderAllShapes = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    final.forEach((r) => {
      ctx.strokeRect(r.x, r.y, r.width, r.height);
    });
  };

  const sendShape = (ws: WebSocket, shape: Shape) => {
    const message = JSON.stringify({
      type: "chat",
      roomId: 12,
      message: JSON.stringify(shape),
    });
    ws.send(message);
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "chat" && data.message) {
        const shape: Shape = normalizeShape(JSON.parse(data.message));
        final.push(shape);
        renderAllShapes();
      }
    } catch (err) {
      console.error("Error parsing WS message:", err);
    }
  };

  renderAllShapes();

  const mousedown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    isclicked = true;
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  };

  const mousemove = (event: MouseEvent) => {
    if (isclicked) {
      const width = event.clientX - x;
      const height = event.clientY - y;
      renderAllShapes();
      ctx.strokeRect(x, y, width, height);
    }
  };

  const mouseup = (event: MouseEvent) => {
    if (isclicked) {
      const rawShape: Shape = {
        x,
        y,
        width: event.clientX - x,
        height: event.clientY - y,
      };
      const shape = normalizeShape(rawShape);
      sendShape(ws, shape);
      final.push(shape);
      isclicked = false;
      renderAllShapes();
    }
  };

  canvas.addEventListener("mousedown", mousedown);
  canvas.addEventListener("mouseup", mouseup);
  canvas.addEventListener("mousemove", mousemove);
};

const getExistingShapes = async (
  roomId: number
): Promise<ExistingShapesResponse> => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BACKEND_URL}/v1/room/chats`, {
      params: { roomId },
      headers: { token },
    });

    const formateChats = (chats: {
      data: { response: string[]; ok: boolean };
    }): Shape[] => {
      return chats.data.response.map((element) => {
        return JSON.parse(element);
      });
    };
    const ws = connectWebSocket();
    joinRoom(ws, 12);
    return { ws, chats: formateChats(res) };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
