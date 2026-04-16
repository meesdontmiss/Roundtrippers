"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/lib/utils";

interface Confession {
  id: number;
  emoji: string;
  wallet: string;
  tier: string;
  tierColor: string;
  text: string;
  timestamp: string;
  likes: number;
}

const MOCK_CONFESSIONS: Confession[] = [
  {
    id: 1,
    emoji: "😭",
    wallet: "7xKX...9fPm",
    tier: "Veteran",
    tierColor: "text-purple-400",
    text: "Turned $2,000 into $180,000 on BONK. Told myself I'd sell at $200k. It went to $12,000. I'm still holding. I don't know why.",
    timestamp: "2 hours ago",
    likes: 342,
  },
  {
    id: 2,
    emoji: "💀",
    wallet: "3mFx...kL2q",
    tier: "Founding Pain Member",
    tierColor: "text-red-400",
    text: "I had 50,000 SOL at $3. FIFTY THOUSAND SOL AT THREE DOLLARS. I sold at $4 because I needed rent money. That's $7.5 million I left on the table. I think about it every single day.",
    timestamp: "5 hours ago",
    likes: 1247,
  },
  {
    id: 3,
    emoji: "😔",
    wallet: "9pRz...wN4j",
    tier: "Regular",
    tierColor: "text-blue-400",
    text: "My friend told me about Solana at $1.50. I said 'sounds like a scam.' He retired last year. I work at Wendy's.",
    timestamp: "8 hours ago",
    likes: 891,
  },
  {
    id: 4,
    emoji: "🤡",
    wallet: "4kBm...rT8y",
    tier: "Elder",
    tierColor: "text-amber-400",
    text: "I leveraged my house to buy ETH at $4,800. My wife thinks I sold at $3,000. I didn't sell at $3,000. I bought more at $3,000.",
    timestamp: "12 hours ago",
    likes: 2103,
  },
  {
    id: 5,
    emoji: "😭",
    wallet: "6vNx...pQ3s",
    tier: "Veteran",
    tierColor: "text-purple-400",
    text: "I made a spreadsheet tracking when I would have been a millionaire if I had just held my original bag. I update it weekly. It's at $4.7M now. I have $800.",
    timestamp: "1 day ago",
    likes: 567,
  },
  {
    id: 6,
    emoji: "🚬",
    wallet: "2hYk...mJ7w",
    tier: "Elder",
    tierColor: "text-amber-400",
    text: "I got rugged 7 times in one week. On the 8th project I said 'this one is different.' It was not different. I belong here.",
    timestamp: "1 day ago",
    likes: 445,
  },
  {
    id: 7,
    emoji: "💀",
    wallet: "8tWz...nR5c",
    tier: "Founding Pain Member",
    tierColor: "text-red-400",
    text: "I was up $2.1M on a memecoin. I tweeted 'we're so early.' The dev rugged 4 hours later. My tweet has 50k likes. They're all laughing at me.",
    timestamp: "2 days ago",
    likes: 3891,
  },
  {
    id: 8,
    emoji: "😔",
    wallet: "5rKm...xL9d",
    tier: "Newcomer",
    tierColor: "text-gray-400",
    text: "I only roundtripped $22k but it was my entire savings account. I told my parents I lost it in a 'tech investment.' Technically not a lie.",
    timestamp: "3 days ago",
    likes: 234,
  },
];

export default function ConfessionsPage() {
  const { publicKey } = useWallet();
  const [confessions] = useState<Confession[]>(MOCK_CONFESSIONS);
  const [newConfession, setNewConfession] = useState("");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const handleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Clinical Case Files
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-clinical-blue-dark mb-2">
              Patient Stories
            </h1>
            <p className="text-muted-foreground">
              Anonymous accounts from verified patients. All entries are wallet-authenticated.
            </p>
          </div>

          {/* Submit Confession */}
          <div className="mb-8 p-6 rounded-xl border border-border bg-white shadow-sm">
            <h2 className="font-bold text-clinical-blue-dark mb-3 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Submit Patient Account
            </h2>
            <textarea
              value={newConfession}
              onChange={(e) => setNewConfession(e.target.value)}
              placeholder="Describe your symptoms, trading history, and emotional state..."
              className="w-full p-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                {publicKey
                  ? `Posting as ${shortenAddress(publicKey.toBase58())}`
                  : "Connect wallet to post"}
              </p>
              <button
                disabled={!publicKey || !newConfession.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Confession Feed */}
          <div className="space-y-4">
            {confessions.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono text-muted-foreground">
                        {c.wallet}
                      </span>
                      <span
                        className={`text-xs font-medium ${c.tierColor}`}
                      >
                        {c.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {c.timestamp}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {c.text}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(c.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      likedIds.has(c.id)
                        ? "text-pain-red"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    😭 {c.likes + (likedIds.has(c.id) ? 1 : 0)}
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    🤝 I relate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
