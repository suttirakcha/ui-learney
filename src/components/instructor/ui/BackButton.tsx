"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  fallback?: string;
  className?: string;
}

export function BackButton({
  fallback = "/instructor/dashboard",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 -ml-1 h-9 px-2 ${className}`}
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallback);
      }}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>ย้อนกลับ</span>
    </Button>
  );
}
