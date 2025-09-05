"use client";
import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Link from "next/link";
type Inputs = {
  username: string;
  password: string;
  name: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandle = async (data: Inputs) => {
    const res = await axios.post(
      `${BACKEND_URL}/v1/securit/signup`,
      {
        username: data.username,
        password: data.password,
        name: data.name,
      },
      { withCredentials: true }
    );
    console.log(res);
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
        />
        <CredentialText
          {...register("password", {
            required: "this field is required",
            minLength: 8,
          })}
          type={"password"}
          placeholder={"password"}
        />
        {errors.username && "enter a valid email"}
        <CredentialText
          {...register("name", {
            required: "this field is required",
          })}
          type={"text"}
          placeholder={"name"}
        />
        <CredentialButton
          type="submit"
          className="w-full m-3 p-3 bg-green-500 rounded-xl text-white font-bold focus:rounded-xl"
        >
          submit
        </CredentialButton>
      </form>
      <h1>
        or maybe we can try{" "}
        <Link className=" text-green-700" href="/signin">
          signup
        </Link>
      </h1>
    </>
  );
}
