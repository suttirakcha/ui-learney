import InstructorCourseCard from "./InstructorCourseCard";
import InstructorRecentActivity from "./InstructorRecentActivity";

export default function InstructorOverview() {
  return (
    <div className="space-y-6">
      {/* My Courses */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">คอร์สเรียนของฉัน</h2>

        <div className="flex flex-col gap-4">
          <InstructorCourseCard />
          <InstructorCourseCard />
          <InstructorCourseCard />
        </div>
      </section>

      {/* Recent Activities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">กิจกรรมล่าสุด</h2>

        <div className="flex flex-col gap-4 p-6 border border-accent rounded-lg">
          <InstructorRecentActivity />
          <InstructorRecentActivity />
        </div>
      </section>
    </div>
  );
}
