import express from "express";
import { security } from "./api/security";
const app = express();
app.use(express.json());
app.use("/security", security);
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next(); // Pass control to the next middleware or route handler
});
app.listen(3001);
