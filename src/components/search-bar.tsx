"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  /** Pre-fills input from URL searchParam — syncs when URL changes */
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  defaultValue = "",
  placeholder = "ค้นหาคอร์สที่ต้องการ...",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  // Sync input value when URL changes (e.g. browser back/forward)
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/courses?search=${encodeURIComponent(trimmed)}` : "/courses"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-9 pr-9 h-12 rounded-xl bg-white text-gray-900 border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-[#4fd6f0]"
        />
        {query && (
          <button
            type="button"
            aria-label="ล้างคำค้นหา"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button
        type="submit"
        className="h-12 px-6 rounded-xl bg-[#4fd6f0] hover:bg-[#38c5e0] text-white font-semibold transition-colors"
      >
        ค้นหา
      </Button>
    </form>
  );
}
