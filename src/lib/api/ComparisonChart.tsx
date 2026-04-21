"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export interface DimensionData {
  subject: string;
  preScore: number;
  postScore: number;
  fullMark: number;
}

interface ComparisonChartProps {
  data: DimensionData[];
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
  // หากไม่มีข้อมูล ให้แสดง Empty State
  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 text-slate-500">
        ไม่พบข้อมูลการประเมิน
      </div>
    );
  }

  // ปรับแต่ง Tooltip ให้ดู Premium
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
          <p className="font-bold text-slate-800 dark:text-white mb-2">
            {payload[0].payload.subject}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600 dark:text-slate-300">
                {entry.name === "preScore"
                  ? "คะแนนก่อนเรียน:"
                  : "คะแนนหลังเรียน:"}
              </span>
              <span className="font-bold" style={{ color: entry.color }}>
                {entry.value} / {entry.payload.fullMark}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#64748b", fontSize: 14, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, "dataMax"]}
            tick={false}
            axisLine={false}
          />

          <Radar
            name="preScore"
            dataKey="preScore"
            stroke="#bda9ff"
            fill="#bda9ff"
            fillOpacity={0.4}
          />
          <Radar
            name="postScore"
            dataKey="postScore"
            stroke="#f6aac8"
            fill="#f6aac8"
            fillOpacity={0.6}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
