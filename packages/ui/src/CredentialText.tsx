import { type JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface LoginTextBoxProps extends UseFormRegisterReturn {
  type: "password" | "text";
  placeholder: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  className?: string;
}

export const CredentialText = ({
  className = "",
  type,
  placeholder,
  min,
  max,
  disabled,
  name,
  ...rest
}: LoginTextBoxProps): JSX.Element => {
  console.log(rest, className);
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      name={name}
      // TODO -need to fix this outline 
      className={`m-3 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...rest}
    />
  );
};
