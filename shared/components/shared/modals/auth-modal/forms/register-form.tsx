import { Button } from "@/shared/components";
import React from "react";
import { z } from "zod";

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div>
      <h1>Register Form</h1>
      <Button>fs</Button>
    </div>
  );
};
