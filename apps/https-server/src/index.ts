import express from "express";
import rateLimit from "express-rate-limit";

import { security } from "./api/security";
import { middleware } from "./api/middleware";
import { room } from "./api/room";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST"],
};

const authLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: { error: 'Too many attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors(corsOptions));

app.use(express.json());

app.use("/v1/security", authLimiter, security);
app.use(cookieParser());

app.use(middleware);

app.use("/v1/room", room);

app.listen(3001);
