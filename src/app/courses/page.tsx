import type { Metadata } from "next";
import { coursesData } from "@/data/courses";
import SearchBar from "@/components/search-bar";
import { Star, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ search?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { search } = await searchParams;
  return {
    title: search
      ? `ผลการค้นหา "${search}" — Learney`
      : "คอร์สเรียน — Learney",
  };
}

export default async function CoursesPage({ searchParams }: Props) {
  const { search } = await searchParams;
  const keyword = search?.toLowerCase().trim() ?? "";

  const filtered = keyword
    ? coursesData.filter(
        (c) =>
          c.title.toLowerCase().includes(keyword) ||
          c.instructor.toLowerCase().includes(keyword) ||
          c.category.toLowerCase().includes(keyword)
      )
    : coursesData;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search header */}
      <section className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {keyword ? `ผลการค้นหา "${search}"` : "คอร์สเรียนทั้งหมด"}
          </h1>
          <SearchBar defaultValue={search ?? ""} />
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {filtered.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              พบ{" "}
              <span className="font-semibold text-gray-800">
                {filtered.length}
              </span>{" "}
              คอร์ส
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((course, i) => (
                <Card
                  key={course.id}
                  className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white animate-fadeIn"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative h-40 w-full bg-gray-100">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <CardContent className="p-4 space-y-2">
                    <span className="text-xs text-[#4fd6f0] font-medium">
                      {course.category}
                    </span>

                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-500">{course.instructor}</p>

                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-400 ml-1 flex items-center gap-0.5">
                        <Users className="h-3 w-3" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span className="text-sm font-bold text-[#4fd6f0]">
                        {course.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <BookOpen className="h-9 w-9 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              ไม่พบคอร์สที่ค้นหา
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              ลองค้นหาด้วยคำอื่น เช่น &quot;React&quot;,{" "}
              &quot;Design&quot;, หรือ &quot;ภาษา&quot;
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
