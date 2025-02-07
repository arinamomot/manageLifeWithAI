import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";

export const metadata = {
  title: "Life Manager AI",
  description: "Manage your life with AI",
};

export default function CalendarLayout({
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
