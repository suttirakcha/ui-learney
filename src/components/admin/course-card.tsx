import { Course } from "@/types/admin/course";
import PendingActions from "./pending-actions";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <div className="border rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{course.courseName}</h3>
        <p className="text-sm text-gray-500">{course.instructor.fullname}</p>
      </div>

      <PendingActions id={course.id} />
    </div>
  );
}
