import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type { DashboardData } from "@/types/dashboard/dashboard";
import type {
  AdminPendingPreviewItem,
  InstructorCourseView,
  StudentOverviewData,
} from "@/types/profile";
import type { AuthenticatedUser } from "@/types/user";

type InstructorCourseApi = {
  id: string;
  courseName: string;
  category: string;
  thumbnail: string;
  status: InstructorCourseView["status"];
  createdAt: string;
  price: number | string;
  reviews: Array<{ rating: number }>;
  cartItems: Array<{
    cart: {
      payment: {
        status: string;
      } | null;
    };
  }>;
};

type AdminPendingCourseApi = {
  id: string;
  courseName: string;
  createdAt: string;
  instructor: {
    fullname: string;
  };
};

async function safeJson<T>(res: Response, fallbackMessage: string): Promise<T> {
  const text = await res.text();
  let data: unknown = {};

  try {
    data = text ? (JSON.parse(text) as T) : {};
  } catch {
    throw new Error(fallbackMessage);
  }

  if (!res.ok) {
    const parsed =
      typeof data === "object" && data !== null
        ? (data as { message?: string })
        : {};

    throw new Error(parsed.message || fallbackMessage);
  }

  return data as T;
}

export async function getStudentOverview(): Promise<StudentOverviewData> {
  const res = await fetchWithAuth("/users/me/overview");
  return safeJson<StudentOverviewData>(res, "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้");
}

export async function getInstructorCourses(): Promise<InstructorCourseView[]> {
  const res = await fetchWithAuth("/courses/me");
  const courses = await safeJson<InstructorCourseApi[]>(
    res,
    "ไม่สามารถโหลดคอร์สของผู้สอนได้",
  );

  return courses.map((course) => {
    const successfulSales = course.cartItems.filter(
      (item) => item.cart.payment?.status === "SUCCESS",
    ).length;
    const ratingCount = course.reviews.length;
    const rating =
      ratingCount > 0
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) /
          ratingCount
        : 0;

    return {
      id: course.id,
      courseName: course.courseName,
      category: course.category,
      thumbnail: course.thumbnail,
      status: course.status,
      students: successfulSales,
      rating: Number(rating.toFixed(1)),
      revenue: successfulSales * Number(course.price),
      createdAt: course.createdAt,
    };
  });
}

export async function getAdminPendingPreview(
  limit = 5,
): Promise<AdminPendingPreviewItem[]> {
  const res = await fetchWithAuth(`/admin/courses/pending?limit=${limit}`);
  const courses = await safeJson<AdminPendingCourseApi[]>(
    res,
    "ไม่สามารถโหลดคอร์สรอตรวจสอบได้",
  );

  return courses.map((course) => ({
    id: course.id,
    courseName: course.courseName,
    instructorName: course.instructor.fullname,
    createdAt: course.createdAt,
  }));
}

export async function getAdminDashboard(): Promise<DashboardData> {
  const res = await fetchWithAuth("/admin/dashboard");
  return safeJson<DashboardData>(res, "ไม่สามารถโหลดข้อมูลผู้ดูแลระบบได้");
}

export async function updateMyProfile(payload: {
  fullname: string;
  email: string;
  phone?: string;
  image?: string;
}): Promise<AuthenticatedUser> {
  const res = await fetchWithAuth("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return safeJson<AuthenticatedUser>(res, "ไม่สามารถบันทึกข้อมูลโปรไฟล์ได้");
}

export async function changeMyPassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await fetchWithAuth("/users/me/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return safeJson<{ message: string }>(
    res,
    "ไม่สามารถเปลี่ยนรหัสผ่านได้",
  );
}
