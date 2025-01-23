"use client";

import React from "react";
import { FormInput } from "..";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formProfileSchema,
  TFormProfileValues,
} from "../../modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";

interface CardNameFormProps {
  data: User;
  className?: string;
}

export const CardNameForm: React.FC<CardNameFormProps> = ({
  data,
  className,
}) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    mode: "onChange",
    defaultValues: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex gap-6 items-start">
              <div>
                {data.image ? (
                  <Image
                    src={data.image ?? ""}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <FormInput
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={data.firstName}
                  required
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={data.lastName}
                  required
                />
              </div>
            </div>
          </CardContent>
        </form>
      </FormProvider>
    </Card>
  );
};
