"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endDate: string;
  className?: string;
}

export function CountdownTimer({
  endDate,
  className = "",
}: CountdownTimerProps) {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-950/50 ${className}`}
    >
      <Clock className="w-4 h-4 text-red-600" />
      <Badge variant="destructive" className="text-xs font-mono">
        หมดเขตใน {calculateTimeLeft(endDate)}
      </Badge>
    </div>
  );
}

function calculateTimeLeft(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return "หมดอายุแล้ว";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}วัน ${hours}ชม.`;
  if (hours > 0) return `${hours}ชม. ${minutes}นาที`;
  return `${minutes}นาที`;
}
