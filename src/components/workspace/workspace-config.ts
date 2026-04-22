import type { WorkspaceRole } from "@/types/workspace";

export const workspaceMenus: Record<
  WorkspaceRole,
  Array<{ key: string; label: string; href: string }>
> = {
  admin: [
    { key: "overview", label: "แดชบอร์ด", href: "/admin" },
    { key: "home-showcase", label: "Home Showcase", href: "/admin/home-showcase" },
    { key: "courses", label: "จัดการคอร์ส", href: "/admin/courses" },
    { key: "video-previews", label: "วิดีโอพรีวิว", href: "/admin/video-previews" },
    { key: "course-approvals", label: "คอร์สรออนุมัติ", href: "/admin/course-approvals" },
    { key: "analytics", label: "Analytics", href: "/admin/analytics" },
    { key: "promotions", label: "โปรโมชัน", href: "/admin/promotions" },
    { key: "themes", label: "ธีมเทศกาล", href: "/admin/themes" },
    { key: "skill-exercises", label: "แบบฝึกสกิล", href: "/admin/skill-exercises" },
    { key: "content-review-queue", label: "Content Review Queue", href: "/admin/content-review-queue" },
    { key: "ai-draft-approval", label: "AI Draft Approval", href: "/admin/ai-draft-approval" },
    { key: "users", label: "จัดการผู้ใช้งาน", href: "/admin/users" },
    { key: "instructors", label: "จัดการผู้สอน", href: "/admin/instructors" },
    {
      key: "instructor-applications",
      label: "คำขอสมัครเป็นผู้สอน",
      href: "/admin/instructor-applications",
    },
    { key: "settings", label: "Settings", href: "/admin/settings" },
    { key: "notifications", label: "การแจ้งเตือน", href: "/admin/notifications" },
  ],
  instructor: [
    { key: "overview", label: "แดชบอร์ดผู้สอน", href: "/instructor" },
    { key: "courses", label: "คอร์สของฉัน", href: "/instructor/courses" },
    { key: "reviews", label: "รีวิวล่าสุด", href: "/instructor/reviews" },
    { key: "students", label: "นักเรียนของฉัน", href: "/instructor/students" },
    { key: "analytics", label: "Analytics", href: "/instructor/analytics" },
    { key: "skill-exercises", label: "แบบฝึกของฉัน", href: "/instructor/skill-exercises" },
    { key: "profile", label: "โปรไฟล์ผู้สอน", href: "/instructor/profile" },
    { key: "notifications", label: "การแจ้งเตือน", href: "/instructor/notifications" },
  ],
  student: [
    { key: "overview", label: "แดชบอร์ดผู้เรียน", href: "/student" },
    { key: "my-courses", label: "คอร์สของฉัน", href: "/student/my-courses" },
    { key: "exercises", label: "แบบฝึกและ Quiz", href: "/student/exercises" },
    { key: "orders", label: "รายการสั่งซื้อ", href: "/student/orders" },
    { key: "certificates", label: "ใบรับรองของฉัน", href: "/student/certificates" },
    { key: "wishlist", label: "คอร์สที่บันทึกไว้", href: "/student/wishlist" },
    { key: "become-instructor", label: "สมัครเป็นผู้สอน", href: "/student/become-instructor" },
    { key: "profile", label: "โปรไฟล์ของฉัน", href: "/student/profile" },
    { key: "notifications", label: "การแจ้งเตือน", href: "/student/notifications" },
  ],
};
