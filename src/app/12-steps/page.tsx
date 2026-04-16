import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STEPS = [
  {
    number: 1,
    title: "We admitted we were powerless over our positions",
    description:
      "That our portfolio had become unmanageable. We watched 6-figure gains evaporate while refreshing Phantom at 3am.",
  },
  {
    number: 2,
    title: "Came to believe that a Power greater than ourselves could restore us to solvency",
    description:
      "Some call it the market. Some call it Vitalik. Some call it 'the next cycle.' We just called it cope.",
  },
  {
    number: 3,
    title: "Made a decision to turn our wallets over to the care of stop-losses",
    description:
      "We never actually set the stop-losses. But we thought about it. That counts.",
  },
  {
    number: 4,
    title: "Made a searching and fearless inventory of our transaction history",
    description:
      "We looked at the Solscan receipts. We saw the swaps. We saw the 47 memecoin buys at the top. We wept.",
  },
  {
    number: 5,
    title: "Admitted to ourselves and to another human being the exact nature of our trades",
    description:
      "\"I aped $40k into a dog coin because a guy with 200 followers said it was going to $1B.\" First step is admitting it.",
  },
  {
    number: 6,
    title: "Were entirely ready to have our conviction removed",
    description:
      "No more \"I'm early.\" No more \"zoom out.\" No more \"it's just a healthy correction.\" The delusion ends here.",
  },
  {
    number: 7,
    title: "Humbly asked the market to remove our bags",
    description:
      "We tried to sell. The liquidity was gone. The only bid was ourselves. This is what acceptance looks like.",
  },
  {
    number: 8,
    title: "Made a list of all persons we told to buy, and became willing to apologize to them all",
    description:
      "Family members. Discord friends. That guy at the bar. The Uber driver. We are sorry. We were high on unrealized gains.",
  },
  {
    number: 9,
    title: "Made direct amends to such people wherever possible",
    description:
      "Except when doing so would require us to reveal how much we actually lost. Some secrets die with us.",
  },
  {
    number: 10,
    title: "Continued to take personal inventory and when we roundtripped, promptly admitted it",
    description:
      "Every new trade is a chance to fumble again. We remain vigilant. We remain humble. We remain poor.",
  },
  {
    number: 11,
    title: "Sought through chart-reading and meditation to improve our conscious contact with the market",
    description:
      "We stared at 1-minute candles for 16 hours. We drew lines on charts. The lines meant nothing. The meditation continues.",
  },
  {
    number: 12,
    title: "Having had a financial awakening as the result of these steps, we tried to carry this message to other roundtrippers",
    description:
      "We share our pain not to seek sympathy, but to warn others. And also because misery loves company. Welcome to the room.",
  },
];

export default function TwelveStepsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Official Recovery Protocol
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-clinical-blue-dark mb-2">
              The 12-Step Recovery Program
            </h1>
            <p className="text-muted-foreground">
              A clinically-inspired path from denial to acceptance. <br />
              Endorsed by the Unprecedented Volatility Commission.
            </p>
          </div>

          {/* Epigraph */}
          <div className="mb-12 p-6 rounded-xl border border-primary/20 bg-primary-light text-center">
            <p className="text-sm italic text-muted-foreground">
              &quot;The first step toward recovery is admitting you had a
              100-bagger and didn&apos;t sell a single token.&quot;
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              — RTA Founder, probably
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="group p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-12 text-center bg-white p-8 rounded-xl border border-border shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Program Closing</p>
            <blockquote className="text-lg italic text-foreground">
              &quot;Keep coming back. It works if you don&apos;t work it... because clearly,
              working it hasn&apos;t worked for any of us.&quot;
            </blockquote>
            <p className="mt-3 text-xs text-muted-foreground">Recited at the close of every R.A.G.E. Group Session</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
