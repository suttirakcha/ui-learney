'use client';

import { useState, useMemo } from 'react';
import CourseHeader from '../header/course-header';
import { coursesData } from '@/data/courses';
import CourseList from './course-list';

interface CourseListingProps {
  showHeader?: boolean;
}

const CourseListing = ({ showHeader }: CourseListingProps) => {
  const [selectedCategory, setSelectedCategory] = useState('คอร์สเรียนทั้งหมด');

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        selectedCategory === 'คอร์สเรียนทั้งหมด' ||
        course.category === selectedCategory;

      return matchesCategory;
    });
  }, [selectedCategory]);

  return (
    <div className='min-h-screen bg-gray-50'>
      {showHeader && <CourseHeader title={selectedCategory} />}
      <CourseList
        courses={filteredCourses}
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default CourseListing;
