import { CourseStat } from "@/types/instructor/instructor.type";

export default function CoursesGrid({ courses }: { courses: CourseStat[] }) {
  if (courses.length === 0) {
    return <div className="text-center p-6">No courses yet</div>;
  }

  return (
    <div className="space-y-4">
      {" "}
      <h2 className="text-lg font-semibold">Your Courses</h2>
      {courses.map((c) => (
        <div
          key={c.courseId}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{c.courseName}</h3>
            <p className="text-sm text-gray-500">
              {c.students} students • ⭐ {c.rating.toFixed(1)}
            </p>
          </div>

          <div className="flex gap-6 text-center">
            <div>
              <p className="text-gray-400 text-sm">Sales</p>
              <p className="font-bold">{c.sales}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="font-bold text-cyan-600">
                ฿{c.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
