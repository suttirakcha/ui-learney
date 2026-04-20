export type Locale = "th" | "en";

export type LocalizedText = {
  th?: string;
  en?: string;
};

export type CourseCardData = {
  id: string;
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description?: LocalizedText;
  category: {
    key: string;
    slug: string;
    name: LocalizedText;
    color?: string | null;
  };
  instructor: {
    id: string;
    name: string;
    image?: string | null;
    bio?: LocalizedText;
    headline?: LocalizedText;
  };
  level?: string | null;
  badge?: string | null;
  coverImage: string;
  previewThumbnail?: string | null;
  rating: number;
  reviewCount: number;
  learners: number;
  price: number;
  discountPrice?: number | null;
  hasPromotion?: boolean;
  promotion?: {
    title: LocalizedText;
    type: string;
    discount?: number | null;
    promoCode?: string | null;
  } | null;
  workflowStatus?: string;
  sourceType?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
};

export type HomePageData = {
  hero: {
    title: LocalizedText;
    subtitle: LocalizedText;
    ctas: Array<{ label: LocalizedText; href: string }>;
  };
  categories: Array<{
    key: string;
    slug: string;
    name: LocalizedText;
    icon?: string | null;
    color?: string | null;
  }>;
  audienceSections: Array<{
    key: string;
    title: LocalizedText;
    description: LocalizedText;
    courses: CourseCardData[];
  }>;
  featuredCourses: Array<{
    rank: number;
    badge?: string | null;
    course: CourseCardData;
  }>;
  popularCourses: CourseCardData[];
  promotions: Array<{
    id: string;
    slug: string;
    title: LocalizedText;
    description: LocalizedText;
    type: string;
    banner?: string | null;
    discount?: number | null;
    promoCode?: string | null;
    startDate: string;
    endDate: string;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    content: string;
    author: string;
    avatar?: string | null;
    course: {
      slug: string;
      title: LocalizedText;
    };
  }>;
  socialProof: {
    students: string;
    instructors: string;
    courses: string;
    rating: string;
  };
  benefits: LocalizedText[];
  activeTheme?: {
    key: string;
    name: LocalizedText;
    assets?: Record<string, unknown> | null;
  } | null;
};

export type BootstrapData = {
  activeTheme?: {
    key: string;
    name?: LocalizedText;
    assets?: Record<string, unknown> | null;
  } | null;
  categories: Array<{
    key: string;
    slug: string;
    name: LocalizedText;
    icon?: string | null;
    color?: string | null;
  }>;
};

export type CatalogData = {
  items: CourseCardData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    categories: Array<{ value: string; label: LocalizedText }>;
    levels: string[];
    ratings: string[];
    priceRanges: string[];
    sortOptions: string[];
  };
  activeFilters: Record<string, string | undefined>;
};

export type CourseDetailData = {
  course: CourseCardData & {
    duration?: string | null;
    previewVideoUrl?: string | null;
    previewThumbnail?: string | null;
    willLearnMessages: string[];
    requirements: string[];
    badges: string[];
    modules: Array<{
      id: string;
      order: number;
      title: LocalizedText;
      summary: LocalizedText;
      lessons: Array<{
        id: string;
        order: number;
        title: LocalizedText;
        summary: LocalizedText;
        keyTakeaways: string[];
        assets: Array<{
          id: string;
          kind: string;
          title: LocalizedText;
        }>;
      }>;
    }>;
    assessments: Array<{
      id: string;
      kind: string;
      title: LocalizedText;
      description: LocalizedText;
      questionCount: number;
    }>;
  };
  reviews: Array<{
    id: string;
    rating: number;
    content: string;
    author: string;
    avatar?: string | null;
  }>;
  discussionPreview: Array<{
    id: string;
    title: LocalizedText;
    content: LocalizedText;
    type: string;
    pinned: boolean;
    author: string;
    role: string;
    replies: Array<{
      id: string;
      content: LocalizedText;
      author: string;
      role: string;
    }>;
  }>;
  relatedCourses: CourseCardData[];
};

export type CommunityData = {
  highlights: {
    totalThreads: number;
    questions: number;
    discussions: number;
  };
  threads: Array<{
    id: string;
    type: string;
    pinned: boolean;
    title: LocalizedText;
    content: LocalizedText;
    author: {
      name: string;
      role: string;
    };
    course?: {
      slug: string;
      title: LocalizedText;
    } | null;
    replies: Array<{
      id: string;
      content: LocalizedText;
      author: {
        name: string;
        role: string;
      };
    }>;
  }>;
};

export type PromotionsData = {
  activeTheme?: {
    key: string;
    name: LocalizedText;
    assets?: Record<string, unknown> | null;
  } | null;
  promotions: Array<{
    id: string;
    slug: string;
    title: LocalizedText;
    description: LocalizedText;
    type: string;
    banner?: string | null;
    discount?: number | null;
    promoCode?: string | null;
    active: boolean;
    themeKey?: string | null;
    courses: CourseCardData[];
  }>;
  featuredCampaigns: Array<{
    rank: number;
    badge?: string | null;
    course: CourseCardData;
  }>;
};

export type SkillTestIntroData = {
  intro: {
    title: LocalizedText;
    subtitle: LocalizedText;
    stats: Array<{ label: string; value: string }>;
  };
  ageGroups: Array<{
    id: string;
    slug: string;
    ageGroup: string;
    title: LocalizedText;
    intro: LocalizedText;
  }>;
  questionSet?: {
    id: string;
    ageGroup: string;
    title: LocalizedText;
    questions: Array<{
      id: string;
      category: string;
      prompt: LocalizedText;
      scale: number[];
    }>;
  } | null;
};

export type SkillAttemptCreateResponse = {
  attemptId: string;
  resultPath: string;
  careersPath: string;
  coursesPath: string;
};

export type SkillTestResultData = {
  attemptId: string;
  ageGroup: string;
  summary: LocalizedText;
  chart: Array<{ category: string; score: number }>;
};

export type CareerCardData = {
  id: string;
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  image?: string | null;
  salaryRange?: string | null;
  requiredSkills: string[];
  matchPercentage: number;
};

export type DashboardData = {
  greeting: {
    title: string;
    subtitle: LocalizedText;
  };
  stats: {
    enrolledCourses: number;
    wishlistItems: number;
    streak: number;
    communityPosts: number;
  };
  learningGraph: Array<{
    category: string;
    before: number;
    after: number;
  }>;
  achievements: Array<{
    key: string;
    label: string;
    unlocked: boolean;
  }>;
  checklist: Array<{
    label: LocalizedText;
    done: boolean;
  }>;
  recommendedNextSteps: LocalizedText[];
  enrolledCourses: CourseCardData[];
  recentDiscovery?: {
    id: string;
    summary: LocalizedText;
  } | null;
};

export type WishlistData = {
  items: CourseCardData[];
};

export type AdminOverviewData = {
  cards: Array<{ label: string; value: number }>;
  latestReviews: Array<{
    id: string;
    rating: number;
    content: string;
    author: string;
    course: LocalizedText;
  }>;
  activePromotion?: { id: string; title: LocalizedText; type: string } | null;
  activeTheme?: { key: string; name: LocalizedText } | null;
  aiQueueCount: number;
  quickActions: Array<{ label: string; href: string }>;
};

export type AdminSectionData = Record<string, unknown>;
