import { Router } from "express";
import jwt from "jsonwebtoken";

import { JWT_KEY } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prisma";

const jwtKey = JWT_KEY;

export const security: Router = Router();

security.post("/login", (req, res) => {
  console.log("qwert");
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res
      .json({
        ok: false,
        message: "wrong data send ",
      })
      .status(403);
  }
  const encoded = jwt.sign({ id: data.data?.username }, jwtKey);
  res.json({
    token: encoded,
  });
});

security.post("signin", (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    res
      .json({
        ok: false,
        message: "wrong data send ",
      })
      .status(403);
  }
  res.json({});
});
