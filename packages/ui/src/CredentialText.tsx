import { type JSX } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface LoginTextBoxProps extends UseFormRegisterReturn {
  type: "password" | "text";
  placeholder: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  className?: string;
  error?: FieldError | undefined;
}

export const CredentialText = ({
  className = "",
  type,
  placeholder,
  min,
  max,
  disabled,
  name,
  error,
  ...rest
}: LoginTextBoxProps): JSX.Element => {
  console.log(error);
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      name={name}
      className={`m-3 p-3 rounded-xl bg-black focus:outline-none ${error ? "ring-2 ring-red-600" : "focus:ring-2 focus:ring-white"} ${className}`}
      {...rest}
    />
  );
};
