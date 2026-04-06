import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { fetchApi } from "@/lib/api/fetchApi";
import { Course } from "@/types/course";
import { CreateCoursePayload } from "@/types/conse/create-course.type";

// ===============================
// ✅ GET COURSES
// ===============================
export async function getCourses(category?: string): Promise<Course[]> {
  const query =
    category && category !== "คอร์สเรียนทั้งหมด"
      ? `?category=${encodeURIComponent(category)}`
      : "";

  try {
    const res = await fetchApi(query ? `/courses${query}` : `/courses`);

    if (!res.ok) {
      console.error("Failed to fetch courses:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

// ===============================
// ✅ GET COURSE DETAIL
// ===============================
export async function getCourseById(id: string): Promise<Course> {
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
