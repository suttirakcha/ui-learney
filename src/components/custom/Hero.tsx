"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import LnButton from "./LnButton";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/courses?search=${encodeURIComponent(trimmed)}` : "/courses"
    );
  };

  return (
    <section className="hero-surface text-primary-foreground text-center py-20 px-4 space-y-6">
      {/* Headline */}
      <div
        className="space-y-4 animate-fadeIn"
        style={{ animationDelay: "0ms" }}
      >
        <h2 className="text-5xl font-bold leading-tight">
          {"เรียนรู้อะไรก็ได้ เมื่อไหร่ก็ได้".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-fadeIn"
              style={{ animationDelay: `${i * 18}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        {/* Description */}
        <p
          className="text-xl max-w-lg mx-auto opacity-80 animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
          ค้นพบหลักสูตรออนไลน์หลากหลาย พัฒนาทักษะใหม่ๆ
          และบรรลุเป้าหมายของคุณกับผู้เชี่ยวชาญชั้นนำ
        </p>
      </div>

      {/* Search input */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto animate-fadeIn"
        style={{ animationDelay: "600ms" }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาคอร์สที่ต้องการ เช่น React, Python, Design..."
            className="pl-9 pr-9 h-12 rounded-xl bg-white text-gray-900 border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-[#4fd6f0] w-full"
          />
          {query && (
            <button
              type="button"
              aria-label="ล้างคำค้นหา"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* CTA button — changes label based on input */}
      <div
        className="animate-fadeIn"
        style={{ animationDelay: "750ms" }}
      >
        <LnButton variant="secondary" onClick={handleSubmit}>
          {query.trim() ? "ค้นหา" : "ดูคอร์สทั้งหมด"}
        </LnButton>
      </div>
    </section>
  );
}
