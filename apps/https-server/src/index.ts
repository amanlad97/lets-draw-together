import express from "express";
import { security } from "./api/security";
const app = express();
app.use(express.json());
app.use("/security", security);

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});
app.listen(3001);
