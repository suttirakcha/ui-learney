import { CourseStat } from "@/types/analytics";

const mockInstructorCourses: CourseStat[] = [
  {
    courseId: "1",
    courseName: "ใช้ AI สร้างรายได้ 2026",
    sales: 45,
    revenue: 89455,
    students: 120,
    rating: 4.8,
    category: { name: "AI_TECH" },
  },
  {
    courseId: "2",
    courseName: "TikTok Marketing Mastery",
    sales: 23,
    revenue: 45670,
    students: 89,
    rating: 4.6,
    category: { name: "MARKETING" },
  },
];

export function useInstructorCourses() {
  return {
    courses: mockInstructorCourses,
    loading: false,
    refetch: () => undefined,
  };
}
