"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LearneyLogo from "./LearneyLogo";

import { BookOpen, Newspaper, LayoutGrid, Globe, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Suspense, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import SearchCourseDialog from "../dialogs/courses/SearchCourseDialog";
import CartLink from "../cart/CartLink";
import { Skeleton } from "../ui/skeleton";

export default function Navbar() {
  const [lang, setLang] = useState("ไทย");
  const { user, isLoading, logout } = useAuth();

  return (
    <nav className="fixed inset-x-0 z-10 flex h-18 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-8">
        <LearneyLogo />
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/course"
            className="flex items-center gap-1 hover:text-cyan-600"
          >
            <BookOpen className="h-4 w-4" />
            คอร์สเรียน
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-1 hover:text-cyan-600"
          >
            <Newspaper className="h-4 w-4" />
            บทความ
          </Link>

          <Link
            href="/categories"
            className="flex items-center gap-1 hover:text-cyan-600"
          >
            <LayoutGrid className="h-4 w-4" />
            หมวดหมู่
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <SearchCourseDialog />
        {user && <CartLink />}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm hover:text-cyan-600">
              <Globe className="h-4 w-4" />
              {lang}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLang("ไทย")}>
              ไทย {lang === "ไทย" && <Check className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setLang("EN")}>
              EN {lang === "EN" && <Check className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Suspense fallback={<Skeleton className="h-8 w-20" />}>
          {isLoading ? (
            <Skeleton className="h-10 w-28 rounded-xl" />
          ) : !user ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>

              <Link href="/register">
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm hover:text-cyan-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-white">
                    {user.fullname?.charAt(0)}
                  </div>
                  {user.fullname}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link href="/profile">โปรไฟล์</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/my-courses">คอร์สของฉัน</Link>
                </DropdownMenuItem>

                <div className="my-2 border-t" />

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-500"
                >
                  ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </Suspense>
      </div>
    </nav>
  );
}
