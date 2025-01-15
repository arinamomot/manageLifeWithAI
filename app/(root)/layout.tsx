import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "../../shared/components";

export const metadata: Metadata = {
  title: "Life Manager AI",
  description: "Manage your life with AI",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
    </main>
  );
}
