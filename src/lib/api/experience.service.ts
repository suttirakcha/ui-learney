import { fetchApi } from "@/lib/api/fetchApi";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type {
  AdminOverviewData,
  AdminSectionData,
  BootstrapData,
  CareerCardData,
  CatalogData,
  CommunityData,
  CourseDetailData,
  CourseCardData,
  DashboardData,
  HomePageData,
  PromotionsData,
  SkillAttemptCreateResponse,
  SkillTestIntroData,
  SkillTestResultData,
  WishlistData,
} from "@/types/learney";

export class ApiResponseError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(body || `Request failed with status ${status}`);
    this.name = "ApiResponseError";
    this.status = status;
    this.body = body;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new ApiResponseError(
      response.status,
      text || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}

async function safeFetch<T>(
  factory: () => Promise<Response>,
  fallback: T,
): Promise<T> {
  try {
    const response = await factory();
    return await parseJson<T>(response);
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export async function getBootstrapData() {
  return safeFetch<BootstrapData>(() => fetchApi("/experience/bootstrap"), {
    activeTheme: null,
    categories: [],
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
        { label: { th: "สำรวจคอร์ส", en: "Explore Courses" }, href: "/courses" },
      ],
    },
    categories: [],
    audienceSections: [],
    featuredCourses: [],
    popularCourses: [],
    promotions: [],
    reviews: [],
    socialProof: { students: "0", instructors: "0", courses: "0", rating: "0.0" },
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
  return safeFetch<CommunityData>(() => fetchApi(`/experience/community${suffix}`), {
    highlights: { totalThreads: 0, questions: 0, discussions: 0 },
    threads: [],
  });
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
  const suffix = ageGroup
    ? `?ageGroup=${encodeURIComponent(ageGroup)}`
    : "";

  return safeFetch<SkillTestIntroData>(
    () => fetchApi(`/experience/skill-test${suffix}`),
    {
      intro: {
        title: { th: "คุณอาจเก่งมากกว่าที่คิด", en: "You might be more capable than you think" },
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
  return safeFetch<CourseCardData[]>(
    () => fetchApi(`/experience/skill-test/attempts/${attemptId}/courses`),
    [],
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
  return parseJson<AdminOverviewData>(
    await fetchWithAuth("/admin/console/overview"),
  );
}

export async function getAdminSectionData(section: string) {
  return parseJson<AdminSectionData>(
    await fetchWithAuth(`/admin/console/${section}`),
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
