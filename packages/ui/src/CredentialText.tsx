import { type JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface LoginTextBoxProps extends UseFormRegisterReturn {
  type: "password" | "text";
  placeholder: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  className?: string;
  error?:boolean
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
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      name={name}
      className={`m-3 p-3 invalid:outline-red-600 focus:outline-none focus:ring-2 focus:ring-white bg-black rounded-xl ${className}`}
      {...rest}
    />
  );
};
