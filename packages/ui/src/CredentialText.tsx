import { type JSX } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CredentialTextProps = UseFormRegisterReturn & {
  type: "password" | "text";
  placeholder: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
};

export const CredentialText = ({
  type,
  placeholder,
  min,
  max,
  disabled,
  name,
  error,
  className = "",
  ...rest
}: CredentialTextProps): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        className={[
          "w-full max-w-sm px-4 py-2",
          "bg-gray-700/70 text-white placeholder-gray-300",
          "rounded-lg border border-gray-600",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-400"
            : "focus:border-amber-300 focus:ring-amber-300",
          "focus:ring-2 focus:outline-none transition-colors duration-150",
          className,
        ].join(" ")}
        {...rest}
      />

      {error && (
        <p className="mt-1 text-sm text-red-400 text-center">{error.message}</p>
      )}
    </div>
  );
};
