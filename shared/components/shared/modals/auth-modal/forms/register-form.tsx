"use client";

import { Button } from "@/shared/components";
import React, { useState } from "react";
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TermsAndPrivacy } from "../../../form";
import { FormInput } from "../../../form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from ".";
import toast from "react-hot-toast";
interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      //TODO: registration
      // await registerUser({
      //   email: data.email,
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   password: data.password,
      // });

      toast.error("Registration successful 📝. Confirm your email", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Incorrect email or password", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form id="register-form" className="flex flex-col gap-3">
        <div className="flex gap-4">
          <FormInput
            className="w-1/2"
            name="name"
            label="First Name"
            type="text"
            required
          />
          <FormInput
            className="w-1/2"
            name="lastname"
            label="Last Name"
            type="text"
            required
          />
        </div>
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          required
        />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        />
        <TermsAndPrivacy isChecked={isChecked} setIsChecked={setIsChecked} />
        <Button
          loading={form.formState.isSubmitting}
          className="mt-2 h-12 text-base"
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </FormProvider>
  );
};
