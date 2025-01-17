"use client";
// import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import React from "react";

interface ProfileButtonProps {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  className,
  onClickSignIn,
}) => {
  // const { data: session } = useSession();

  return (
    <div className={className}>
      <Button
        onClick={onClickSignIn}
        variant="outline"
        className="flex items-center gap-1"
      >
        Log in
      </Button>
    </div>
  );
};
