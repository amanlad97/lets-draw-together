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
      className={` m-3 p-3 bg-green-500 rounded-xl text-white font-bold focus:rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
