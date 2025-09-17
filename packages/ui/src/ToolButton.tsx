import { Game } from "@repo/common/game";
import { ShapeType } from "@repo/common/shapeTypes";
import { RefObject, useState } from "react";

type ToolButtonsProps = {
  gameRef: RefObject<Game | null>;
};

const ToolButtons = ({ gameRef }: ToolButtonsProps) => {
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");
  const tools: ShapeType[] = ["pencil", "rectangle", "circle"];

  const icons = {
    pencil: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.2 20.52a.6.6 0 0 1-.73-.65l.31-3.84c.02-.18.1-.35.23-.48L15.06 4.34a3.7 3.7 0 0 1 5.47 4.55L8.63 20a.6.6 0 0 1-.46.22l-3.92.35z"
          fill="currentColor"
        />
      </svg>
    ),
    rectangle: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    circle: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  };

  if (!gameRef.current) return null;

  return (
    <div className="fixed top-19 right-4 z-50">
      <div className="flex flex-col gap-2 p-2 bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg">
        {tools.map((tool) => {
          const isActive = activeShape === tool;
          return (
            <button
              key={tool}
              onClick={() => {
                setActiveShape(tool);
                gameRef.current?.selectShape(tool);
              }}
              className={[
                "flex items-center justify-center w-10 h-10 rounded-lg transition",
                isActive
                  ? "bg-amber-300 text-gray-900 shadow-md"
                  : "text-gray-200 hover:bg-gray-700/70 hover:text-white",
              ].join(" ")}
            >
              {icons[tool]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolButtons;
