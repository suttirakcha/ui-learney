"use client";

import CourseHeader from "../header/course-header";
import CourseList from "./course-list";

import { Course } from "@/types/course";
import { categories } from "@/lib/categories";

interface CourseListingProps {
  showHeader?: boolean;
  category?: string;
  courses: Course[];
}

const CourseListing = ({
  showHeader,
  category = categories[0],
  courses,
}: CourseListingProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <CourseHeader title={category} />}

      <CourseList courses={courses} selectedCategory={category} />
    </div>
  );
};

export default CourseListing;
