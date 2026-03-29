"use client";

import React, { useState, useMemo } from "react";
// แก้ Path ตามโครงสร้างโฟลเดอร์ในรูปของคุณ
import CourseHeader from "../header/course-header";
import CategoryButtons from "../category/category-btn";
import CourseCard from "./course-card";
import { coursesData } from "@/data/courses";

const CourseListing: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("คอร์สเรียนทั้งหมด");

  const filteredCourses = useMemo(() => {
    return coursesData.filter(
      (course) =>
        selectedCategory === "คอร์สเรียนทั้งหมด" ||
        course.category === selectedCategory,
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ใช้งาน Header ที่แยกออกมา */}
      <CourseHeader categoryName={selectedCategory} />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <CategoryButtons
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <p className="text-gray-700 mb-8 font-bold text-lg">
          พบ {filteredCourses.length} คอร์สเรียน
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseListing;
