import { fetchApi } from "@/lib/api/fetchApi";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type {
  AdminOverviewData,
  AdminSectionData,
  CareerCardData,
  CatalogData,
  CommunityData,
  CourseDetailData,
  DashboardData,
  HomePageData,
  PromotionsData,
  SkillAttemptCreateResponse,
  SkillTestIntroData,
  SkillTestResultData,
  WishlistData,
} from "@/types/learney";

export class ApiResponseError extends Error {
  constructor(
    public status: number,
    public body: string,
    public url: string,
  ) {
    super(`Request failed with status ${status} at ${url}`);
    this.name = "ApiResponseError";
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const url = response.url;

  if (!response.ok) {
    let text = "";
    try {
      text = await response.text();
    } catch (e) {
      text = "Could not read response body";
    }
    console.error(
      `[API Error] ${response.status} ${response.statusText} - ${url}\nResponse: ${text}`,
    );
    throw new ApiResponseError(response.status, text, url);
  }

  try {
    const text = await response.text();
    if (!text) return {} as T; // รองรับกรณี Response ส่งกลับมาว่างเปล่า
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(
      `[JSON Parse Error] Failed to parse response from ${url}`,
      error,
    );
    throw new Error(`Invalid JSON format from ${url}`);
  }
}

async function safeFetch<T>(
  factory: () => Promise<Response>,
  fallback: T,
): Promise<T> {
  try {
    const response = await factory();

    console.log(
      `[safeFetch] ${response.status} ${response.statusText} -> ${response.url}`,
    );

    return await parseJson<T>(response);
  } catch (error) {
    if (error instanceof ApiResponseError) {
      console.error(
        `[safeFetch] API ERROR ${error.status} at ${error.url}\nBody: ${error.body}`,
      );
    } else if (error instanceof Error) {
      console.error("[safeFetch] Handled Exception:", error.message);
      console.error(error.stack);

      if (error.message === "fetch failed") {
        console.error(
          "[safeFetch] Network error: check NEXT_PUBLIC_API, backend port, backend server, and CORS.",
        );
      }
    } else {
      console.error("[safeFetch] Unknown Exception:", error);
    }

    return fallback;
  }
}

export async function getBootstrapData() {
  return safeFetch(() => fetchApi("/experience/bootstrap"), {
    activeTheme: null,
    // เมื่อ Backend ล่ม (500) ให้ใช้ Mock Data นี้แทนชั่วคราว เพื่อให้ UI นำไป Render ได้ไม่พัง
    categories: [
      {
        key: "ai",
        slug: "ai-machine-learning",
        name: { th: "AI และ Machine Learning", en: "AI & Machine Learning" },
      },
      {
        key: "data",
        slug: "data-science",
        name: { th: "วิทยาการข้อมูล", en: "Data Science" },
      },
      {
        key: "dev",
        slug: "development",
        name: { th: "การพัฒนาซอฟต์แวร์", en: "Software Development" },
      },
    ] as any[], // อนุโลมใช้ any ชั่วคราวเนื่องจากไม่มี Type แจกแจงในไฟล์นี้
  });
}

export async function getHomePageData() {
  return safeFetch<HomePageData>(() => fetchApi("/experience/home"), {
    hero: {
      title: { th: "เติบโตทักษะ AI", en: "Grow your AI skills" },
      subtitle: {
        th: "เริ่มต้นเส้นทางใหม่กับ LEARNEY",
        en: "Start your next chapter with LEARNEY",
      },
      ctas: [
        {
          label: { th: "สำรวจคอร์ส", en: "Explore Courses" },
          href: "/courses",
        },
      ],
    },
    categories: [],
    audienceSections: [],
    featuredCourses: [],
    popularCourses: [],
    promotions: [],
    reviews: [],
    socialProof: {
      students: "0",
      instructors: "0",
      courses: "0",
      rating: "0.0",
    },
    benefits: [],
    activeTheme: null,
  });
}

export async function getCatalogData(queryString = "") {
  const suffix = queryString ? `?${queryString}` : "";
  return safeFetch<CatalogData>(
    () => fetchApi(`/experience/courses${suffix}`),
    {
      items: [],
      total: 0,
      page: 1,
      pageSize: 9,
      totalPages: 1,
      filters: {
        categories: [],
        levels: [],
        ratings: [],
        priceRanges: [],
        sortOptions: [],
      },
      activeFilters: {},
    },
  );
}

export async function getCourseDetailData(slugOrId: string) {
  return safeFetch<CourseDetailData>(
    () => fetchApi(`/experience/courses/${slugOrId}`),
    {
      course: {
        id: slugOrId,
        slug: slugOrId,
        title: { th: "ไม่พบคอร์ส", en: "Course not found" },
        shortDescription: { th: "", en: "" },
        category: {
          key: "unknown",
          slug: "unknown",
          name: { th: "ไม่ระบุ", en: "Unknown" },
        },
        instructor: { id: "unknown", name: "Learney" },
        coverImage: "https://placehold.co/1200x800/f7dfe5/4a3245?text=LEARNEY",
        rating: 0,
        reviewCount: 0,
        learners: 0,
        price: 0,
        willLearnMessages: [],
        requirements: [],
        badges: [],
        modules: [],
        assessments: [],
      },
      reviews: [],
      discussionPreview: [],
      relatedCourses: [],
    },
  );
}

export async function getCommunityData(courseId?: string) {
  const suffix = courseId ? `?courseId=${encodeURIComponent(courseId)}` : "";
  return safeFetch<CommunityData>(
    () => fetchApi(`/experience/community${suffix}`),
    {
      highlights: { totalThreads: 0, questions: 0, discussions: 0 },
      threads: [],
    },
  );
}

export async function createCommunityThread(payload: Record<string, unknown>) {
  const response = await fetchWithAuth("/experience/community/threads", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function createCommunityReply(
  threadId: string,
  payload: Record<string, unknown>,
) {
  const response = await fetchWithAuth(
    `/experience/community/threads/${threadId}/replies`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return parseJson(response);
}

export async function reportCommunityContent(payload: Record<string, unknown>) {
  const response = await fetchWithAuth("/experience/community/report", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function getPromotionsData() {
  return safeFetch<PromotionsData>(() => fetchApi("/experience/promotions"), {
    activeTheme: null,
    promotions: [],
    featuredCampaigns: [],
  });
}

export async function getSkillTestIntroData(ageGroup?: string) {
  const suffix = ageGroup ? `?ageGroup=${encodeURIComponent(ageGroup)}` : "";

  return safeFetch<SkillTestIntroData>(
    () => fetchApi(`/experience/skill-test${suffix}`),
    {
      intro: {
        title: {
          th: "คุณอาจเก่งมากกว่าที่คิด",
          en: "You might be more capable than you think",
        },
        subtitle: {
          th: "ค้นหาศักยภาพของคุณ",
          en: "Discover your strengths",
        },
        stats: [],
      },
      ageGroups: [],
      questionSet: null,
    },
  );
}

export async function createSkillAttempt(payload: Record<string, unknown>) {
  const response = await fetchApi("/experience/skill-test/attempts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return parseJson<SkillAttemptCreateResponse>(response);
}

export async function getSkillResultData(attemptId: string) {
  return safeFetch<SkillTestResultData>(
    () => fetchApi(`/experience/skill-test/attempts/${attemptId}`),
    {
      attemptId,
      ageGroup: "",
      summary: { th: "", en: "" },
      chart: [],
    },
  );
}

export async function getCareerRecommendationsData(attemptId: string) {
  return safeFetch<CareerCardData[]>(
    () => fetchApi(`/experience/skill-test/attempts/${attemptId}/careers`),
    [],
  );
}

export async function getRecommendedCoursesData(attemptId: string) {
  return safeFetch(
    () => fetchApi(`/experience/skill-test/attempts/${attemptId}/courses`),
    [] as Array<Record<string, unknown>>,
  );
}

export async function getDashboardData() {
  return safeFetch<DashboardData | null>(
    () => fetchWithAuth("/experience/dashboard"),
    null,
  );
}

export async function getWishlistData() {
  return safeFetch<WishlistData>(() => fetchWithAuth("/experience/wishlist"), {
    items: [],
  });
}

export async function addToWishlist(courseId: string) {
  const response = await fetchWithAuth(`/experience/wishlist/${courseId}`, {
    method: "POST",
  });

  return parseJson(response);
}

export async function removeFromWishlist(courseId: string) {
  const response = await fetchWithAuth(`/experience/wishlist/${courseId}`, {
    method: "DELETE",
  });

  return parseJson(response);
}

export async function getAdminOverviewData() {
  return safeFetch<AdminOverviewData>(
    () => fetchWithAuth("/admin/console/overview"),
    {
      cards: [],
      latestReviews: [],
      activePromotion: null,
      activeTheme: null,
      aiQueueCount: 0,
      quickActions: [],
    },
  );
}

export async function getAdminSectionData(section: string) {
  return safeFetch<AdminSectionData>(
    () => fetchWithAuth(`/admin/console/${section}`),
    {},
  );
}

export async function applyAdminAction(
  section: string,
  action: string,
  payload?: Record<string, unknown>,
) {
  const response = await fetchWithAuth(`/admin/console/${section}/actions`, {
    method: "POST",
    body: JSON.stringify({ action, payload }),
  });

  return parseJson(response);
}
