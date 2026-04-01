import StudentCourseCard from "./StudentCourseCard";
import StudentInfoCard from "./StudentInfoCard";

export default function StudentHistory() {
  return (
    <div className="space-y-6">
      {/* My Courses */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ความก้าวหน้าทางการเรียน</h2>

        <StudentInfoCard />
      </section>

      {/* Continue Learning */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ประวัติคอร์สเรียน</h2>
        <StudentCourseCard />
      </section>
    </div>
  );
}
