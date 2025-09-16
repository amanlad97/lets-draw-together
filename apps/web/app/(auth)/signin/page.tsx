"use client";
import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@repo/common/utils";
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
    const res = await axios.post(`${BACKEND_URL}/v1/security/signin`, data);
    //TODO- fix it in future
    axios.defaults.headers.common["token"] = res.data.token;
    localStorage.setItem("token", res.data.token);
    router.push("/drawingBoard");
  };

  return (
    <>
      <h3 className="font-stretch-90% text-3xl">Login</h3>

      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className="flex flex-col justify-center w-full"
      >
        <CredentialText
          {...register("username", {
            required: "this field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "enter a valid email",
            },
            minLength: {
              value: 8,
              message: "username must be at least 8 characters",
            },
          })}
          type="text"
          placeholder="username"
          error={errors.username}
        />
        <h1 className="text-red-600 w-full text-center">
          {errors.username?.message}
        </h1>
        <CredentialText
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          })}
          type="password"
          placeholder="password"
          error={errors.password}
        />
        <h1 className="text-red-600 w-full text-center">
          {errors.password?.message}
        </h1>

        <CredentialButton
          type="submit"
          className="rounded-xl text-white font-bold focus:rounded-xl"
        >
          SUBMIT
        </CredentialButton>
      </form>

      <h1>
        or maybe we can try{" "}
        <Link className="text-gray-400 underline" href="/signup">
          signup
        </Link>
      </h1>
    </>
  );
}
