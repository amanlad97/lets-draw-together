import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prisma";
const jwtKey = JWT_KEY;
interface User {
  userId: number;
  rooms: number[];
  ws: WebSocket;
}
interface payload {
  type: "join" | "chat" | "leave";
  message: string;
  roomId: number;
}
const users: User[] = [];
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  if (!request.url) {
    return;
  }
  const queryParams = new URLSearchParams(request.url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const decoded = jwt.verify(token, jwtKey);
  if (!decoded || typeof decoded === "string") {
    ws.close();
    return;
  }
  users.push({ userId: decoded.id, ws: ws, rooms: [] });

  ws.on("message", async function message(message: String) {
    const payload: payload = JSON.parse(message.toString());
    switch (payload.type) {
      case "chat":
        const res = await prismaClient.chat.create({
          data: {
            roomId: payload.roomId,
            userId: decoded.id,
            message: payload.message,
          },
        });
        console.log(users, payload);
        users.forEach((user) => {
          if (user.rooms.includes(payload.roomId)) {
            console.log(user, payload);
            user.ws.send(
              JSON.stringify({
                message: payload.message,
                type: payload.type,
              })
            );
          }
        });
        break;

      case "join":
        users.find((user) => {
          user.rooms.push(payload.roomId);
        });
        break;

      case "leave":
        users.find((user) => {
          user.rooms = user.rooms.filter((x) => x !== payload.roomId);
        });
        break;

      default:
        break;
    }
  });
});
