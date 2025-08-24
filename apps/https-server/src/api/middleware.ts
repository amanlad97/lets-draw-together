import { JWT_KEY } from "@repo/backend-common/config";
import { Router } from "express";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

export const middleware: Router = Router();

middleware.use((req, res, next) => {
  const token = req.get("token");
  if (!token) {
    res.json({
      ok: false,
      message: "token not found",
    });
    return;
  }

  const decrypt = jwt.verify(token, JWT_KEY);
  if (typeof decrypt === "string") {
    console.error("decrypt is a string ");
    return;
  }
  req.id = decrypt.id;
  next();
});
