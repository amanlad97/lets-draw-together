import express from "express";

import { security } from "./api/security";
import { middleware } from "./api/middleware";
import { room } from "./api/room";

const app = express();
app.use(express.json());

app.use("/security", security);

app.use(middleware);

app.use("/room", room);

app.listen(3001);
