"use client";
import React, { useActionState } from "react";
import { Button, Input } from "../../../ui";
import { useFormStatus } from "react-dom";
import { ProvidersButtons } from "../../providers-buttons";

interface AuthModalProps {
  onClose: () => void;
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Login"}
    </Button>
  );
};

export const AuthModalExample: React.FC<AuthModalProps> = ({ onClose }) => {
  const [state, submitAction] = useActionState(auth, {
    data: null,
    error: null,
  });

  async function auth(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      return { data: response.json(), error: null };
    } catch (error: any) {
      return { ...prevState, error: error.message };
    }
  }

  return (
    <div>
      <form action={submitAction}>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <SubmitButton />
      </form>
      <ProvidersButtons />
      <Button type="button" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};
