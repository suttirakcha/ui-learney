"use client";

import React, { useState, useMemo } from "react";
import CourseHeader from "../header/course-header";
import CourseCard from "./course-card";
import CategoryButtons from "../category/category-btn";
import { coursesData } from "@/data/courses";

const CourseListing: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("คอร์สเรียนทั้งหมด");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        selectedCategory === "คอร์สเรียนทั้งหมด" ||
        course.category === selectedCategory;

      return matchesCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader categoryName={selectedCategory} />

      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <CategoryButtons
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <p className="text-gray-600 mb-6 font-medium">
            พบ {filteredCourses.length} คอร์สเรียน
            {selectedCategory !== "คอร์สเรียนทั้งหมด" &&
              ` ในหมวด "${selectedCategory}"`}
          </p>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
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
    </div>
  );
};

export default CourseListing;
