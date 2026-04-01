"use client";

import { useState, useEffect } from "react";
import CourseHeader from "../header/course-header";
import CourseList from "./course-list";

import { getCourses } from "@/lib/api/course/course.service";
import { Course } from "@/types/conse/conse.type";

interface CourseListingProps {
  showHeader?: boolean;
}

const CourseListing = ({ showHeader }: CourseListingProps) => {
  const [selectedCategory, setSelectedCategory] = useState("คอร์สเรียนทั้งหมด");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses(selectedCategory);
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <CourseHeader title={selectedCategory} />}

      {loading ? (
        <div className="text-center py-20">กำลังโหลด...</div>
      ) : (
        <CourseList
          courses={courses}
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
};

export default CourseListing;
