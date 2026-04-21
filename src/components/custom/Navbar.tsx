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
  { href: "/recommendations", label: { th: "AI Planner", en: "AI Planner" } },
  { href: "/promotions", label: { th: "โปรโมชัน", en: "Promotions" } },
];

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, theme, setTheme } = usePreference();
  const { user, logout } = useAuth();

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-b border-white/40">
      <div className="section-frame flex h-[72px] items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-6">
          <LearneyLogo />
          <nav className="hidden items-center gap-4 lg:flex">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

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

        <div className="flex shrink-0 items-center gap-2">
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
              <Link href="/dashboard" className="hidden sm:inline-flex">
                <Button size="sm" variant="outline">
                  {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
                </Button>
              </Link>
              {user.role === "ADMIN" ? (
                <Link href="/admin" className="hidden sm:inline-flex">
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
              <Link href="/login" className="hidden sm:inline-flex">
                <Button size="sm" variant="outline">
                  {locale === "th" ? "เข้าสู่ระบบ" : "Sign in"}
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:inline-flex">
                <Button size="sm" className="bg-primary text-primary-foreground">
                  {locale === "th" ? "เริ่มต้นเรียน" : "Start Learning"}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-white/30 lg:hidden">
        <div className="section-frame scrollbar-none flex gap-2 overflow-x-auto py-3">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-none rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/40 bg-white/70 text-muted-foreground dark:bg-white/5"
                }`}
              >
                {pickLocalized(item.label, locale)}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex-none rounded-lg border border-white/40 bg-white/70 px-3 py-2 text-sm text-muted-foreground dark:bg-white/5"
              >
                {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
              </Link>
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="flex-none rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                >
                  {locale === "th" ? "หลังบ้าน" : "Admin"}
                </Link>
              ) : null}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex-none rounded-lg border border-white/40 bg-white/70 px-3 py-2 text-sm text-muted-foreground dark:bg-white/5"
              >
                {locale === "th" ? "เข้าสู่ระบบ" : "Sign in"}
              </Link>
              <Link
                href="/register"
                className="flex-none rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
              >
                {locale === "th" ? "เริ่มต้นเรียน" : "Start Learning"}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
