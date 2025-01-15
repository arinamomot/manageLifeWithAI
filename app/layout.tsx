import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "../shared/components/shared/providers";
import { Metadata } from "next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// SEO
export const metadata: Metadata = {
  title: "Life Manager AI",
  description: "Manage your life with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
