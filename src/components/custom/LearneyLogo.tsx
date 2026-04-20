import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function LearneyLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--seasonal-accent) 68%, #ef8ea8 32%) 0%, color-mix(in srgb, #ddcff7 52%, #ef8ea8 48%) 100%)",
        }}
      >
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-semibold text-foreground">
        Learney
      </span>
    </Link>
  );
}
