import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";

export default function signin() {
  return (
    <>
      <h3 className="font-stretch-90% text-3xl">Login</h3>
      <CredentialText type={"text"} placeholder={"username"} />
      <CredentialText type={"password"} placeholder={"password"} />
      <CredentialText type={"text"} placeholder={"name"} />
      <CredentialText type={"password"} placeholder={"password"} />

      <CredentialButton
        className="w-full m-3 p-3 bg-green-500 rounded-xl text-white font-bold focus:rounded-xl"
        appName={""}
      >
        submit
      </CredentialButton>
      <h1>
        or maybe we can try{" "}
        <a className=" text-green-700" href="www.google.com">
          signup
        </a>
      </h1>
    </>
  );
}
