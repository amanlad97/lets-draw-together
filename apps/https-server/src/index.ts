import express from "express";
import { security } from "./api/security";
const app = express();
app.use(express.json());
app.use("/security", security);
app.listen(3001);
