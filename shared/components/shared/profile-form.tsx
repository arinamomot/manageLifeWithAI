"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  formProfileSchema,
  TFormProfileValues,
} from "./modals/auth-modal/forms";
import { Gender, User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Title } from "./title";
import { Container } from "./container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateUserInfo } from "@/app/actions";

interface ProfileFormProps {
  data: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender as Gender,
      });

      toast.success("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Error updating data", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container>
      <Title text="Profile" />
      {/* TODO: profile form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Email" value={data.email} />
          <Input type="text" placeholder="First Name" value={data.firstName} />
          <Input type="text" placeholder="Last Name" value={data.lastName} />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
          >
            Update
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="outline"
            disabled={form.formState.isSubmitting}
            className="text-base ml-2"
            type="button"
          >
            Sign out
          </Button>
          {/* TODO: delete account */}
        </form>
      </FormProvider>
    </Container>
  );
};
