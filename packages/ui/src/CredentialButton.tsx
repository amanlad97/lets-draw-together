import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "reset" | "submit" | "button";
}

export const CredentialButton = ({
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`hover:bg-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-gray-100 active:bg-white active:text-black m-3 p-3 bg-gray-700 rounded-xl text-white font-bold focus:rounded-xl ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
