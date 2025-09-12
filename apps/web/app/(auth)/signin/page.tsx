"use client";
import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../../config";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmitHandle = async (data: Inputs) => {
    const res = await axios.post(`${BACKEND_URL}/v1/security/signin`, {
      username: data.username,
      password: data.password,
    });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  };

  return (
    <>
      <h3 className="font-stretch-90% text-3xl">Login</h3>

      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className=" flex flex-col justify-center w-full"
      >
        <CredentialText
          {...register("username", {
            required: "this field is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            minLength: 8,
          })}
          type={"text"}
          placeholder={"username"}
          error={errors.password}
        />
        <h1 className=" text-red-600 w-full text-center">
          {errors.username && "enter a valid email"}
        </h1>
        <CredentialText
          {...register("password", {
            required: "this field is required",
            minLength: 8,
          })}
          type={"password"}
          placeholder={"password"}
          error={errors.password}
        />
        <h1 className=" text-red-600 w-full text-center ">
          {errors.password && "doesn't follow the pattern"}
        </h1>
        <CredentialButton
          type="submit"
          className=" rounded-xl text-white font-bold focus:rounded-xl"
        >
          SUBMIT
        </CredentialButton>
      </form>
      <h1>
        or maybe we can try{" "}
        <Link className=" text-gray-400 underline" href="/signup">
          signup
        </Link>
      </h1>
    </>
  );
}
