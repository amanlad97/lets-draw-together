import axios from "axios";
import { BACKEND_URL } from "../config";
import { connectWebSocket } from "./websocket";

type ExistingShapesResponse = {
  //   ws: WebSocket;
  chats: Shape[];
};

type Shape = { x: number; y: number; width: number; height: number };

export const getExistingShapes = async (roomId: number): Promise<Shape[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BACKEND_URL}/v1/room/chats`, {
      params: { roomId },
      headers: { token },
    });

    const formateChats = (chats: {
      data: {
        response: {
          message: string;
          id: number;
          roomId: number;
          userId: string;
        }[];
        ok: boolean;
      };
    }): Shape[] => {
      console.log(chats);
      return chats.data.response.map((element) => {
        console.log(element);
        return JSON.parse(element.message);
      });
    };
    const ws = connectWebSocket(roomId);
    return formateChats(res);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
