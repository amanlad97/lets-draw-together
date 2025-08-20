import { Router } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
const jwtKey = process.env.JWT_KEY || "";

export const security: Router = Router();
const userSchema = z.object({
  username: z.string().min(8, "minimum 8 charaters requierd "),
  password: z.string().min(8, "minimum 8 charaters requierd "),
});
security.post("login", (req, res) => {
  
  const { username, password } = userSchema.parse(req.body);

  const encoded = jwt.sign({ id: username }, jwtKey);
  res.json({
    token: encoded,
  });

});
