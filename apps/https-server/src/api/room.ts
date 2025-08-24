import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prisma";
import { Router } from "express";

export const room: Router = Router();

room.post("/makeRoom", async (req, res) => {
  const userId = req.id;
  const parsedBody = CreateRoomSchema.safeParse(req.body);
  if (!parsedBody.success || !userId) {
    res.json({
      ok: false,
      message: "incorrect input ",
    });
    return;
  }
  const test = await prismaClient.room.findFirst({
    where: {
      slug: parsedBody.data.slug,
    },
  });

  if (test) {
    return res.json({
      ok: false,
      message: "room already exists",
    });
  }

  const roomCreated = prismaClient.room
    .create({
      data: {
        slug: parsedBody.data.slug,
        adminID: userId,
      },
    })
    .then((e) => {
      console.error(e);
    });
  res.json({
    roomCreated,
  });
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

room.get("chats", async (req, res) => {
  const roomId = req.query.roomId || "";

  if (typeof roomId !== "number") {
    return res.json({ ok: false, message: "incorrect roomId format" });
  }
  prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 15,
  });
});
