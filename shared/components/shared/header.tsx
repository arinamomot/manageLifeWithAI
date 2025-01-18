"use client";
import { useSession } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { useState } from "react";
import { AuthModal } from "./modals";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoginType } from "../../constants/types";
interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [type, setType] = useState<LoginType>("login");

  const handleOpenAuthModal = (type: "login" | "register") => {
    setOpenAuthModal(true);
    setType(type);
  };

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-2">
          <Image src="/globe.svg" alt="Logo" width={25} height={25} />
          <div>
            <h1 className="text-sm uppercase font-bold">Blissipline</h1>
            <p className="text-xs text-gray-400 leading-3">powered by AI</p>
          </div>
        </div>
        <AuthModal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
          type={type}
          setType={setType}
        />
        <div className="flex items-center space-x-2">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <ProfileButton />
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleOpenAuthModal("login")}
              >
                Log in
              </Button>
              <Button
                variant="default"
                onClick={() => handleOpenAuthModal("register")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};
