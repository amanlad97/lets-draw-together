"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onclick?: () => void;
}

export const CredentialButton = ({
  children,
  className,
  onclick,
}: ButtonProps) => {
  return (
    <button
      className={`w-full m-3 p-3 bg-green-500 rounded-xl text-white font-bold focus:rounded-xl ${className}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};
