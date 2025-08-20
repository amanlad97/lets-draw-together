import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwtKey = process.env.JWT_KEY || "";
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws, request) {
  if (!request.url) {
    return;
  }
  const queryParams = new URLSearchParams(request.url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const decoded = jwt.verify(token, jwtKey);
  if (!decoded || !(decoded as JwtPayload).id) {
    ws.close();
    return;
  }

  ws.on("message", function message(message) {
    ws.send("pong");
  });
});
