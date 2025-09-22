"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface stateType {
  user: null | {
    token: string;
    name: string;
  };
  rooms: null | Record<string, WebSocket>;
}

type Action =
  | { type: "SET_USER"; payload: { token: string; name: string } }
  | { type: "SET_ROOMS"; payload: Record<string, WebSocket> }
  | { type: "CLEAR_USER" };

const reduceFunction = (prev: stateType, action: Action): stateType => {
  switch (action.type) {
    case "SET_USER":
      return { ...prev, user: action.payload };
    case "SET_ROOMS":
      return { ...prev, rooms: action.payload };
    case "CLEAR_USER":
      return { user: null, rooms: null };
    default:
      return prev;
  }
};

const User = createContext<
  | {
      dispatch: Dispatch<Action>;
      state: stateType;
    }
  | undefined
>(undefined);

export const UseUser = () => {
  const ctx = useContext(User);
  if (!ctx) {
    throw new Error("context is undefined");
  }
  return ctx;
};

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reduceFunction, {
    user: null,
    rooms: null,
  });
  return <User value={{ state, dispatch }}>{children}</User>;
};
