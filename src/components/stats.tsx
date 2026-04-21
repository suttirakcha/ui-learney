import StatsGrid, { type StatItem } from "./stats-grid";

async function fetchStats() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/stats`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json() as Promise<{
      totalUsers: number;
      totalInstructors: number;
      totalCourses: number;
      avgRating: number | null;
    }>;
  } catch {
    return null;
  }
}

export default async function Stats() {
  const data = await fetchStats();

  const stats: StatItem[] = [
    {
      value: data ? data.totalUsers : 0,
      suffix: "+",
      label: "นักเรียนที่ลงทะเบียน",
      icon: "Users",
    },
    {
      value: data ? data.totalInstructors : 0,
      suffix: "+",
      label: "ผู้สอนผู้เชี่ยวชาญ",
      icon: "GraduationCap",
    },
    {
      value: data ? data.totalCourses : 0,
      suffix: "+",
      label: "คอร์สเรียน",
      icon: "BookOpen",
    },
    {
      value: data?.avgRating ?? 0,
      suffix: "/5",
      label: "คะแนนเฉลี่ย",
      icon: "Star",
      decimals: 1,
    },
  ];

  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
