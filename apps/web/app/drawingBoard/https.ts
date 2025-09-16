import axios from "axios";
import { BACKEND_URL } from "@repo/common/utils";
import { Shape } from "@repo/common/shapeTypes";

export const getExistingShapes = async (
  roomId: number
): Promise<Shape[] | null> => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BACKEND_URL}/v1/room/chats`, {
      params: { roomId },
      headers: { token },
    });

    if (res.status !== 200) {
      console.warn("Non-200 response:", res.status);
      return null;
    }

    if (!Array.isArray(res.data.response)) {
      console.warn("Unexpected response format:", res.data);
      return null;
    }

    const shapes: Shape[] = res.data.response.map((x: { message: string }) => {
      try {
        return JSON.parse(x.message);
      } catch {
        console.warn("Failed to parse shape:", x.message);
        return null;
      }
    });
    console.log("Fetched shapes:", shapes);
    return shapes;
  } catch (error) {
    console.error("Error fetching shapes:", error);
    return null;
  }
};
