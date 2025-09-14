import { JWT_KEY } from "@repo/backend-common/config";
import { Router } from "express";
import jwt from "jsonwebtoken";

export const middleware: Router = Router();

middleware.use((req, res, next) => {
  const token = req.headers["token"];
  console.log(req, token);
  if (!token || Array.isArray(token)) {
    return res.status(401).json({
      ok: false,
      message: "token not found",
    });
  }

  try {
    const decrypt = jwt.verify(token, JWT_KEY);
    if (typeof decrypt === "string") {
      return res.status(403).json({ ok: false, message: "invalid token" });
    }

    req.id = decrypt.id;
    next();
  } catch (err) {
    return res.status(403).json({ ok: false, message: "invalid token" });
  }
});
