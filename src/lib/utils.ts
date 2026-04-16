import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPainScore(score: number): string {
  if (score >= 1_000_000) return `$${(score / 1_000_000).toFixed(1)}M`;
  if (score >= 1_000) return `$${(score / 1_000).toFixed(1)}K`;
  return formatUSD(score);
}
