import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button, Checkbox, Input, Label } from "@/shared/components";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { LoginType } from "../../../../constants/types";

interface Props {
  open: boolean;
  onClose: () => void;
  type: LoginType;
  setType: (type: LoginType) => void;
}

const title = (type: "login" | "register") => {
  const isLogin = type === "login";

  return (
    <div className="text-center">
      <p className={`${isLogin ? "text-xl" : "text-2xl"} font-bold mb-1`}>
        {isLogin ? "Welcome Back!" : "Join us!"}
      </p>
      <p>{isLogin ? "Login to your account" : "Create an account"}</p>
    </div>
  );
};

export const AuthModal: React.FC<Props> = ({
  open,
  onClose,
  type,
  setType,
}) => {
  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby="auth-modal"
        className="w-[470px] bg-white p-8"
      >
        <DialogTitle>{title(type)}</DialogTitle>
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <DialogDescription />

        <div className="grid gap-4">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="flex gap-2 ">
            <Button
              variant="secondary"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1 text-black"
            >
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              />
              Google
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1 text-black"
            >
              <img
                className="w-6 h-6"
                src="https://github.githubassets.com/favicons/favicon.svg"
              />
              GitHub
            </Button>
          </div>
        </div>

        <div className="text-center text-sm">
          {`${
            type === "login"
              ? "Don't have an account?"
              : "Already have an account?"
          }`}
          <Button
            variant="link"
            onClick={onSwitchType}
            type="button"
            className="text-blue-500 hover:underline p-1"
          >
            {`${type === "login" ? "Sign up" : "Log in"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
