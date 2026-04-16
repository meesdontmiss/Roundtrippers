"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TIERS } from "@/lib/tiers";
import { formatPainScore } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  painScore: number;
  tierId: string;
  peakValue: number;
  currentValue: number;
  topToken: string;
  verifiedDate: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, wallet: "8tWz...nR5c", painScore: 2_147_000, tierId: "founder", peakValue: 2_300_000, currentValue: 153_000, topToken: "BONK", verifiedDate: "Mar 2024" },
  { rank: 2, wallet: "3mFx...kL2q", painScore: 1_840_000, tierId: "founder", peakValue: 2_010_000, currentValue: 170_000, topToken: "WIF", verifiedDate: "Feb 2024" },
  { rank: 3, wallet: "7xKX...9fPm", painScore: 1_230_000, tierId: "founder", peakValue: 1_400_000, currentValue: 170_000, topToken: "JTO", verifiedDate: "Jan 2024" },
  { rank: 4, wallet: "4kBm...rT8y", painScore: 890_000, tierId: "elder", peakValue: 950_000, currentValue: 60_000, topToken: "PYTH", verifiedDate: "Mar 2024" },
  { rank: 5, wallet: "2hYk...mJ7w", painScore: 670_000, tierId: "elder", peakValue: 740_000, currentValue: 70_000, topToken: "RNDR", verifiedDate: "Feb 2024" },
  { rank: 6, wallet: "6vNx...pQ3s", painScore: 445_000, tierId: "elder", peakValue: 500_000, currentValue: 55_000, topToken: "MOBILE", verifiedDate: "Jan 2024" },
  { rank: 7, wallet: "9pRz...wN4j", painScore: 320_000, tierId: "elder", peakValue: 380_000, currentValue: 60_000, topToken: "BOME", verifiedDate: "Mar 2024" },
  { rank: 8, wallet: "5rKm...xL9d", painScore: 180_000, tierId: "veteran", peakValue: 210_000, currentValue: 30_000, topToken: "POPCAT", verifiedDate: "Feb 2024" },
  { rank: 9, wallet: "1aQw...zV6r", painScore: 95_000, tierId: "regular", peakValue: 120_000, currentValue: 25_000, topToken: "MYRO", verifiedDate: "Mar 2024" },
  { rank: 10, wallet: "0bPx...cM4t", painScore: 72_000, tierId: "regular", peakValue: 88_000, currentValue: 16_000, topToken: "SAMO", verifiedDate: "Jan 2024" },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? MOCK_LEADERBOARD
      : MOCK_LEADERBOARD.filter((e) => e.tierId === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Clinical Registry
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-clinical-blue-dark mb-2">
              Pain Index &amp; Patient Registry
            </h1>
            <p className="text-muted-foreground">
              Ranked by verified Pain Score™. All data is on-chain and wallet-authenticated.
            </p>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-border bg-white shadow-sm text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Total Verified Pain
              </p>
              <p className="text-xl font-bold text-pain-red font-mono">
                $47.3M
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white shadow-sm text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Verified Patients
              </p>
              <p className="text-xl font-bold font-mono">2,847</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white shadow-sm text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Avg Pain Score
              </p>
              <p className="text-xl font-bold text-pain-red font-mono">
                $16.6K
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white shadow-sm text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Highest Single Loss
              </p>
              <p className="text-xl font-bold text-pain-red font-mono">
                $2.1M
              </p>
            </div>
          </div>

          {/* Tier Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                filter === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All Tiers
            </button>
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setFilter(tier.id)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  filter === tier.id
                    ? `${tier.borderColor} ${tier.bgColor} ${tier.color}`
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tier.emoji} {tier.name}
              </button>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-[50px_1fr_1fr_1fr_100px] gap-4 p-4 border-b border-border bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Rank</span>
              <span>Wallet</span>
              <span>Pain Score</span>
              <span>Peak → Current</span>
              <span className="text-right">Tier</span>
            </div>

            {/* Entries */}
            {filtered.map((entry) => {
              const tier = TIERS.find((t) => t.id === entry.tierId);
              return (
                <div
                  key={entry.rank}
                  className="grid grid-cols-[50px_1fr_1fr_1fr_100px] gap-4 p-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors items-center"
                >
                  <span className="font-bold text-lg text-muted-foreground">
                    {entry.rank <= 3 ? (
                      <span className="text-primary">#{entry.rank}</span>
                    ) : (
                      `#${entry.rank}`
                    )}
                  </span>
                  <div>
                    <p className="font-mono text-sm">{entry.wallet}</p>
                    <p className="text-xs text-muted-foreground">
                      Top bag: {entry.topToken}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold font-mono text-pain-red">
                      {formatPainScore(entry.painScore)}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-400">
                      {formatPainScore(entry.peakValue)}
                    </span>
                    <span className="mx-1">→</span>
                    <span className="text-pain-red">
                      {formatPainScore(entry.currentValue)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${tier?.color}`}>
                      {tier?.emoji} {tier?.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Rankings update as new wallets are verified. Your pain is never
            outdated.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
