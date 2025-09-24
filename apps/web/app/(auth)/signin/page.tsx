"use client";

import { CredentialButton } from "@repo/ui/CredentialButton";
import { CredentialText } from "@repo/ui/CredentialText";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@repo/common/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UseUser } from "../../hooks/UseUser";

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
  const { dispatch } = UseUser();
  const router = useRouter();

  const onSubmitHandle = async (data: Inputs) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/v1/security/signin`, data);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "SET_USER",
        payload: { token: res.data.token, name: res.data.name },
      });
      localStorage.setItem("token", res.data.token);
      router.push("/room");
    } catch (error) {
      alert(`Oops something went wrong: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto">
      <h3 className="text-3xl font-semibold text-white mb-6">Login</h3>

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
                message: "Username must be at least 8 characters",
              },
            })}
            type="text"
            placeholder="Email or Username"
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

        <CredentialButton
          type="submit"
          className="w-full rounded-xl text-white font-bold bg-amber-500 hover:bg-amber-600 transition-colors"
        >
          Sign In
        </CredentialButton>
      </form>

      <p className="mt-6 text-gray-400">
        Dont have an account?{" "}
        <Link className="underline hover:text-amber-300" href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
