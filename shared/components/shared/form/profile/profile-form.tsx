"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  formProfileSchema,
  TFormProfileValues,
} from "../../modals/auth-modal/forms";
import { Gender, User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "../../container";
import { updateUserInfo } from "@/app/actions";
import { FormInput } from "..";
import { Button } from "@/shared/components";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/components";

interface ProfileFormProps {
  data: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    mode: "onChange",
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

      toast.success("Data updated 📝", {
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
    <Container className="my-10 max-w-2xl">
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

              <FormInput
                name="email"
                label="Email"
                type="email"
                value={data.email}
                required
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                required
              />
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              />
            </CardContent>

            <CardFooter className="flex justify-start gap-2">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="text-base"
              >
                Update
              </Button>

              <Button
                onClick={onClickSignOut}
                variant="outline"
                disabled={form.formState.isSubmitting}
                className="text-base"
                type="button"
              >
                Sign out
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </Container>
  );

  // return (
  //   <Container className="my-10">
  //     <Title text="Profile" className="font-bold" size="md" />
  //     {/* TODO: profile form */}
  //     <FormProvider {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)}>
  //         {/* <Input type="text" placeholder="Email" value={data.email} />
  //         <Input type="text" placeholder="First Name" value={data.firstName} />
  //         <Input type="text" placeholder="Last Name" value={data.lastName} /> */}

  //         <div className="flex gap-6 items-start mb-4">
  //           <div>
  //             {data.image ? (
  //               <Image
  //                 src={data.image ?? ""}
  //                 alt="Profile Image"
  //                 width={100}
  //                 height={100}
  //                 className="rounded-full"
  //               />
  //             ) : (
  //               <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center">
  //                 <UserIcon className="w-12 h-12 text-gray-500" />
  //               </div>
  //             )}
  //           </div>
  //           <div className="flex-1">
  //             <FormInput
  //               className="mb-2"
  //               name="firstName"
  //               label="First Name"
  //               type="text"
  //               value={data.firstName}
  //               required
  //             />
  //             <FormInput
  //               name="lastName"
  //               label="Last Name"
  //               type="text"
  //               value={data.lastName}
  //               required
  //             />
  //           </div>
  //         </div>

  //         <FormInput
  //           name="email"
  //           label="Email"
  //           type="email"
  //           value={data.email}
  //           required
  //         />
  //         <FormInput
  //           name="password"
  //           label="Password"
  //           type="password"
  //           required
  //         />
  //         <FormInput
  //           name="confirmPassword"
  //           label="Confirm Password"
  //           type="password"
  //           required
  //         />

  //         <Button
  //           type="submit"
  //           disabled={form.formState.isSubmitting}
  //           className="text-base mt-10"
  //         >
  //           Update
  //         </Button>

  //         <Button
  //           onClick={onClickSignOut}
  //           variant="outline"
  //           disabled={form.formState.isSubmitting}
  //           className="text-base ml-2"
  //           type="button"
  //         >
  //           Sign out
  //         </Button>
  //         {/* TODO: delete account */}
  //       </form>
  //     </FormProvider>
  //   </Container>
  // );
};
