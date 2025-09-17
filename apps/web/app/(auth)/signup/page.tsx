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
    const res = await axios.post(`${BACKEND_URL}/v1/security/signup`, data);
    //TODO-logic needs to be added
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto">
      <h3 className="text-3xl font-semibold text-white mb-6">Sign Up</h3>

      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className="flex flex-col space-y-5 w-full"
      >
        <div className="w-full">
          <CredentialText
            {...register("username", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
              minLength: {
                value: 8,
                message: "Email must be at least 8 characters",
              },
            })}
            type="text"
            placeholder="Email"
            error={errors.username}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <CredentialText
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="Password"
            error={errors.password}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <CredentialText
            {...register("name", {
              required: "This field is required",
            })}
            type="text"
            placeholder="Name"
            error={errors.name}
            className="w-full"
          />
        </div>

        <CredentialButton
          type="submit"
          className="w-full rounded-xl text-white font-bold bg-amber-500 hover:bg-amber-600 transition-colors"
        >
          Create Account
        </CredentialButton>
      </form>

      <p className="mt-6 text-gray-400">
        Already have an account?{" "}
        <Link className="underline hover:text-amber-300" href="/signin">
          Sign in
        </Link>
      </p>
    </div>
  );
}
