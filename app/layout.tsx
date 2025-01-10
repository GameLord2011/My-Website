import type { Metadata } from "next";
import "./globals.css";

import TSParticles from "@/app/api/TSParticles";

export const metadata: Metadata = {
  title: "@GameLord2011",
  description: "@GameLord2011's site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TSParticles />
        {children}
      </body>
    </html>
  );
}

