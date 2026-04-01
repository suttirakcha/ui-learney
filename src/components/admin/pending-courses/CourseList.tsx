import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import { useTranslations } from "next-intl";

type Props = {
  courses: Course[];
};

export default function CourseList({ courses }: Props) {
  const t = useTranslations("admin.pendingCourses");

  if (courses.length === 0) {
    return <p className="text-center text-gray-500">{t("emptyList")}</p>;
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
