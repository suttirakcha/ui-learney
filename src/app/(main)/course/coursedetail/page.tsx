import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CourseDetail',
};

import CourseDetailsPage from '@/components/course/coursedetails/DetailPage';

export default function DetailCourse() {
  return (
    <>
      <CourseDetailsPage />
    </>
  );
}
