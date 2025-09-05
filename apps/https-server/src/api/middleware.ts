import { JWT_KEY } from "@repo/backend-common/config";
import { Router } from "express";
import cookieParser from "cookie-parser";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

export const middleware: Router = Router();
middleware.use(cookieParser());
middleware.use((req, res, next) => {
  const token = req.cookies.token;
  // res.json(token);
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
