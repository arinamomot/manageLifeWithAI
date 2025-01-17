"use client";
import { useSession } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { useState } from "react";
import { AuthModal } from "./modals";

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  console.log(session, 999);

  return (
    <header style={{ border: "1px solid black", margin: "1rem" }}>
      {/* //TODO: Create a header */}
      <h1>Header</h1>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
    </header>
  );
};
