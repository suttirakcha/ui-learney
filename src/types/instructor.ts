export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string[];
  style: string;
}

export const mockInstructors = [
  {
    id: "inst_ai_nina",
    name: "Nina Tech",
    title: "AI Product Designer",
    avatar: "/mock/instructors/nina.jpg",
    specialty: ["AI", "UX", "Design"],
    style: "อธิบายง่าย มีตัวอย่างจริง",
  },
  {
    id: "inst_dev_ton",
    name: "Ton Dev",
    title: "Full Stack & Startup Mentor",
    avatar: "/mock/instructors/ton.jpg",
    specialty: ["Next.js", "NestJS", "Startup"],
    style: "พูดตรง ใช้งานจริง",
  },
  {
    id: "inst_mark_mint",
    name: "Mint Growth",
    title: "Digital Marketing Strategist",
    avatar: "/mock/instructors/mint.jpg",
    specialty: ["Marketing", "Ads", "Content"],
    style: "สนุก เข้าใจง่าย มีเคสจริง",
  },
  {
    id: "inst_psy_beam",
    name: "Beam Mind",
    title: "Psychology & Self Development Coach",
    avatar: "/mock/instructors/beam.jpg",
    specialty: ["Psychology", "Mindset", "Self Growth"],
    style: "อบอุ่น ให้กำลังใจ",
  },
] as Instructor[];

export interface DashboardStats {
  totalRevenue: number;
  netRevenue: number;
  platformFee: number;
  totalSales: number;
  totalCourses: number;
  totalPublishedCourses: number;
  totalStudents: number;
  avgRating: number;
  pendingCourses: number;
  courses: CourseStat[];
  recentCourses: Array<{
    id: string;
    courseName: string;
    category: string;
    categoryRecord?: { name: string };
    status: string;
    workflowStatus: string;
    enrolledCourses: { id: string }[];
    reviews: { id: string }[];
    updatedAt: string;
  }>;
  recentStudents: Array<{
    id: string;
    user: { fullname: string; image?: string };
    course: { courseName: string };
    createdAt: string;
  }>;
  aiSuggestions: Array<{ title: string; reason: string; template: string }>;
}

export interface CourseStat {
  courseId: string;
  courseName: string;
  sales: number;
  revenue: number;
  students: number;
  rating: number;
  category?: { name: string };
}
