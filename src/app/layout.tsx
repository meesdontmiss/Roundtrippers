import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WalletProvider from "@/providers/WalletProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roundtrippers Anonymous | You Are Not Alone",
  description:
    "A wallet-verified support group for people who roundtripped their gains back to zero. Prove your pain. Earn your badge. Join the room.",
  openGraph: {
    title: "Roundtrippers Anonymous",
    description: "You are not alone. We all fumbled.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
