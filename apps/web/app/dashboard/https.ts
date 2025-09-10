import axios from "axios";
import { BACKEND_URL } from "../config";

export const getExistingShapes = async (roomId: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BACKEND_URL}/v1/room/chats`, {
      params: { roomId },
      headers: { token },
    });
    const shapes = res.data.response.map((x: { message: string }) => {
      return JSON.parse(x.message);
    });
    console.log("https/shapes in the get existingshapes call", shapes);
    return shapes;
  } catch (error) {
    return error;
  }
};
