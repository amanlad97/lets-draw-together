import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "reset" | "submit" | "button";
}

export const CredentialButton = ({
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        " px-5 py-3 rounded-xl font-semibold text-white",
        "bg-gray-700 shadow-md",
        "hover:bg-gray-600 active:bg-gray-500 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};
