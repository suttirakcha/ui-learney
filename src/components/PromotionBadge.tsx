import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PromotionBadgeProps {
  discountType?: "PERCENT" | "FIXED" | string | null;
  discountValue?: number | null;
  label?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PromotionBadge({
  discountType,
  discountValue,
  label,
  className,
  size = "sm",
}: PromotionBadgeProps) {
  // ถ้าไม่มีค่าอะไรให้แสดงเลย ก็คืนค่า null
  if (!discountValue && !label) return null;

  let displayText = label || "";

  // คำนวณข้อความส่วนลดจากประเภท
  if (discountValue) {
    if (discountType === "PERCENT") {
      displayText = `ลด ${discountValue}%`;
    } else if (discountType === "FIXED") {
      displayText = `ลด ${discountValue} บาท`;
    } else if (!displayText) {
      displayText = `ลดพิเศษ`;
    }
  }

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(
        "group inline-flex items-center rounded-full font-bold shadow-sm whitespace-nowrap cursor-default",
        "transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95",
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
        sizeClasses[size],
        className,
      )}
    >
      <Tag
        size={size === "sm" ? 10 : size === "md" ? 12 : 14}
        className="shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
      />
      {displayText}
    </span>
  );
}
