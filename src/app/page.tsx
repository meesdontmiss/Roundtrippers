import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { TIERS } from "@/lib/tiers";
import { formatUSD } from "@/lib/utils";
import { CheckCircle, ArrowRight, Shield, Users, BarChart3 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Patient #4,207",
    text: "I turned $800 into $340k on a memecoin. Then I turned $340k into $800. The diagnosis was immediate.",
    tier: "CRS Stage III",
    date: "Verified March 2024",
  },
  {
    name: "Patient #1,019",
    text: "My portfolio hit $1.2M in November. I told my wife we'd buy a house. We rent now. She doesn't know about this site.",
    tier: "CRS Stage V — Terminal",
    date: "Verified February 2024",
  },
  {
    name: "Patient #8,312",
    text: "Had 50 SOL at $8. Held to $260. Watched it go back to $8. Bought more at $200. My counselor wept.",
    tier: "CRS Stage II",
    date: "Verified January 2024",
  },
  {
    name: "Patient #666",
    text: "I've been liquidated 14 times. Each time I said 'this is the last time.' My file is now the thickest in the office.",
    tier: "CRS Stage IV",
    date: "Verified March 2024",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ===== HERO — Clinical/Pharma style ===== */}
        <section className="bg-gradient-to-b from-primary-light to-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — Copy */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  Find Your Recovery
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-clinical-blue-dark">
                  Chronic Roundtrip Syndrome doesn&apos;t have to define you.
                </h1>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  A wallet-verified recovery program for traders who have
                  provably roundtripped major gains back to zero. Professional
                  guidance from certified Wojak-Guides.
                </p>
                <div className="mt-6 space-y-2.5">
                  {[
                    "On-chain wallet verification",
                    "Tiered recovery program based on Pain Score™",
                    "Community-backed token airdrop for verified members",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-teal shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/verify"
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-md text-sm hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
                  >
                    Get Your Free Assessment <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/12-steps"
                    className="px-6 py-3 border border-border text-foreground font-medium rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    View Recovery Program
                  </Link>
                </div>
              </div>
              {/* Right — Hero Image */}
              <div className="relative">
                <Image
                  src="/CRS.png"
                  alt="Chronic Roundtrip Syndrome — Find Your Recovery"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-lg border border-border"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Stats Bar ===== */}
        <section className="bg-clinical-blue-dark text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold">$47.3M</p>
                <p className="text-xs text-white/70 mt-1">Total Verified Pain</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">2,847</p>
                <p className="text-xs text-white/70 mt-1">Verified Patients</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">5</p>
                <p className="text-xs text-white/70 mt-1">CRS Severity Stages</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">24/7</p>
                <p className="text-xs text-white/70 mt-1">During Market Hours (Always)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Group Therapy Section with Image ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Image
                  src="/RTA 2.png"
                  alt="The Roundtrip Recovery Center — Group Trauma Bonding"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-md border border-border"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-3">
                  Group Trauma Bonding
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark leading-tight">
                  The Roundtrip Recovery Center
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Group trauma bonding through shared likes &amp; losses.
                  Officially licensed by the Unprecedented Volatility Commission.
                  Hedged by reality.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: Shield, label: "Wallet-Verified Identity" },
                    { icon: Users, label: "Peer Support Groups" },
                    { icon: BarChart3, label: "On-Chain Pain Scoring" },
                    { icon: CheckCircle, label: "Certified Wojak-Guides" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <item.icon size={16} className="text-primary shrink-0" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/meetings"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  View Group Session Schedule <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== How Treatment Works ===== */}
        <section className="bg-section-alt border-y border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Your Recovery Journey
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark">
                How Treatment Works
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                A simple three-step clinical process. No appointment necessary.
                Walk-ins always welcome.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Intake Assessment",
                  desc: "Connect your Solana wallet. Our diagnostic system reads your on-chain history. No judgment — just data.",
                  icon: "🩺",
                },
                {
                  step: "02",
                  title: "Diagnosis & Scoring",
                  desc: "We calculate your Pain Score™ based on peak portfolio value vs. current state. The blockchain doesn't lie.",
                  icon: "📋",
                },
                {
                  step: "03",
                  title: "Treatment Plan",
                  desc: "Receive your CRS severity classification, Proof of Pain certification, and community airdrop eligibility.",
                  icon: "💊",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COPE-A-ZINE Pharma Ad Section ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pain-red mb-3">
                  Introducing
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark leading-tight">
                  COPE-A-ZINE&trade; (copazepam) 25mg
                </h2>
                <p className="mt-1 text-base text-muted-foreground italic">
                  For Profound Bag-Holding Relief
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Find your internal dip. Rediscover market peace. Ask your
                  licensed Roundtrippers Anonymous counselor if COPE-A-ZINE is
                  right for you.
                </p>
                <div className="mt-5 p-4 bg-pain-red-light rounded-lg border border-pain-red/20">
                  <p className="text-xs font-bold text-pain-red mb-1">
                    Pharma Indications:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ Sweating over 1-minute candles</li>
                    <li>✓ Holding past entry point</li>
                    <li>✓ Loss of rational logic</li>
                    <li>✓ Repeated &quot;Hold to Zero&quot; behaviors</li>
                  </ul>
                </div>
              </div>
              <div>
                <Image
                  src="/cope-a-zine.png"
                  alt="COPE-A-ZINE — by Roundtrippers Pharmaceuticals"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-md border border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Pain Tiers — Clinical Table ===== */}
        <section className="bg-section-alt border-y border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                CRS Severity Classification
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark">
                Pain Tiers &amp; Airdrop Eligibility
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your verified suffering determines your recovery tier and token allocation.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_120px_100px] gap-4 p-4 bg-muted border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Classification</span>
                <span>Description</span>
                <span>Threshold</span>
                <span className="text-right">Airdrop</span>
              </div>
              {TIERS.map((tier, i) => (
                <div
                  key={tier.id}
                  className={`grid grid-cols-[1fr_1fr_120px_100px] gap-4 p-4 items-center text-sm ${
                    i < TIERS.length - 1 ? "border-b border-border" : ""
                  } hover:bg-primary-light/30 transition-colors`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{tier.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground">{tier.name}</p>
                      <p className="text-xs text-muted-foreground">{tier.badge}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.description}</p>
                  <p className="text-xs font-mono text-foreground">
                    {formatUSD(tier.minLoss)}{tier.maxLoss ? `–${formatUSD(tier.maxLoss)}` : "+"}
                  </p>
                  <p className="text-right font-bold text-primary">
                    {tier.airdropMultiplier}x
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Roundtrip Trauma Treatment Ad ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Image
                  src="/roundtrip trauma.png"
                  alt="Finally, a treatment for Chronic Roundtrip Trauma"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-md border border-border"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-3">
                  Treatment Available
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark leading-tight">
                  Finally, a Treatment for Chronic{" "}
                  <span className="text-pain-red">Roundtrip Trauma.</span>
                </h2>
                <p className="mt-4 text-base text-muted-foreground italic">
                  CURE-ALL&trade; — Live Your Life, Not The Charts.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs font-bold text-foreground mb-1.5">Side Effects May Include:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>- Sudden bouts of rational profit-taking</li>
                      <li>- Reduced time spent doom-scrolling</li>
                      <li>- Actual sleep</li>
                      <li>- Re-connecting with loved ones</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-pain-red-light rounded-lg">
                    <p className="text-xs font-bold text-pain-red mb-1.5">Do Not Take If:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>- You still believe in &quot;Hold to Zero&quot;</li>
                      <li>- Your average entry is below current price</li>
                      <li>- You have experienced irrational exuberance in the last 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Patient Stories / Testimonials ===== */}
        <section className="bg-section-alt border-y border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Patient Testimonials
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark">
                Real Stories From Our Recovery Program
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-light text-primary">
                      {t.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &quot;{t.text}&quot;
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-3">{t.date}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/confessions"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Read more patient stories <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Recovery Success Stories ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-2">
                Patient Recovery Outcomes
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-clinical-blue-dark">
                From Roundtrip to Rational Profit
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                Real recovery outcomes from patients who completed the RTA program.
                Progress may vary. Not financial advice.
              </p>
            </div>

            {/* Two-up — Positivity + Rational Profit */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="/positivity.png"
                  alt="Recovery & Rational Trading — Profit is here, our new belief: rational profit-taking is success"
                  width={600}
                  height={450}
                  className="w-full"
                />
                <div className="p-4 bg-teal-light border-t border-border">
                  <p className="text-sm font-semibold text-clinical-blue-dark">
                    Recovery &amp; Rational Trading
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    &quot;Profit is here. Our new belief: rational profit-taking is success.&quot;
                    All group members are now recovering.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="/rational profit.png"
                  alt="Progress Report — Living Life, Not The Charts — Group recovery session with before & after"
                  width={600}
                  height={450}
                  className="w-full"
                />
                <div className="p-4 bg-primary-light border-t border-border">
                  <p className="text-sm font-semibold text-clinical-blue-dark">
                    Progress Report: Living Life, Not The Charts
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Before &amp; after outcomes. New beliefs include: take profit, prepare
                    for dips, actual sleep, re-connecting with loved ones.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/12-steps"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-md text-sm hover:bg-teal/90 transition-colors"
              >
                Start Your Recovery Program <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Group Session Image Banner ===== */}
        <section className="bg-section-alt border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/trauma bonding.png"
                alt="Group trauma bonding through shared losses"
                width={1200}
                height={500}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clinical-blue-dark/90 via-clinical-blue-dark/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  You Are Not Alone. We All Fumbled.
                </h2>
                <p className="text-sm text-white/80 max-w-lg">
                  Join thousands of verified roundtrippers in the largest on-chain
                  recovery community. Your pain is your proof. Your proof is your power.
                </p>
                <Link
                  href="/verify"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-clinical-blue-dark font-semibold rounded-md text-sm hover:bg-white/90 transition-colors"
                >
                  Begin Free Assessment <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Serenity Prayer — Clinical Card ===== */}
        <section className="bg-section-alt border-t border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 text-center">
            <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                The Roundtripper&apos;s Prayer
              </p>
              <blockquote className="text-lg sm:text-xl italic text-foreground leading-relaxed">
                &quot;God, grant me the serenity to accept the trades I cannot
                undo, the courage to close the ones I can, and the wisdom to know
                when to take profit.&quot;
              </blockquote>
              <p className="mt-4 text-xs text-muted-foreground">
                — Recited at the beginning of every R.A.G.E. Group Session
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
