import { LocalizedText, Locale } from "@/types/learney";

export function pickLocalized(
  value: LocalizedText | string | null | undefined,
  locale: Locale,
  fallback = "",
) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value[locale] ?? value.th ?? value.en ?? fallback;
}

export function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(
    value,
  );
}

export function roleLabel(role: string, locale: Locale) {
  if (role === "ADMIN") {
    return locale === "th" ? "แอดมิน" : "Admin";
  }

  if (role === "INSTRUCTOR") {
    return locale === "th" ? "ผู้สอน" : "Instructor";
  }

  return locale === "th" ? "สมาชิก" : "Member";
}

export const adminSections = [
  {
    slug: "home-showcase",
    label: { th: "Home Showcase", en: "Home Showcase" },
  },
  { slug: "courses", label: { th: "จัดการคอร์ส", en: "Manage Courses" } },
  {
    slug: "fixed-categories",
    label: { th: "หมวดหมู่คงที่", en: "Fixed Categories" },
  },
  {
    slug: "instructors",
    label: { th: "ผู้สอน", en: "Instructors" },
  },
  {
    slug: "video-preview",
    label: { th: "วิดีโอพรีวิว", en: "Video Preview" },
  },
  {
    slug: "ratings-reviews",
    label: { th: "เรตติ้งและรีวิว", en: "Ratings & Reviews" },
  },
  {
    slug: "popular-courses",
    label: { th: "คอร์สยอดนิยม", en: "Popular Courses" },
  },
  { slug: "community", label: { th: "คอมมูนิตี้", en: "Community" } },
  { slug: "promotions", label: { th: "โปรโมชัน", en: "Promotions" } },
  {
    slug: "seasonal-themes",
    label: { th: "ธีมตามเทศกาล", en: "Seasonal Themes" },
  },
  { slug: "ai-tests", label: { th: "AI Tests", en: "AI Tests" } },
  {
    slug: "career-matching",
    label: { th: "Career Matching", en: "Career Matching" },
  },
  { slug: "analytics", label: { th: "Analytics", en: "Analytics" } },
  { slug: "settings", label: { th: "ตั้งค่า", en: "Settings" } },
  {
    slug: "ai-course-builder",
    label: { th: "AI Course Builder", en: "AI Course Builder" },
  },
  {
    slug: "ai-lesson-generator",
    label: { th: "AI Lesson Generator", en: "AI Lesson Generator" },
  },
  {
    slug: "ai-video-content-studio",
    label: { th: "AI Video Content Studio", en: "AI Video Content Studio" },
  },
  {
    slug: "ai-case-study-generator",
    label: { th: "AI Case Study Generator", en: "AI Case Study Generator" },
  },
  {
    slug: "ai-quiz-generator",
    label: { th: "AI Quiz Generator", en: "AI Quiz Generator" },
  },
  {
    slug: "course-expansion-suggestions",
    label: {
      th: "Course Expansion Suggestions",
      en: "Course Expansion Suggestions",
    },
  },
  {
    slug: "content-review-queue",
    label: { th: "Content Review Queue", en: "Content Review Queue" },
  },
  {
    slug: "ai-draft-approval",
    label: { th: "AI Draft Approval", en: "AI Draft Approval" },
  },
] as const;
