import { fetchApi } from "@/lib/api/fetchApi";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type {
  AdminOverviewData,
  AdminSectionData,
  BootstrapData,
  CareerCardData,
  CatalogData,
  CommunityData,
  CourseCardData,
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

function buildFallbackSkillTestIntroData(
  ageGroup = "Working Age (23+)",
): SkillTestIntroData {
  const fallbackTests: SkillTestIntroData["ageGroups"] = [
    {
      id: "primary-school",
      slug: "primary-school",
      ageGroup: "Primary School (7-12)",
      title: { th: "วัยประถม (7-12 ปี)", en: "Primary School (7-12)" },
      intro: {
        th: "เริ่มค้นหาจุดแข็งผ่านคำถามสั้น ๆ ที่ตอบง่าย",
        en: "Start discovering strengths through short and simple questions.",
      },
    },
    {
      id: "secondary-school",
      slug: "secondary-school",
      ageGroup: "Secondary School (13-18)",
      title: { th: "วัยมัธยม (13-18 ปี)", en: "Secondary School (13-18)" },
      intro: {
        th: "ช่วยให้เห็นแนวทางเรียนต่อและทักษะที่โดดเด่น",
        en: "See the strengths that can guide your next academic step.",
      },
    },
    {
      id: "university",
      slug: "university",
      ageGroup: "University (19-22)",
      title: { th: "วัยมหาวิทยาลัย (19-22 ปี)", en: "University (19-22)" },
      intro: {
        th: "สำรวจบทบาทการทำงานที่น่าจะเหมาะกับตัวคุณ",
        en: "Explore the roles and strengths that fit you best.",
      },
    },
    {
      id: "working-age",
      slug: "working-age",
      ageGroup: "Working Age (23+)",
      title: { th: "วัยทำงาน (23+ ปี)", en: "Working Age (23+)" },
      intro: {
        th: "ทบทวนจุดแข็งการทำงานและดูเส้นทางที่ควรต่อยอด",
        en: "Review your work strengths and see where to grow next.",
      },
    },
  ];

  const questionsByAgeGroup: Record<
    string,
    NonNullable<SkillTestIntroData["questionSet"]>
  > = {
    "Primary School (7-12)": {
      id: "primary-school",
      ageGroup: "Primary School (7-12)",
      title: { th: "สำรวจตัวเองแบบง่าย ๆ", en: "A simple self-discovery test" },
      questions: [
        {
          id: "primary-creativity",
          category: "Creativity",
          prompt: {
            th: "ฉันชอบคิดวิธีใหม่ ๆ เวลาเล่นหรือทำการบ้าน",
            en: "I like thinking of new ways to play or solve homework.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "primary-helping",
          category: "Helping Others",
          prompt: {
            th: "ฉันรู้สึกดีเมื่อได้ช่วยเพื่อนหรือคนในบ้าน",
            en: "I feel happy when I can help friends or family.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "primary-teamwork",
          category: "Teamwork",
          prompt: {
            th: "ฉันทำงานหรือเล่นกับเพื่อนได้ดี",
            en: "I work and play well with others.",
          },
          scale: [1, 2, 3, 4, 5],
        },
      ],
    },
    "Secondary School (13-18)": {
      id: "secondary-school",
      ageGroup: "Secondary School (13-18)",
      title: { th: "แบบประเมินวัยมัธยม", en: "Secondary school assessment" },
      questions: [
        {
          id: "secondary-creativity",
          category: "Creativity",
          prompt: {
            th: "ฉันชอบสร้างไอเดียหรือผลงานที่แตกต่างจากเดิม",
            en: "I enjoy creating ideas or projects that feel original.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "secondary-analysis",
          category: "Analysis",
          prompt: {
            th: "ฉันชอบวิเคราะห์ข้อมูลหรือเปรียบเทียบทางเลือกก่อนตัดสินใจ",
            en: "I like analyzing information before making decisions.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "secondary-communication",
          category: "Communication",
          prompt: {
            th: "ฉันอธิบายสิ่งที่คิดให้เพื่อนหรือครูเข้าใจได้ค่อนข้างดี",
            en: "I can usually explain my ideas clearly to teachers or friends.",
          },
          scale: [1, 2, 3, 4, 5],
        },
      ],
    },
    "University (19-22)": {
      id: "university",
      ageGroup: "University (19-22)",
      title: { th: "แบบประเมินวัยมหาวิทยาลัย", en: "University assessment" },
      questions: [
        {
          id: "university-leadership",
          category: "Leadership",
          prompt: {
            th: "ฉันกล้ารับผิดชอบและพาทีมไปต่อเมื่อโปรเจกต์ติดขัด",
            en: "I step up and help lead when a project gets stuck.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "university-analysis",
          category: "Analysis",
          prompt: {
            th: "ฉันชอบสรุปข้อมูลจำนวนมากให้เหลือประเด็นสำคัญ",
            en: "I like turning lots of information into clear key takeaways.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "university-communication",
          category: "Communication",
          prompt: {
            th: "ฉันนำเสนอความคิดของตัวเองได้อย่างมั่นใจและเข้าใจง่าย",
            en: "I can present my ideas clearly and confidently.",
          },
          scale: [1, 2, 3, 4, 5],
        },
      ],
    },
    "Working Age (23+)": {
      id: "working-age",
      ageGroup: "Working Age (23+)",
      title: { th: "แบบประเมินจุดแข็งการทำงาน", en: "Work strength assessment" },
      questions: [
        {
          id: "working-analysis",
          category: "Analysis",
          prompt: {
            th: "ฉันชอบแยกปัญหาใหญ่ให้เป็นขั้นตอนเล็ก ๆ ก่อนลงมือแก้",
            en: "I like breaking complex problems into clear steps before solving them.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "working-communication",
          category: "Communication",
          prompt: {
            th: "ฉันอธิบายเรื่องซับซ้อนให้คนอื่นเข้าใจได้ชัดเจน",
            en: "I can explain complex topics in a simple and clear way.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "working-teamwork",
          category: "Teamwork",
          prompt: {
            th: "ฉันทำงานร่วมกับคนต่างสไตล์ได้โดยไม่เสียเป้าหมายหลัก",
            en: "I work well with different personalities without losing focus.",
          },
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: "working-leadership",
          category: "Leadership",
          prompt: {
            th: "เมื่อทีมต้องการคนตัดสินใจ ฉันพร้อมรับบทบาทนั้น",
            en: "When a team needs direction, I am willing to step in and lead.",
          },
          scale: [1, 2, 3, 4, 5],
        },
      ],
    },
  };

  return {
    intro: {
      title: {
        th: "คุณอาจเก่งมากกว่าที่คิด",
        en: "You might be more capable than you think",
      },
      subtitle: {
        th: "มองเห็นจุดแข็ง เส้นทางอาชีพ และคอร์สที่เหมาะกับคุณ",
        en: "Discover strengths, career paths, and courses that match you.",
      },
      stats: [
        { label: "users", value: "0+" },
        { label: "careers", value: "0+" },
        { label: "courses", value: "0+" },
      ],
    },
    ageGroups: fallbackTests,
    questionSet:
      questionsByAgeGroup[ageGroup] ?? questionsByAgeGroup["Working Age (23+)"],
  };
}

async function parseJson<T>(response: Response): Promise<T> {
  const url = response.url;

  if (!response.ok) {
    let text = "";
    try {
      text = await response.text();
    } catch {
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
  return safeFetch<BootstrapData>(() => fetchApi("/experience/bootstrap"), {
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
    ] as BootstrapData["categories"],
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
  const fallback = buildFallbackSkillTestIntroData(ageGroup);

  const data = await safeFetch<SkillTestIntroData>(
    () => fetchApi(`/experience/skill-test${suffix}`),
    fallback,
  );

  if (data.ageGroups.length === 0 || (ageGroup && !data.questionSet)) {
    return fallback;
  }

  return data;
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
  return safeFetch<Array<CourseCardData & { matchPercentage?: number }>>(
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
