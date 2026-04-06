import { cn } from "@/lib/utils";
import { CircleCheckBig, Info, TriangleAlert } from "lucide-react";

interface PaymentStatusNoticeProps {
  tone?: "info" | "success" | "error";
  message: string;
}

const noticeStyles = {
  info: {
    icon: Info,
    className: "border-cyan-100 bg-cyan-50/70 text-cyan-800",
  },
  success: {
    icon: CircleCheckBig,
    className: "border-green-100 bg-green-50 text-green-800",
  },
  error: {
    icon: TriangleAlert,
    className: "border-red-100 bg-red-50 text-red-700",
  },
};

export default function PaymentStatusNotice({
  tone = "info",
  message,
}: PaymentStatusNoticeProps) {
  const Icon = noticeStyles[tone].icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[18px] border px-4 py-3 text-sm",
        noticeStyles[tone].className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
