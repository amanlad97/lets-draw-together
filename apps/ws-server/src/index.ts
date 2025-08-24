import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_KEY } from "@repo/backend-common/config";
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
  //TODO: put the token in header
  const queryParams = new URLSearchParams(request.url.split("?")[1]);
  const token = queryParams.get("token") || "";

  try {
    const decoded = jwt.verify(token, jwtKey);
    if (!decoded || typeof decoded === "string") {
      ws.close();
      return;
    }
    users.push({ userId: decoded.id, ws: ws, rooms: [] });
  } catch (error) {
    console.log(error);
  }
  ws.on("message", function message(message: String) {
    console.log(users);
    const payload: payload = JSON.parse(message.toString());
    switch (payload.type) {
      case "chat":
        users.forEach((user) => {
          if (user.rooms.includes(payload.roomId)) {
            user.ws.send(
              JSON.stringify({ message: payload.message, chat: payload.type })
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
