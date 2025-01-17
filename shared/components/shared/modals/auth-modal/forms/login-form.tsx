import React from "react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div>
      <h1>Login Form</h1>
    </div>
  );
};
