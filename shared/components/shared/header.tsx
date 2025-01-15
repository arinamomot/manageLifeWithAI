"use client";
// import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const Header: React.FC = () => {
  // const { data: session } = useSession();

  return (
    <header style={{ border: "1px solid black", margin: "1rem" }}>
      {/* //TODO: Create a header */}
      <h1>Header</h1>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            signIn("github", {
              callbackUrl: "/",
              redirect: true,
            })
          }
          type="button"
          className="gap-2 h-12 p-2 flex-1"
        >
          <img
            className="w-6 h-6"
            src="https://github.githubassets.com/favicons/favicon.svg"
          />
          GitHub
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
              redirect: true,
            })
          }
          type="button"
          className="gap-2 h-12 p-2 flex-1"
        >
          <img
            className="w-6 h-6"
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          />
          Google
        </Button>
      </div>
    </header>
  );
};