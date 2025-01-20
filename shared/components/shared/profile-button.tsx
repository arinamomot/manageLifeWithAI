"use client";
import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ProfileButtonProps {
  className?: string;
}

const onClickSignOut = () => {
  signOut({
    callbackUrl: "/",
  });
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({ className }) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <CircleUser size={16} />
            Profile
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onClickSignOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
