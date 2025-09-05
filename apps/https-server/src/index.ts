import express from "express";

import { security } from "./api/security";
import { middleware } from "./api/middleware";
import { room } from "./api/room";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/v1/security", security);

app.use(middleware);

app.use("/v1/room", room);

app.listen(3001);
