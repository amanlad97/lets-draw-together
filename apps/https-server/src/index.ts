import express from "express";

import { security } from "./api/security";
import { middleware } from "./api/middleware";
import { room } from "./api/room";
import cors from "cors";
const app = express();
//TODO-add cors sources
app.use(cors());
app.use(express.json());

app.use("/v1/security", security);

app.use(middleware);

app.use("/v1/room", room);

app.listen(3001);
