import { Course } from "@/types/admin/type-admin";
import PendingActions from "./pending-actions";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <div style={{ border: "1px solid", margin: 10, padding: 10 }}>
      <h3>{course.courseName}</h3>
      <p>{course.instructor.fullname}</p>

      <PendingActions id={course.id} />
    </div>
  );
}
