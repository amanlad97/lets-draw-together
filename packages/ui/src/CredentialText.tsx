import { type JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface LoginTextBoxProps extends UseFormRegisterReturn {
  type: "password" | "text";
  placeholder: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
}

export const CredentialText = ({
  type,
  placeholder,
  min,
  max,
  disabled,
  onChange,
  onBlur,
  name,
  ref,
}: LoginTextBoxProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      className="w-full m-3 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-xl"
    />
  );
};
