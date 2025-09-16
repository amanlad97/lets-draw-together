import { Game } from "@repo/common/game";
import { ShapeType } from "@repo/common/shapeTypes";

import { RefObject, useState } from "react";

const ToolButtons = ({ gameRef }: { gameRef: RefObject<Game | null> }) => {
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");

  const tools: ShapeType[] = ["pencil", "rectangle", "circle"];
  if (!gameRef.current) return;
  return (
    <div className="grid grid-cols-3 bg-gray-500">
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => {
            setActiveShape(tool);
            gameRef.current?.selectShape(tool);
          }}
          className={`px-4 py-2 ${
            activeShape === tool
              ? "bg-amber-50 text-black rounded-2xl"
              : "text-white"
          }`}
        >
          {tool}
        </button>
      ))}
    </div>
  );
};

export default ToolButtons;
