"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LearneyLogo from "./LearneyLogo";

import {
  BookOpen,
  Newspaper,
  LayoutGrid,
  Search,
  Globe,
  Check,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const locale = useLocale();
  const [lang, setLang] = useState(locale === "en" ? "EN" : "ไทย");
  const { user, logout } = useAuth();
  const tNav = useTranslations("navbar");
  const tCom = useTranslations("common");
  const router = useRouter();

  const changeLanguage = (newLocale: "th" | "en") => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setLang(newLocale === "th" ? "ไทย" : "EN");
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Logo */}
      <LearneyLogo />

      {/* Menu */}
      <div className="flex items-center gap-6 text-sm">
        <Link
          href="/course"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <BookOpen className="w-4 h-4" />
          {tNav("links.courses")}
        </Link>

        <Link
          href="/blog"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <Newspaper className="w-4 h-4" />
          {tNav("links.blog")}
        </Link>

        <Link
          href="/categories"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <LayoutGrid className="w-4 h-4" />
          {tNav("links.categories")}
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center border rounded-full px-3 py-1 text-sm bg-gray-50">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <input
            placeholder={tCom("labels.searchPlaceholder")}
            className="bg-transparent outline-none"
          />
        </div>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm hover:text-cyan-600">
              <Globe className="w-4 h-4" />
              {lang}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage("th")}>
              ไทย {lang === "ไทย" && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => changeLanguage("en")}>
              EN {lang === "EN" && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ✅ Auth */}
        {!user ? (
          <>
            <Link href="/login">
              <Button variant="ghost">{tCom("buttons.signIn")}</Button>
            </Link>

            <Link href="/register">
              <Button className="bg-cyan-500 hover:bg-cyan-600">{tCom("buttons.signUp")}</Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm hover:text-cyan-600">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-semibold">
                  {user.name?.charAt(0)}
                </div>

                {/* Name */}
                {user.name}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link href="/profile">👤 {tNav("userMenu.profile")}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/dashboard">📊 {tNav("userMenu.dashboard")}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/my-courses">🎓 {tNav("userMenu.myCourses")}</Link>
              </DropdownMenuItem>

              <div className="border-t my-2" />

              <DropdownMenuItem
                onClick={logout}
                className="text-red-500 cursor-pointer"
              >
                🚪 {tCom("buttons.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
