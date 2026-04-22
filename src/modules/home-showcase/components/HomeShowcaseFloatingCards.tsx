"use client";

import { FloatingCardsAnimation } from "@/components/custom/FloatingCardsAnimation"; // assume exists

interface HomeShowcaseFloatingCardsProps {
  className?: string;
}

const SHOWCASE_FLOATING_CARDS = [
  {
    text: "AI แนะนำคอร์สเฉพาะคุณ",
    color: "from-pink-500 to-purple-500",
  },
  {
    text: "คอร์สใหม่กว่า 1,000+",
    color: "from-blue-500 to-indigo-500",
  },
  { text: "ผู้เรียน 50,000+", color: "from-emerald-500 to-teal-500" },
];

export function HomeShowcaseFloatingCards({
  className = "",
}: HomeShowcaseFloatingCardsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <FloatingCardsAnimation cards={SHOWCASE_FLOATING_CARDS} />
    </div>
  );
}
