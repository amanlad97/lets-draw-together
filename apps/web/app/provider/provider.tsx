"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type stateType =
  | {
      token: string;
      name: string;
    }
  | undefined;

export const User = createContext<stateType>(undefined);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<stateType>(undefined);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        console.log(stored);
        const parsed = JSON.parse(stored);
        if (parsed && parsed.token) setUser(parsed);
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, []);

  return <User value={user}>{children}</User>;
};
