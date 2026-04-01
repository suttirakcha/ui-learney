import CategoryButtons from '../category/category-btn';
import { Course } from '@/data/courses';
import CourseCard from './course-card';
import { useTranslations } from 'next-intl';

interface CourseListProps {
  courses: Course[];
  selectedCategory: string;
  onSelectedCategory: (category: string) => void;
}

export default function CourseList({
  courses,
  selectedCategory,
  onSelectedCategory,
}: CourseListProps) {
  const tList = useTranslations("courseList");
  const tCat = useTranslations("categories");

  return (
    <div className='px-8 py-12'>
      <div className='max-w-7xl mx-auto'>
        <CategoryButtons
          selectedCategory={selectedCategory}
          onCategoryChange={onSelectedCategory}
        />

        <p className='text-gray-600 mb-6 font-medium'>
          {tList("found", { count: courses.length })}
          {selectedCategory !== 'all' &&
            tList("inCategory", { category: tCat(selectedCategory) })}
        </p>

        {courses.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100'>
            <p className='text-gray-500 text-lg'>
              {tList("noCourses")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
