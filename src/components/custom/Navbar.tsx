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

export default function Navbar() {
  const [lang, setLang] = useState("ไทย");

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Logo */}

      <LearneyLogo />

      {/* Menu */}
      <div className="flex items-center gap-6 text-sm">
        <Link
          href="/courses"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <BookOpen className="w-4 h-4" />
          คอร์สเรียน
        </Link>

        <Link
          href="/blog"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <Newspaper className="w-4 h-4" />
          บทความ
        </Link>

        <Link
          href="/categories"
          className="flex items-center gap-1 hover:text-cyan-600"
        >
          <LayoutGrid className="w-4 h-4" />
          หมวดหมู่
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center border rounded-full px-3 py-1 text-sm bg-gray-50">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <input
            placeholder="Search courses..."
            className="bg-transparent outline-none"
          />
        </div>

        {/* 🌐 Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm hover:text-cyan-600">
              <Globe className="w-4 h-4" />
              {lang}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLang("ไทย")}>
              ไทย {lang === "ไทย" && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setLang("EN")}>
              EN {lang === "EN" && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auth */}
        <Link href="/login">
          <Button variant="ghost">Sign in</Button>
        </Link>

        <Link href="/register">
          <Button className="bg-cyan-500 hover:bg-cyan-600">Sign up</Button>
        </Link>
      </div>
    </nav>
  );
}
