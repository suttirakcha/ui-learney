"use client";

import { categories } from "@/lib/categories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryButtons = () => {
  const searchParams = useSearchParams();
  const getCategory = searchParams.get("category");

  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((category) => (
        <Link
          href={`/course?category=${category}`}
          key={category}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition whitespace-nowrap ${
            getCategory === category
              ? "bg-cyan-400 text-white shadow-md hover:bg-cyan-500"
              : "bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-400 hover:bg-cyan-50"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;
