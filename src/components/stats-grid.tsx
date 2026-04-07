"use client";

import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpen, Star } from "lucide-react";

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: "Users" | "GraduationCap" | "BookOpen" | "Star";
  decimals?: number;
}

const ICONS = { Users, GraduationCap, BookOpen, Star };

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, decimals, active]);
  return count;
}

function StatCard({ item, active, index }: { item: StatItem; active: boolean; index: number }) {
  const count = useCountUp(item.value, item.decimals ?? 0, active);
  const Icon = ICONS[item.icon];

  return (
    <div
      className="relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.2s, translate 0.2s`,
      }}
    >
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4fd6f0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-14 h-14 rounded-2xl bg-[#4fd6f0]/10 flex items-center justify-center group-hover:bg-[#4fd6f0]/20 transition-colors duration-300">
        <Icon className="h-7 w-7 text-[#4fd6f0]" />
      </div>

      <div className="text-center">
        <p className="text-3xl font-extrabold text-gray-900 tabular-nums leading-none">
          {item.decimals ? count.toFixed(item.decimals) : Math.round(count).toLocaleString()}
          <span className="text-[#4fd6f0]">{item.suffix}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{item.label}</p>
      </div>
    </div>
  );
}

export default function StatsGrid({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((item, i) => (
        <StatCard key={item.label} item={item} active={active} index={i} />
      ))}
    </div>
  );
}
