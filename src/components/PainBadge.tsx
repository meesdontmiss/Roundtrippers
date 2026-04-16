"use client";

import { type RoundtripTier } from "@/lib/tiers";
import { formatPainScore, shortenAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PainBadgeProps {
  tier: RoundtripTier;
  painScore: number;
  walletAddress: string;
  date: string;
  className?: string;
}

export default function PainBadge({
  tier,
  painScore,
  walletAddress,
  date,
  className,
}: PainBadgeProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto rounded-xl border-2 p-6 text-center bg-white shadow-md",
        tier.borderColor,
        "animate-cert-glow",
        className
      )}
    >
      {/* Top badge ribbon */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white rounded-full text-[10px] uppercase tracking-widest font-semibold">
        Proof of Pain &middot; Certified
      </div>

      {/* Tier emoji */}
      <div className="text-5xl mt-4 mb-2">{tier.emoji}</div>

      {/* Tier name */}
      <h3 className={cn("text-xl font-bold uppercase tracking-wide", tier.color)}>
        {tier.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-1">{tier.badge}</p>

      {/* Pain score */}
      <div className="mt-4 py-3 px-4 bg-pain-red-light rounded-lg border border-pain-red/20">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          Verified Roundtrip Amount
        </p>
        <p className="text-3xl font-bold text-pain-red font-mono">
          {formatPainScore(painScore)}
        </p>
      </div>

      {/* Wallet + date */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono bg-muted px-2 py-0.5 rounded">{shortenAddress(walletAddress, 6)}</span>
        <span>{date}</span>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs text-muted-foreground italic">
        Diagnosis: {tier.description}
      </p>

      {/* Watermark */}
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Roundtrippers Anonymous &middot; On-Chain Verified &middot; RTA Clinical Registry
        </p>
      </div>
    </div>
  );
}
