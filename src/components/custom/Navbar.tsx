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
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-b border-border/70">
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
            className="glass-chip rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            {locale === "th" ? "EN" : "TH"}
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass-chip rounded-xl p-2 text-muted-foreground transition hover:text-foreground"
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
              <Link
                href="/cart"
                className="glass-chip rounded-xl p-2 text-muted-foreground transition hover:text-foreground"
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="hidden sm:inline-flex">
                <Button size="sm" variant="outline">
                  {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
                </Button>
              </Link>
              {user.role === "ADMIN" ? (
                <Link href="/admin" className="hidden sm:inline-flex">
                  <Button size="sm">
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
                <Button size="sm">
                  {locale === "th" ? "เริ่มต้นเรียน" : "Start Learning"}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-border/60 lg:hidden">
        <div className="section-frame scrollbar-none flex gap-2 overflow-x-auto py-3">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-none rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "btn-gradient text-primary-foreground shadow-sm"
                    : "glass-chip text-muted-foreground hover:text-foreground"
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
                className="glass-chip flex-none rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
              </Link>
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="btn-gradient flex-none rounded-xl px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                  {locale === "th" ? "หลังบ้าน" : "Admin"}
                </Link>
              ) : null}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="glass-chip flex-none rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {locale === "th" ? "เข้าสู่ระบบ" : "Sign in"}
              </Link>
              <Link
                href="/register"
                className="btn-gradient flex-none rounded-xl px-3 py-2 text-sm font-medium text-primary-foreground"
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
