export interface RoundtripTier {
  id: string;
  name: string;
  emoji: string;
  minLoss: number;
  maxLoss: number | null;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  airdropMultiplier: number;
  badge: string;
}

export const TIERS: RoundtripTier[] = [
  {
    id: "newcomer",
    name: "Newcomer",
    emoji: "😔",
    minLoss: 20_000,
    maxLoss: 49_999,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    description: "CRS Stage I — Initial onset. Mild but present.",
    airdropMultiplier: 1,
    badge: "White Chip",
  },
  {
    id: "regular",
    name: "Regular",
    emoji: "😢",
    minLoss: 50_000,
    maxLoss: 99_999,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "CRS Stage II — Recurring episodes. Developing tolerance.",
    airdropMultiplier: 2,
    badge: "Blue Chip",
  },
  {
    id: "veteran",
    name: "Veteran",
    emoji: "😭",
    minLoss: 100_000,
    maxLoss: 249_999,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "CRS Stage III — Chronic. Six figures fumbled.",
    airdropMultiplier: 4,
    badge: "Purple Heart",
  },
  {
    id: "elder",
    name: "Elder",
    emoji: "💀",
    minLoss: 250_000,
    maxLoss: 999_999,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "CRS Stage IV — Severe. Quarter million club.",
    airdropMultiplier: 8,
    badge: "Gold Medallion",
  },
  {
    id: "founder",
    name: "Founding Pain Member",
    emoji: "🪦",
    minLoss: 1_000_000,
    maxLoss: null,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "CRS Stage V — Terminal. Seven figures. Gone.",
    airdropMultiplier: 16,
    badge: "Tombstone",
  },
];

export function getTierForLoss(painScore: number): RoundtripTier | null {
  if (painScore < 20_000) return null;
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (painScore >= TIERS[i].minLoss) return TIERS[i];
  }
  return null;
}
