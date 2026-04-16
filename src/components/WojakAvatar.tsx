"use client";

import { cn } from "@/lib/utils";

interface WojakAvatarProps {
  variant?: "sad" | "crying" | "dead" | "pink" | "doomer";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const WOJAK_FACES: Record<string, { emoji: string; bg: string }> = {
  sad: { emoji: "😔", bg: "from-gray-800 to-gray-900" },
  crying: { emoji: "😭", bg: "from-blue-900 to-gray-900" },
  dead: { emoji: "💀", bg: "from-gray-900 to-black" },
  pink: { emoji: "🤡", bg: "from-pink-900 to-gray-900" },
  doomer: { emoji: "🚬", bg: "from-gray-800 to-gray-950" },
};

const SIZES = {
  sm: "w-10 h-10 text-lg",
  md: "w-16 h-16 text-3xl",
  lg: "w-24 h-24 text-5xl",
  xl: "w-32 h-32 text-7xl",
};

export default function WojakAvatar({
  variant = "sad",
  size = "md",
  className,
}: WojakAvatarProps) {
  const face = WOJAK_FACES[variant];

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-b flex items-center justify-center border-2 border-border shadow-lg",
        face.bg,
        SIZES[size],
        className
      )}
    >
      {face.emoji}
    </div>
  );
}
