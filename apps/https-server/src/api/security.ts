import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_KEY } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema } from "@repo/common/zodTypes";
import { prismaClient } from "@repo/db/prisma";

const jwtKey = JWT_KEY;
export const security: Router = Router();

security.post("/signin", async (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(403).json({ ok: false, message: "Invalid input" });
  }

  const user = await prismaClient.user.findFirst({
    where: { username: data.data.username },
    select: { id: true, password: true, name: true },
  });

  if (!user) {
    return res.status(401).json({ ok: false, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    data.data.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, jwtKey, { expiresIn: "1d" });

  res.cookie("token", token).json("token sent!!");
});

security.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(403).json({ ok: false, message: "Invalid input" });
  }

  const existCheck = await prismaClient.user.findFirst({
    where: { username: data.data.username },
  });

  if (existCheck) {
    return res.status(400).json({ ok: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(data.data.password, 10);

  await prismaClient.user.create({
    data: {
      username: data.data.username,
      password: hashedPassword,
      name: data.data.name,
    },
  });

  res.status(200).json({ ok: true, message: "Signup successful!" });
});
