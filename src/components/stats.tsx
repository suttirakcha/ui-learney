import { coursesData } from "@/data/courses";
import StatsGrid, { type StatItem } from "./stats-grid";

function computeStats(): StatItem[] {
  const totalStudents = coursesData.reduce((sum, c) => sum + c.students, 0);
  const uniqueInstructors = new Set(coursesData.map((c) => c.instructor)).size;
  const totalCourses = coursesData.length;
  const avgRating =
    coursesData.reduce((sum, c) => sum + c.rating, 0) / coursesData.length;

  return [
    {
      value: Math.round(totalStudents / 1000),
      suffix: "K+",
      label: "นักเรียนทั้งหมด",
      icon: "Users",
    },
    {
      value: uniqueInstructors,
      suffix: "+",
      label: "ผู้สอนผู้เชี่ยวชาญ",
      icon: "GraduationCap",
    },
    {
      value: totalCourses,
      suffix: "+",
      label: "คอร์สเรียน",
      icon: "BookOpen",
    },
    {
      value: avgRating,
      suffix: "/5",
      label: "คะแนนเฉลี่ย",
      icon: "Star",
      decimals: 1,
    },
  ];
}

export default function Stats() {
  const stats = computeStats();

  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
