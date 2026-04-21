"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, ChevronDown } from "lucide-react";
import { mockInstructors } from "@/types/instructor";

export function InstructorTopbar() {
  const [notifications] = useState(3);

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left: Search & Create */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="ค้นหาคอร์สของคุณ..."
              className="pl-10 pr-4 py-2 w-64 bg-muted/50 hover:bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all"
            />
          </div>
        </div>

        {/* Right: Notifications, Stats, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium">
            <div className="text-center">
              <div className="font-bold text-lg text-emerald-600">฿12,450</div>
              <div className="text-foreground/70">รายได้เดือนนี้</div>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="text-center">
              <div className="font-bold text-lg text-amber-600">156</div>
              <div className="text-foreground/70">ผู้เรียนใหม่</div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-0 h-9 w-9">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-xs rounded-full flex items-center justify-center text-white font-bold">
                {notifications}
              </span>
            )}
          </Button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={mockInstructors[0].avatar} />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold">{mockInstructors[0].name}</p>
              <p className="text-xs text-muted-foreground">
                {mockInstructors[0].title}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
