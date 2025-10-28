import { useContext } from "react";
import { User } from "../provider/provider";

export const UseUser = () => {
  const ctx = useContext(User);
  return ctx;
};
