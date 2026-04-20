"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonStar, ShoppingBag, Sparkles, SunMedium } from "lucide-react";
import LearneyLogo from "./LearneyLogo";
import { Button } from "@/components/ui/button";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { useAuth } from "@/app/lib/AuthContext";

const navigation = [
  { href: "/courses", label: { th: "คอร์สทั้งหมด", en: "All Courses" } },
  { href: "/community", label: { th: "คอมมูนิตี้", en: "Community" } },
  { href: "/skill-test", label: { th: "Skill Test", en: "Skill Test" } },
  { href: "/promotions", label: { th: "โปรโมชัน", en: "Promotions" } },
];

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, theme, setTheme } = usePreference();
  const { user, logout } = useAuth();

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-b border-white/40">
      <div className="section-frame flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <LearneyLogo />
          <nav className="hidden items-center gap-5 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    active ? "text-foreground" : "text-muted-foreground"
                  } hover:text-foreground`}
                >
                  {pickLocalized(item.label, locale)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === "th" ? "en" : "th")}
            className="rounded-lg border border-white/50 bg-white/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground dark:bg-white/5"
          >
            {locale === "th" ? "EN" : "TH"}
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border border-white/50 bg-white/60 p-2 text-muted-foreground transition hover:text-foreground dark:bg-white/5"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <SunMedium className="h-4 w-4" />
            ) : (
              <MoonStar className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <>
              <Link href="/cart" className="rounded-lg border border-white/50 bg-white/60 p-2 text-muted-foreground hover:text-foreground dark:bg-white/5">
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <Link href="/dashboard">
                <Button size="sm" variant="outline">
                  {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
                </Button>
              </Link>
              {user.role === "ADMIN" ? (
                <Link href="/admin">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Sparkles className="mr-1 h-4 w-4" />
                    {locale === "th" ? "Admin" : "Admin"}
                  </Button>
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => void logout()}
                className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                {locale === "th" ? "ออกจากระบบ" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="outline">
                  {locale === "th" ? "เข้าสู่ระบบ" : "Sign in"}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary text-primary-foreground">
                  {locale === "th" ? "เริ่มต้นเรียน" : "Start Learning"}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
