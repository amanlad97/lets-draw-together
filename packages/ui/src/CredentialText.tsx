import { type JSX } from "react";
interface loginTextBox {
  type: "password" | "text";
  placeholder: string;
}

export const CredentialText = ({
  type,
  placeholder,
}: loginTextBox): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full m-3 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-xl"
    ></input>
  );
};
