import { CreateRoomSchema } from "@repo/common/zodTypes";
import { prismaClient } from "@repo/db/prisma";
import { Router } from "express";

export const room: Router = Router();
room.post("/makeRoom", async (req, res) => {
  try {
    const userId = req.id;
    const parsedBody = CreateRoomSchema.safeParse(req.body);

    if (!parsedBody.success || !userId) {
      return res.json({ ok: false, message: "incorrect input" });
    }

    const existing = await prismaClient.room.findFirst({
      where: { slug: parsedBody.data.slug },
    });

    if (existing) {
      res.json({ ok: false, message: "room already exists" }).status(409);
      return;
    }

    const roomCreated = await prismaClient.room.create({
      data: {
        slug: parsedBody.data.slug,
        adminID: userId,
      },
      select: { id: true },
    });

    return res.json({ ok: true, room: roomCreated });
  } catch (err) {
    console.error("Error creating room:", err);
    return res
      .status(500)
      .json({ ok: false, message: "internal server error" });
  }
});

room.get("/joinRoom", async (req, res) => {
  const roomSlug = req.query.room;
  if (typeof roomSlug !== "string") return;
  const client = await prismaClient.room.findFirst({
    where: {
      slug: roomSlug,
    },
    select: { id: true },
  });

  if (!client) return res.json({ ok: false, message: "room doesnt exist" });
  res.json({
    ok: true,
    id: client.id,
  });
});

room.get("/chats", async (req, res) => {
  const roomId = req.query.roomId || "";
  if (typeof roomId !== "string") {
    return res.json({ ok: false, message: "incorrect roomId format" });
  }
  const parsedRoomId = parseInt(roomId);

  const response = await prismaClient.chat.findMany({
    where: {
      roomId: parsedRoomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 15,
  });

  res.json({ ok: true, response });
});
