import express from "express";
import { security } from "./api/security";
import { middleware } from "./api/middleware";
const app = express();
app.use(express.json());
app.use("/security", security);

app.use(middleware);
app.listen(3001);
