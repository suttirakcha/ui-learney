type CourseImageLookupInput = {
  id?: string | null;
  title?: string | null;
  category?: string | null;
};

type CourseImageSpec = {
  key: string;
  baseUrl: string;
  keyword: string;
  reason: string;
  aliases?: string[];
};

const imageLibrary = {
  learnerDesk: {
    baseUrl:
      "https://images.unsplash.com/photo-1759984782211-3a02ca78e6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjMxMzZ8MHwxfHNlYXJjaHwxMnx8d3JpdGluZyUyMG5vdGVzJTIwbGFwdG9wfGVufDB8fHx8MTc3NjkzMTAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    keyword: "focused learning study desk",
    reason:
      "A friendly study scene works well for beginner-friendly learning and practice-heavy courses.",
  },
  codeLaptop: {
    baseUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    keyword: "coding laptop",
    reason:
      "A coding workspace matches software development and frontend engineering courses.",
  },
  backendCode: {
    baseUrl: "https://images.unsplash.com/photo-1672385277648-85eddc237a2b",
    keyword: "backend api development",
    reason:
      "Close-up source code is a good fit for Node.js, APIs, and backend engineering.",
  },
  figmaWorkspace: {
    baseUrl: "https://images.unsplash.com/photo-1621111848501-8d3634f82336",
    keyword: "figma ui design workspace",
    reason:
      "A polished interface design setup matches UI/UX, Figma, and design-centered courses.",
  },
  designWorkshop: {
    baseUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0",
    keyword: "graphic design creative workshop",
    reason:
      "A creative workshop scene fits graphic design and collaborative visual work.",
  },
  travelPassport: {
    baseUrl:
      "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwcGFzc3BvcnR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
    keyword: "travel passport laptop learning",
    reason:
      "Travel visuals fit language courses that emphasize real-world travel usage.",
  },
  dataAutomation: {
    baseUrl: "https://images.unsplash.com/photo-1753613648137-602c669cbe07",
    keyword: "data analysis laptop automation",
    reason:
      "A data-oriented digital workspace fits AI, data science, and automation topics.",
  },
  aiWorkflow: {
    baseUrl: "https://images.unsplash.com/photo-1770233621425-5d9ee7a0a700",
    keyword: "artificial intelligence chatbot automation",
    reason:
      "A clearly AI-themed visual suits ChatGPT, chatbots, and AI tool courses.",
  },
} as const;

const exactCourseImageSpecs: CourseImageSpec[] = [
  {
    key: "1",
    baseUrl: imageLibrary.learnerDesk.baseUrl,
    keyword: "math study focus",
    reason: imageLibrary.learnerDesk.reason,
    aliases: ["ปลดล็อกสกิลคณิต เข้าใจง่าย ไม่ปวดหัว"],
  },
  {
    key: "2",
    baseUrl: imageLibrary.codeLaptop.baseUrl,
    keyword: "advanced react frontend coding",
    reason: imageLibrary.codeLaptop.reason,
    aliases: ["อัปสกิล Frontend ด้วย Advanced React & Redux"],
  },
  {
    key: "3",
    baseUrl: imageLibrary.figmaWorkspace.baseUrl,
    keyword: "ui ux figma workspace",
    reason: imageLibrary.figmaWorkspace.reason,
    aliases: ["เจาะลึกการออกแบบ UI/UX สู่มืออาชีพ (สอนใช้ Figma)"],
  },
  {
    key: "4",
    baseUrl: imageLibrary.travelPassport.baseUrl,
    keyword: "english travel learning",
    reason: imageLibrary.travelPassport.reason,
    aliases: ["ภาษาอังกฤษเพื่อการเดินทางและท่องเที่ยว"],
  },
  {
    key: "5",
    baseUrl: imageLibrary.backendCode.baseUrl,
    keyword: "nodejs express backend api",
    reason: imageLibrary.backendCode.reason,
    aliases: ["Node.js & Express ตั้งแต่ศูนย์สู่ Production"],
  },
  {
    key: "6",
    baseUrl: imageLibrary.dataAutomation.baseUrl,
    keyword: "python ai data science machine learning",
    reason: imageLibrary.dataAutomation.reason,
    aliases: ["Python สำหรับ AI, Data Science และ Machine Learning"],
  },
  {
    key: "7",
    baseUrl: imageLibrary.designWorkshop.baseUrl,
    keyword: "graphic design creative workspace",
    reason: imageLibrary.designWorkshop.reason,
    aliases: ["Graphic Design ด้วย Adobe Illustrator"],
  },
  {
    key: "8",
    baseUrl: imageLibrary.learnerDesk.baseUrl,
    keyword: "japanese beginner study",
    reason: imageLibrary.learnerDesk.reason,
    aliases: ["ภาษาญี่ปุ่นสำหรับผู้เริ่มต้น N5-N4"],
  },
  {
    key: "9",
    baseUrl: imageLibrary.aiWorkflow.baseUrl,
    keyword: "chatgpt ai tools developer",
    reason: imageLibrary.aiWorkflow.reason,
    aliases: ["ChatGPT & AI Tools สำหรับนักพัฒนา"],
  },
  {
    key: "10",
    baseUrl: imageLibrary.aiWorkflow.baseUrl,
    keyword: "ai chatbot langchain openai api",
    reason: imageLibrary.aiWorkflow.reason,
    aliases: ["สร้าง AI Chatbot ด้วย LangChain และ OpenAI API"],
  },
];

const categoryFallbackBaseUrl: Record<string, string> = {
  คณิตศาสตร์: imageLibrary.learnerDesk.baseUrl,
  การพัฒนาซอฟต์แวร์: imageLibrary.codeLaptop.baseUrl,
  การออกแบบ: imageLibrary.figmaWorkspace.baseUrl,
  ภาษา: imageLibrary.learnerDesk.baseUrl,
  "AI & Data Science": imageLibrary.dataAutomation.baseUrl,
};

function buildUnsplashUrl(baseUrl: string) {
  if (baseUrl.includes("?")) {
    return baseUrl;
  }

  return `${baseUrl}?auto=format&fit=crop&w=800&h=600&q=80`;
}

function normalizeKey(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)+/g, "");
}

const exactImageIndex = new Map<string, CourseImageSpec>();

for (const spec of exactCourseImageSpecs) {
  for (const rawKey of [spec.key, ...(spec.aliases ?? [])]) {
    const normalizedKey = normalizeKey(rawKey);

    if (exactImageIndex.has(normalizedKey)) {
      throw new Error(`Duplicate mock course image key: ${normalizedKey}`);
    }

    exactImageIndex.set(normalizedKey, spec);
  }
}

export const courseImageMap = Object.freeze(
  Object.fromEntries(
    exactCourseImageSpecs.map((spec) => [
      spec.key,
      buildUnsplashUrl(spec.baseUrl),
    ]),
  ) as Record<string, string>,
);

export function getMockCourseImageUrl(input: CourseImageLookupInput) {
  const candidateKeys = [input.id, input.title]
    .filter((value): value is string => Boolean(value && value.trim()))
    .map((value) => normalizeKey(value));

  for (const candidateKey of candidateKeys) {
    const exactSpec = exactImageIndex.get(candidateKey);

    if (exactSpec) {
      return buildUnsplashUrl(exactSpec.baseUrl);
    }
  }

  const fallbackBaseUrl =
    categoryFallbackBaseUrl[input.category ?? ""] ??
    imageLibrary.learnerDesk.baseUrl;

  return buildUnsplashUrl(fallbackBaseUrl);
}
