import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { Course } from "@/types/course";
import { CourseDetail } from "@/types/conse/type-course-detail";
import { CreateCoursePayload } from "@/types/conse/create-course.type";

// ===============================
// ✅ GET COURSES
// ===============================
export async function getCourses(category?: string): Promise<Course[]> {
  const query =
    category && category !== "คอร์สเรียนทั้งหมด"
      ? `?category=${encodeURIComponent(category)}`
      : "";

  const res = await fetchWithAuth(query ? `/courses${query}` : `/courses`);

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

// ===============================
// ✅ CREATE COURSE (🔥 อันที่คุณขาด)
// ===============================
export async function createCourse(data: CreateCoursePayload) {
  const res = await fetchWithAuth("/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ createCourse error:", text);
    throw new Error("Create course failed");
  }

  return res.json();
}
