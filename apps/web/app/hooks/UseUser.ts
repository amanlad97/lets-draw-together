import { useContext } from "react";
import { User } from "../provider/provider";

export const UseUser = () => {
  const ctx = useContext(User);
  if (!ctx) {
    throw new Error("context is undefined");
  }
  return ctx;
};
