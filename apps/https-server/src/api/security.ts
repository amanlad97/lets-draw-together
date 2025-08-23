import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_KEY } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prisma";

const jwtKey = JWT_KEY;

export const security: Router = Router();

security.post("/signin", async (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.data || !data.success) {
    return res
      .json({
        ok: false,
        message: "wrong data send ",
      })
      .status(403);
  }
  const temp = await prismaClient.user.findFirst({
    where: {
      username: data.data.username,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!temp) return;
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.compare(
    data.data.password,
    temp.password
  );

  const encoded = jwt.sign({ id: temp.id }, jwtKey);
  res.json({
    token: encoded,
  });
});

security.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.data || !data.success) {
    return res
      .json({
        ok: false,
        message: "wrong data send ",
      })
      .status(403);
  }
  const existCheck = prismaClient.user.findFirst({
    where: {
      username: data.data.username,
    },
  });

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(data.data?.password, salt);
  const temp = await prismaClient.user
    .create({
      data: {
        username: data.data.username,
        password: hashedPassword,
        name: data.data.name,
      },
    })
    .catch((error) => {
      res.json({
        ok: false,
        message: "oops something went wrong",
        error,
      });
    });
  res
    .json({
      ok: true,
      message: "signup was successful !!!",
    })
    .status(200);
});
