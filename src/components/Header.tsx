"use client";

import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { shortenAddress } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/verify", label: "Get Assessed" },
  { href: "/12-steps", label: "Recovery Program" },
  { href: "/confessions", label: "Patient Stories" },
  { href: "/leaderboard", label: "Pain Index" },
  { href: "/meetings", label: "Group Sessions" },
];

export default function Header() {
  const { publicKey } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top utility bar — pharma-style */}
      <div className="bg-clinical-blue-dark text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-8">
          <span className="flex items-center gap-1.5">
            <Phone size={11} />
            Roundtrip Crisis Hotline: 1-800-FUMBLED
          </span>
          <span className="hidden sm:block">
            Officially Licensed by the Unprecedented Volatility Commission
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/wojack therapist.png"
              alt="RTA"
              width={40}
              height={40}
              className="rounded-full border border-border"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-wide text-clinical-blue-dark uppercase">
                Roundtrippers Anonymous
              </span>
              <span className="text-[10px] tracking-wider text-muted-foreground">
                Trauma &amp; Trading Solutions &middot; Est. 2024
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Wallet + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {publicKey && (
              <span className="hidden sm:inline text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                {shortenAddress(publicKey.toBase58())}
              </span>
            )}
            <WalletMultiButton />
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-white px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-primary border-b border-border last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
