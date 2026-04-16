"use client";

import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PainBadge from "@/components/PainBadge";
import { analyzeWallet, type WalletAnalysis } from "@/lib/wallet-analyzer";
import { getTierForLoss } from "@/lib/tiers";
import { formatUSD } from "@/lib/utils";
import { Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type VerifyState = "idle" | "scanning" | "qualified" | "not-qualified" | "error";

export default function VerifyPage() {
  const { publicKey, connected } = useWallet();
  const [state, setState] = useState<VerifyState>("idle");
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const [error, setError] = useState<string>("");

  const handleVerify = useCallback(async () => {
    if (!publicKey) return;

    setState("scanning");
    setError("");
    setAnalysis(null);

    try {
      const result = await analyzeWallet(publicKey.toBase58());
      setAnalysis(result);
      setState(result.qualified ? "qualified" : "not-qualified");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setState("error");
    }
  }, [publicKey]);

  const tier = analysis ? getTierForLoss(analysis.summary.painScore) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Patient Intake
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-clinical-blue-dark mb-2">
              CRS Diagnostic Assessment
            </h1>
            <p className="text-muted-foreground">
              Connect your wallet. Our diagnostic system will assess your on-chain history.
            </p>
          </div>

          {/* Step 1: Connect Wallet */}
          <div className="mb-8 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h2 className="text-lg font-bold">Connect Your Wallet</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              We support Phantom, Solflare, and other Solana wallets. Your
              wallet data is read-only — we never request transaction signing
              authority.
            </p>
            <div className="flex items-center gap-4">
              <WalletMultiButton />
              {connected && (
                <span className="text-sm text-teal flex items-center gap-1">
                  <CheckCircle size={16} /> Connected
                </span>
              )}
            </div>
          </div>

          {/* Step 2: Begin Scan */}
          <div className="mb-8 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  connected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <h2 className="text-lg font-bold">Begin Your Assessment</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Our system will scan your Solana wallet history to estimate your
              peak portfolio value, current value, and calculate your{" "}
              <span className="text-pain-red font-semibold">Pain Score™</span>.
            </p>

            <button
              onClick={handleVerify}
              disabled={!connected || state === "scanning"}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {state === "scanning" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Running diagnostics...
                </>
              ) : (
                "Begin Diagnostic Scan"
              )}
            </button>
          </div>

          {/* Scanning Animation */}
          {state === "scanning" && (
            <div className="mb-8 p-8 rounded-xl border border-border bg-card text-center">
              <div className="text-5xl mb-4 animate-gentle-pulse">🩺</div>
              <h3 className="text-lg font-bold text-clinical-blue-dark mb-2">
                Running Diagnostic Analysis...
              </h3>
              <p className="text-sm text-muted-foreground">
                Reviewing on-chain records. Calculating Pain Score™. Please hold.
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {["Fetching balances", "Scanning transactions", "Calculating pain"].map(
                  (step, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-primary-light text-primary animate-gentle-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      {step}...
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <div className="mb-8 p-6 rounded-xl border border-destructive/50 bg-destructive/10">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-destructive" />
                <div>
                  <h3 className="font-bold text-destructive">
                    Assessment Failed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {error || "Something went wrong. Try again."}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Make sure you have a Helius API key configured, or try again
                    later.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Not Qualified */}
          {state === "not-qualified" && analysis && (
            <div className="mb-8 p-8 rounded-xl border border-border bg-card text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-clinical-blue-dark mb-2">
                Below Diagnostic Threshold
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your estimated roundtrip of{" "}
                <span className="font-bold text-foreground">
                  {formatUSD(analysis.summary.painScore)}
                </span>{" "}
                doesn&apos;t meet the $20,000 minimum threshold.
              </p>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">
                  Your symptoms do not yet meet the clinical threshold for CRS diagnosis.
                  Continued exposure to volatile markets may change this. We&apos;ll be here.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-muted-foreground">
                    Peak Estimated Value
                  </p>
                  <p className="font-bold font-mono">
                    {formatUSD(analysis.summary.peakEstimatedValue)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-muted-foreground">Current Value</p>
                  <p className="font-bold font-mono">
                    {formatUSD(analysis.summary.currentEstimatedValue)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="font-bold font-mono">
                    {analysis.summary.transactionCount}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-muted-foreground">Pain Score</p>
                  <p className="font-bold font-mono text-pain-red">
                    {formatUSD(analysis.summary.painScore)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Qualified! */}
          {state === "qualified" && analysis && tier && (
            <div className="space-y-8">
              {/* Congrats message */}
              <div className="p-8 rounded-xl border border-teal/30 bg-teal-light text-center">
                <div className="text-5xl mb-4">🩺✅</div>
                <h3 className="text-2xl font-bold text-clinical-blue-dark mb-2">
                  Diagnosis Confirmed
                </h3>
                <p className="text-muted-foreground">
                  Your Chronic Roundtrip Syndrome has been verified on-chain. Welcome to the program.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Peak Value
                  </p>
                  <p className="text-lg font-bold font-mono">
                    {formatUSD(analysis.summary.peakEstimatedValue)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Current Value
                  </p>
                  <p className="text-lg font-bold font-mono">
                    {formatUSD(analysis.summary.currentEstimatedValue)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Pain Score
                  </p>
                  <p className="text-lg font-bold font-mono text-pain-red">
                    {formatUSD(analysis.summary.painScore)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Airdrop Multiplier
                  </p>
                  <p className="text-lg font-bold font-mono text-primary">
                    {tier.airdropMultiplier}x
                  </p>
                </div>
              </div>

              {/* Pain Badge */}
              <PainBadge
                tier={tier}
                painScore={analysis.summary.painScore}
                walletAddress={analysis.address}
                date={new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />

              {/* Share CTA */}
              <div className="text-center p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-clinical-blue-dark mb-2">Share Your Diagnosis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Awareness is the first step to recovery. Share your results.
                </p>
                <button
                  onClick={() => {
                    const text = `I just got verified as a ${tier.name} at Roundtrippers Anonymous.\n\nPain Score: ${formatUSD(analysis.summary.painScore)}\nBadge: ${tier.badge} ${tier.emoji}\n\nYou are not alone. We all fumbled.\n\nhttps://roundtrippersanonymous.com`;
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                      "_blank"
                    );
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Share on X / Twitter
                </button>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-12 p-4 rounded-lg bg-muted text-center">
            <p className="text-xs text-muted-foreground">
              <XCircle size={12} className="inline mr-1" />
              Pain Score™ is an estimate based on available on-chain data. It is
              not tax advice, financial advice, or any kind of real advice. This
              is a meme. You know this.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
