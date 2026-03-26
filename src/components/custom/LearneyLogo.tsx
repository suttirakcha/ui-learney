import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function LearneyLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #4dd7f1 0%, #6fe5fb 100%)",
        }}
      >
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-semibold text-sidebar-primary">
        Learney
      </span>
    </Link>
  );
}
