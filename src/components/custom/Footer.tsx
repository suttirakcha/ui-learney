"use client";

import Link from "next/link";
import LearneyLogo from "./LearneyLogo";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";

const footerLinks = [
  { href: "/courses", label: { th: "คอร์สทั้งหมด", en: "All Courses" } },
  { href: "/community", label: { th: "คอมมูนิตี้", en: "Community" } },
  { href: "/skill-test", label: { th: "Skill Test", en: "Skill Test" } },
  { href: "/recommendations", label: { th: "AI Planner", en: "AI Planner" } },
  { href: "/promotions", label: { th: "โปรโมชัน", en: "Promotions" } },
];

export default function Footer() {
  const { locale } = usePreference();

  return (
    <footer className="border-t border-white/30 bg-white/50 dark:bg-white/5">
      <div className="section-frame grid gap-8 py-12 sm:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <LearneyLogo />
          <p className="max-w-md text-sm text-muted-foreground">
            {locale === "th"
              ? "แพลตฟอร์มเรียนออนไลน์สำหรับยุค AI ที่ให้คุณค้นพบจุดแข็ง อัปสกิลอย่างมีทิศทาง และเติบโตแบบอบอุ่นแต่จริงจัง"
              : "An online learning platform for the AI era that helps you discover strengths, build skills, and grow with clarity."}
          </p>
        </div>

        <div className="space-y-3 sm:col-span-1">
          <p className="text-sm font-medium text-foreground">
            {locale === "th" ? "เส้นทางเรียนรู้" : "Learning Paths"}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-foreground">
                {pickLocalized(link.label, locale)}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3 sm:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-foreground">
            {locale === "th" ? "จังหวะของ LEARNEY" : "Learney Rhythm"}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{locale === "th" ? "คอร์สใหม่ทุกสัปดาห์" : "Fresh drops every week"}</p>
            <p>{locale === "th" ? "คอมมูนิตี้ถามตอบที่เป็นมิตร" : "Warm Q&A community"}</p>
            <p>{locale === "th" ? "ผลลัพธ์ที่วัดการเติบโตได้" : "Growth you can actually measure"}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 py-4 text-center text-xs text-muted-foreground">
        © 2026 Learney. {locale === "th" ? "พร้อมเติบโตไปกับคุณ" : "Ready to grow with you."}
      </div>
    </footer>
  );
}
