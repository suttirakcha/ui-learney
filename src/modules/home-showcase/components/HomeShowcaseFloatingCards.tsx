"use client";

import { FloatingCardsAnimation } from "@/components/custom/FloatingCardsAnimation"; // assume exists

interface HomeShowcaseFloatingCardsProps {
  className?: string;
}

const SHOWCASE_FLOATING_CARDS = [
  {
    text: "แผนการเรียนเฉพาะตัว",
    color: "#ff8bb8, #b399ff",
  },
  {
    text: "AI-ready skills",
    color: "#91c8ff, #8b9dff",
  },
  {
    text: "ค้นหาอาชีพที่ใช่",
    color: "#8ae1cb, #7bd1ff",
  },
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
