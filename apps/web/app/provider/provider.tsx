"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export interface stateType {
  user:
    | undefined
    | {
        token: string;
        name: string;
      };
  rooms: undefined | Record<string, WebSocket>;
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
      return { user: undefined, rooms: undefined };
    default:
      return prev;
  }
};

export const User = createContext<
  | {
      dispatch: Dispatch<Action>;
      state: stateType;
    }
  | undefined
>(undefined);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reduceFunction, {
    user: undefined,
    rooms: undefined,
  });
  return <User value={{ state, dispatch }}>{children}</User>;
};
