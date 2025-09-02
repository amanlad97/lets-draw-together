import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import { useForm } from "react-hook-form";
type Inputs = {
  username: string;
  password: string;
};
export default function Signin() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandle = (data: Inputs) => {
    console.log(data);
    return null;
  };
  return (
    <>
      <h3 className="font-stretch-90% text-3xl">Login</h3>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <CredentialText
          {...register("username", {
            required: "this field is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            minLength: 8,
          })}
          type={"text"}
          placeholder={"username"}
        />
        {errors.username && "enter a valid email"}
        <CredentialText
          {...register("password", {
            required: "this field is required",
            minLength: 8,
          })}
          type={"password"}
          placeholder={"password"}
        />
        {errors.username && "doesn't follow the pattern"}
        <CredentialButton
          type="submit"
          className="w-full m-3 p-3 bg-green-500 rounded-xl text-white font-bold focus:rounded-xl"
        >
          submit
        </CredentialButton>
      </form>
      <h1>
        or maybe we can try{" "}
        <a className=" text-green-700" href="www.google.com">
          signup
        </a>
      </h1>
    </>
  );
}
