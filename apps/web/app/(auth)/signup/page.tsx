"use client";
import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@repo/common/utils";
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
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandle = async (data: Inputs) => {
    const res = await axios.post(`${BACKEND_URL}/v1/security/signup`, data, {});
    console.log(res);
  };
  return (
    <>
      <h3 className="font-stretch-90% text-3xl">Signup</h3>
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
              message: "email must be at least 8 characters",
            },
          })}
          type="text"
          placeholder="email"
          error={errors.username}
        />
        {errors.username && (
          <p className="text-red-600 w-full text-center">
            {errors.username.message}
          </p>
        )}

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
        {errors.password && (
          <p className="text-red-600 w-full text-center">
            {errors.password.message}
          </p>
        )}

        <CredentialText
          {...register("name", { required: "this field is required" })}
          type="text"
          placeholder="name"
          error={errors.name}
        />
        {errors.name && (
          <p className="text-red-600 w-full text-center">
            {errors.name.message}
          </p>
        )}

        <CredentialButton
          type="submit"
          className="rounded-xl text-white font-bold focus:rounded-xl"
        >
          SUBMIT
        </CredentialButton>
      </form>
      <h1>
        or maybe we can try{" "}
        <Link className="text-gray-400 underline" href="/signin">
          signin
        </Link>
      </h1>
    </>
  );
}
