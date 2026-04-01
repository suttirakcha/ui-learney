import { Course } from "@/types/conse/conse.type";
import CategoryButtons from "../category/category-btn";

import CourseCard from "./course-card";

interface CourseListProps {
  courses: Course[];
  selectedCategory: string;
}

export default function CourseList({
  courses,
  selectedCategory,
}: CourseListProps) {
  return (
    <div className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <CategoryButtons />

        <p className="text-gray-600 mb-6 font-medium">
          พบ {courses.length} คอร์สเรียน
          {selectedCategory !== "คอร์สเรียนทั้งหมด" &&
            ` ในหมวด "${selectedCategory}"`}
        </p>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              ไม่พบคอร์สเรียนในหมวดหมู่นี้
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
