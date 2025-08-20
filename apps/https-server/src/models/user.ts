import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
});
const userModel = new mongoose.Model("user", User);
