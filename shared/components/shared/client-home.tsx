"use client";

import { useSession } from "next-auth/react";

export const ClientHome: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        {session ? (
          <p className="flex flex-col items-center justify-center h-20">
            Welcome, {session.user?.firstName} {session.user?.lastName}
          </p>
        ) : (
          <p className="flex flex-col items-center justify-center h-20">
            You are not signed in.
          </p>
        )}
      </div>
    </>
  );
};
