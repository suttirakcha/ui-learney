import type { HomeShowcase } from "@/modules/home-showcase/types/home-showcase.type";
import type { CourseCardData, HomePageData } from "@/types/learney";

export function createCourseCard(
  overrides: Partial<CourseCardData> = {},
): CourseCardData {
  const categoryOverride: Partial<CourseCardData["category"]> =
    overrides.category ?? {};
  const instructorOverride: Partial<CourseCardData["instructor"]> =
    overrides.instructor ?? {};

  return {
    id: overrides.id ?? "course-1",
    slug: overrides.slug ?? "sample-course",
    title: {
      th: "คอร์สตัวอย่าง",
      en: "Sample course",
      ...(overrides.title ?? {}),
    },
    shortDescription: {
      th: "คำอธิบายสั้น",
      en: "Short description",
      ...(overrides.shortDescription ?? {}),
    },
    description: overrides.description,
    category: {
      key: categoryOverride.key ?? "ai",
      slug: categoryOverride.slug ?? "ai",
      name: {
        th: "AI",
        en: "AI",
        ...(categoryOverride.name ?? {}),
      },
      color: categoryOverride.color,
    },
    instructor: {
      id: instructorOverride.id ?? "instructor-1",
      name: instructorOverride.name ?? "Jane Doe",
      image: instructorOverride.image,
      bio: instructorOverride.bio,
      headline: instructorOverride.headline,
    },
    level: overrides.level ?? "Beginner",
    badge: overrides.badge ?? "Hot",
    coverImage: overrides.coverImage ?? "/course-cover.png",
    previewThumbnail: overrides.previewThumbnail,
    rating: overrides.rating ?? 4.7,
    reviewCount: overrides.reviewCount ?? 32,
    learners: overrides.learners ?? 1200,
    price: overrides.price ?? 1290,
    discountPrice: overrides.discountPrice ?? 990,
    hasPromotion: overrides.hasPromotion,
    promotion: overrides.promotion ?? null,
    workflowStatus: overrides.workflowStatus,
    sourceType: overrides.sourceType,
    isPopular: overrides.isPopular,
    isFeatured: overrides.isFeatured,
  };
}

export function createHomeShowcase(
  overrides: Partial<HomeShowcase> = {},
): HomeShowcase {
  return {
    id: overrides.id ?? "showcase-1",
    title: overrides.title ?? "Launch your next AI skill",
    subtitle: overrides.subtitle ?? "Build momentum with guided pathways",
    badge: overrides.badge ?? "Spring spotlight",
    description: overrides.description,
    desktopImageUrl:
      overrides.desktopImageUrl ??
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    mobileImageUrl:
      overrides.mobileImageUrl ??
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    primaryText: overrides.primaryText ?? "Explore now",
    primaryHref: overrides.primaryHref ?? "/courses/featured",
    secondaryText: overrides.secondaryText ?? "Learn more",
    secondaryHref: overrides.secondaryHref ?? "https://example.com/learn-more",
    overlayOpacity: overrides.overlayOpacity ?? 0.3,
    textAlign: overrides.textAlign ?? "left",
    mediaPosition: overrides.mediaPosition ?? "right",
    enableAnimation: overrides.enableAnimation ?? true,
    enableFloating: overrides.enableFloating ?? true,
    sortOrder: overrides.sortOrder ?? 1,
    isActive: overrides.isActive ?? true,
    startsAt: overrides.startsAt ?? null,
    endsAt: overrides.endsAt ?? null,
    createdAt: overrides.createdAt ?? "2026-04-22T00:00:00.000Z",
    updatedAt: overrides.updatedAt ?? "2026-04-22T00:00:00.000Z",
  };
}

export function createHomePageData(
  overrides: Partial<HomePageData> = {},
): HomePageData {
  const primaryCourse = createCourseCard();
  const featuredCourse = createCourseCard({
    id: "course-2",
    slug: "featured-course",
    title: { en: "Featured course", th: "คอร์สแนะนำ" },
  });

  return {
    hero: {
      title: {
        th: "เติบโตทักษะ AI",
        en: "Grow your AI skills",
        ...(overrides.hero?.title ?? {}),
      },
      subtitle: {
        th: "เริ่มต้นเส้นทางใหม่กับ LEARNEY",
        en: "Start your next chapter with LEARNEY",
        ...(overrides.hero?.subtitle ?? {}),
      },
      ctas: overrides.hero?.ctas ?? [
        {
          label: { th: "สำรวจคอร์ส", en: "Explore courses" },
          href: "/courses",
        },
      ],
    },
    categories: overrides.categories ?? [],
    audienceSections: overrides.audienceSections ?? [
      {
        key: "students",
        title: { th: "สำหรับนักเรียน", en: "For students" },
        description: {
          th: "เนื้อหาเริ่มต้นสำหรับผู้เรียน",
          en: "Starter tracks for learners",
        },
        courses: [primaryCourse],
      },
    ],
    featuredCourses: overrides.featuredCourses ?? [
      {
        rank: 1,
        badge: "Top pick",
        course: featuredCourse,
      },
    ],
    popularCourses: overrides.popularCourses ?? [],
    promotions: overrides.promotions ?? [
      {
        id: "promotion-1",
        slug: "promo-1",
        title: { th: "โปรโมชัน 1", en: "Promotion 1" },
        description: { th: "รายละเอียด 1", en: "Promotion details 1" },
        type: "FLASH",
        banner: null,
        discount: 10,
        promoCode: "PROMO1",
        startDate: "2026-04-01T00:00:00.000Z",
        endDate: "2026-04-30T00:00:00.000Z",
      },
      {
        id: "promotion-2",
        slug: "promo-2",
        title: { th: "โปรโมชัน 2", en: "Promotion 2" },
        description: { th: "รายละเอียด 2", en: "Promotion details 2" },
        type: "FLASH",
        banner: null,
        discount: 15,
        promoCode: "PROMO2",
        startDate: "2026-04-01T00:00:00.000Z",
        endDate: "2026-04-30T00:00:00.000Z",
      },
      {
        id: "promotion-3",
        slug: "promo-3",
        title: { th: "โปรโมชัน 3", en: "Promotion 3" },
        description: { th: "รายละเอียด 3", en: "Promotion details 3" },
        type: "FLASH",
        banner: null,
        discount: 20,
        promoCode: "PROMO3",
        startDate: "2026-04-01T00:00:00.000Z",
        endDate: "2026-04-30T00:00:00.000Z",
      },
      {
        id: "promotion-4",
        slug: "promo-4",
        title: { th: "โปรโมชัน 4", en: "Promotion 4" },
        description: { th: "รายละเอียด 4", en: "Promotion details 4" },
        type: "FLASH",
        banner: null,
        discount: 25,
        promoCode: "PROMO4",
        startDate: "2026-04-01T00:00:00.000Z",
        endDate: "2026-04-30T00:00:00.000Z",
      },
    ],
    reviews: overrides.reviews ?? [
      {
        id: "review-1",
        rating: 4,
        content: "Great momentum and clear guidance.",
        author: "Nisa",
        avatar: null,
        course: {
          slug: "sample-course",
          title: { th: "คอร์สตัวอย่าง", en: "Sample course" },
        },
      },
    ],
    socialProof: {
      students: "1200+",
      instructors: "24",
      courses: "80",
      rating: "4.8",
      ...(overrides.socialProof ?? {}),
    },
    benefits: overrides.benefits ?? [
      { th: "เรียนอย่างมั่นใจ", en: "Learn with confidence" },
      { th: "มีคอมมูนิตี้ช่วยกัน", en: "Community support" },
      { th: "คอร์สคัดมาแล้ว", en: "Curated pathways" },
    ],
    activeTheme: overrides.activeTheme ?? null,
  };
}
