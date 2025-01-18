"use client";

import { Checkbox } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../../form/form-input";
import Link from "next/link";
import { formLoginSchema } from "./schemas";
import { TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        throw Error();
      }

      toast.success("You have successfully logged into your account.", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Failed to log into your account.", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        id="login-form"
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          required
        />
        <FormInput name="password" label="Password" type="password" required />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              className="border-black"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="remember-me" className="text-sm">
              Remember me
            </label>
          </div>
          {/* TODO: create forgot password page */}
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </FormProvider>
  );
};
