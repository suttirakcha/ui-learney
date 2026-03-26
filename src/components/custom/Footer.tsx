import Link from "next/link";
import LearneyLogo from "./LearneyLogo";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-gray-500 space-x-4">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <LearneyLogo />
      </div>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/privacy">Privacy</Link>
      <p className="mt-2">© 2026 Learny. All rights reserved.</p>
    </footer>
  );
}
