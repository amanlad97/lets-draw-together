import express from "express";

import { security } from "./api/security";
import { middleware } from "./api/middleware";
import { room } from "./api/room";

const app = express();
app.use(express.json());

app.use("/v1/security", security);

app.use(middleware);

app.use("/v1/room", room);

app.listen(3001);
