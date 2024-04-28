import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import SessionProvider from "@/providers/SessionProvider";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track your project issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <SessionProvider>
          <Toaster richColors position="top-center" />
          <Navbar />
          <main className="mx-auto max-w-screen-xl px-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
