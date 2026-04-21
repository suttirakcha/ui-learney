"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Self-Esteem", score: 80, fullMark: 100 },
  { category: "Creativity", score: 90, fullMark: 100 },
  { category: "Logic", score: 72, fullMark: 100 },
  { category: "Communication", score: 85, fullMark: 100 },
  { category: "Leadership", score: 68, fullMark: 100 },
];

export function SkillRadarChart() {
  return (
    <div className="h-80 w-full rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
