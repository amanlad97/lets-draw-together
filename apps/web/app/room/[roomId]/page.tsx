import DashboardDrawingBoard from "./DashboardDrawingBoard";
import { BACKEND_URL } from "@repo/common/utils";
import { Shape } from "@repo/common/shapeTypes";
import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { LoadingSpinner } from "@repo/ui/loadingSpinner";

const Dashboard = async (props: PageProps<"/room/[roomId]">) => {
  const { roomId } = await props.params;
  const parsedRoomId = roomId ? parseInt(roomId) : 0;
  const existingShapes = (await getExistingShapes(parsedRoomId)) || [];
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardDrawingBoard
        roomId={parsedRoomId}
        existingShapes={existingShapes}
      />
    </Suspense>
  );
};
const getExistingShapes = async (roomId: number): Promise<Shape[] | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const res = await axios.get(`${BACKEND_URL}/v1/room/chats`, {
      params: { roomId },
      headers: {
        Cookie: cookieHeader,
      },
    });
    console.log(res);
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
    return shapes;
  } catch (error) {
    console.error("Error fetching shapes:", error);
    return null;
  }
};
export default Dashboard;
