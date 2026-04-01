import { Course } from "@/types/course";
import CourseCard from "./CourseCard";

type Props = {
  courses: Course[];
};

export default function CourseList({ courses }: Props) {
  if (courses.length === 0) {
    return <p className="text-center text-gray-500">ไม่มีคอร์สรอตรวจสอบ</p>;
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
