import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { CourseStat, DashboardData } from "@/types/instructor/instructor.type";

// ===============================
// ✅ GET DASHBOARD
// ===============================
export async function getInstructorDashboard(): Promise<DashboardData> {
  const res = await fetchWithAuth("/instructor/dashboard");

  if (!res.ok) {
    console.log("------", await res.json());
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}

// ===============================
// ✅ GET MY COURSES
// ===============================
export async function getMyCourses(): Promise<CourseStat[]> {
  const res = await fetchWithAuth("/courses/me");

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}
