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
        <h1>Home</h1>
        <div>
          {session ? (
            <div>
              <p>Welcome, {session.user?.name}</p>
            </div>
          ) : (
            <p>You are not signed in.</p>
          )}
        </div>
      </div>
    </>
  );
};
