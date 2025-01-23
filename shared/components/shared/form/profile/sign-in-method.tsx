import { cn } from "@/shared/lib/utils";
import {
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/shared/components";
import { Card } from "@/shared/components";
import { User } from "@prisma/client";
import React from "react";
import { KeyRound } from "lucide-react";
import { SignInActionItem } from "./signin-action-item";
import { useSession } from "next-auth/react";

interface SignInMethodProps {
  data: User;
  className?: string;
}

const SIGN_IN_METHODS = [
  {
    type: "email" as const,
    title: "Email",
    description: "Link your Email account to your account.",
  },
  {
    type: "google" as const,
    title: "Google Account",
    description: "Link your Google account to your account.",
  },
  {
    type: "github" as const,
    title: "Github Account",
    description: "Link your Github account to your account.",
  },
] as const;

export const SignInMethod: React.FC<SignInMethodProps> = ({
  data,
  className,
}) => {
  return (
    <Card className={cn("w-[30%] m-4", className)}>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2 text-xl">
          <KeyRound className="h-5 w-5" /> Sign In Method
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {SIGN_IN_METHODS.map((method, index) => (
          <React.Fragment key={method.type}>
            <SignInActionItem
              type={method.type}
              linked={method.type === "email" ? !!data.email : false}
              title={method.title}
              description={method.description}
              data={data}
            />
            {index < SIGN_IN_METHODS.length - 1 && (
              <Separator className="mt-2" />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
