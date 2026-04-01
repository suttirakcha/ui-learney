import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { Course } from "@/types/conse/conse.type";
import { CourseDetail } from "@/types/conse/type-course-detail";

// ===============================
// ✅ GET COURSES
// ===============================
export async function getCourses(category?: string): Promise<Course[]> {
  const query =
    category && category !== "คอร์สเรียนทั้งหมด"
      ? `?category=${encodeURIComponent(category)}`
      : "";

  const res = await fetchWithAuth(`/courses${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

// ===============================
// ✅ GET COURSE DETAIL
// ===============================
export async function getCourseById(id: string): Promise<CourseDetail> {
  const res = await fetchWithAuth(`/courses/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch course detail");
  }

  return res.json();
}
