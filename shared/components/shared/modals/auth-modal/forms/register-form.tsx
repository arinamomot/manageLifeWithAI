"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TermsAndPrivacy } from "../../../form";
import { FormInput } from "../../../form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from ".";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";
import { Button } from "@/shared/components";

interface RegisterFormProps {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    if (!isChecked) {
      toast.error("You must agree to the Terms and Privacy Policy");
      return;
    }

    try {
      await registerUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      toast.success("Registration successful 📝. Confirm your email", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      console.log("error", error);
      return toast.error("Incorrect email or password", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        id="register-form"
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <FormInput
            className="w-1/2"
            name="firstName"
            label="First Name"
            type="text"
            required
          />
          <FormInput
            className="w-1/2"
            name="lastName"
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
