export type MascotLocale = "th" | "en";
export type MascotMode =
  | "welcome"
  | "recommend"
  | "quiz"
  | "success"
  | "error"
  | "assistant";
export type MascotPosition = "bottom-right" | "bottom-left";
export type MascotSize = "sm" | "md" | "lg";

type LocalizedText = {
  th: string;
  en: string;
};

export type MascotAction = {
  kind: "link" | "prompt";
  href?: string;
  prompt?: string;
  style: "default" | "outline" | "ghost";
  label: LocalizedText;
};

type MascotModeConfig = {
  badge: LocalizedText;
  defaultMessage: LocalizedText;
  description: LocalizedText;
  emptyState: LocalizedText;
  promptHints: LocalizedText[];
  actions: MascotAction[];
  icon: "sparkles" | "book" | "brain" | "success" | "alert" | "bot";
};

export const MASCOT_NAME = "Crossy";

const modeConfigs: Record<MascotMode, MascotModeConfig> = {
  welcome: {
    badge: { th: "Welcome", en: "Welcome" },
    defaultMessage: {
      th: "สวัสดี~ วันนี้อยากเรียนอะไรดี?",
      en: "Hi there. What do you want to learn today?",
    },
    description: {
      th: "ฉันช่วยพาเริ่มต้น เลือกคอร์ส และชวนเรียนแบบไม่กดดันได้เสมอ",
      en: "I can help you get started, choose a course, and keep learning fun.",
    },
    emptyState: {
      th: "ลองบอกเป้าหมายสั้น ๆ เช่น อยากเก่ง AI, ภาษา, หรือคณิตศาสตร์",
      en: "Tell me your goal, like AI, languages, or math.",
    },
    promptHints: [
      { th: "ช่วยแนะนำคอร์สให้หน่อย", en: "Recommend a course for me" },
      { th: "ถ้าพึ่งเริ่มควรเรียนอะไร", en: "What should beginners start with?" },
      { th: "อยากได้แผนเรียน 7 วัน", en: "Give me a 7-day learning plan" },
    ],
    actions: [
      {
        kind: "link",
        href: "/courses",
        style: "default",
        label: { th: "ดูคอร์สทั้งหมด", en: "Browse courses" },
      },
      {
        kind: "link",
        href: "/skill-test",
        style: "outline",
        label: { th: "ทำ Skill Test", en: "Take a skill test" },
      },
    ],
    icon: "sparkles",
  },
  recommend: {
    badge: { th: "Recommending Course", en: "Recommending Course" },
    defaultMessage: {
      th: "ฉันคิดว่าคอร์สนี้เหมาะกับคุณนะ!",
      en: "I think this course fits you well.",
    },
    description: {
      th: "ถ้าอยากเทียบหลายคอร์สหรือหาเส้นทางต่อ ฉันช่วยจัดลำดับให้ได้",
      en: "I can compare options and suggest what to take next.",
    },
    emptyState: {
      th: "ถามฉันได้เลยว่าคอร์สนี้เหมาะกับพื้นฐานแบบไหน",
      en: "Ask me who this course is best for.",
    },
    promptHints: [
      { th: "คอร์สนี้เหมาะกับใครบ้าง", en: "Who is this course for?" },
      { th: "ควรเรียนต่อจากคอร์สนี้อะไรดี", en: "What should I learn after this?" },
      { th: "ช่วยเทียบคอร์สกับเป้าหมายของฉัน", en: "Compare this course with my goal" },
    ],
    actions: [
      {
        kind: "link",
        href: "/recommendations",
        style: "default",
        label: { th: "ดูคอร์สแนะนำ", en: "View recommendations" },
      },
      {
        kind: "prompt",
        prompt: "ช่วยสรุปว่าคอร์สนี้เด่นตรงไหน",
        style: "outline",
        label: { th: "สรุปจุดเด่นคอร์ส", en: "Summarize this course" },
      },
    ],
    icon: "book",
  },
  quiz: {
    badge: { th: "Quiz / Skill Test", en: "Quiz / Skill Test" },
    defaultMessage: {
      th: "ลองทำดูนะ ฉันเชื่อว่าคุณทำได้!",
      en: "Give it a try. I believe you can do it.",
    },
    description: {
      th: "ถ้าสับสนระหว่างข้อ ฉันช่วยอธิบายวิธีคิดแบบทีละขั้นได้",
      en: "If you get stuck, I can break the thinking process into small steps.",
    },
    emptyState: {
      th: "ส่งคำถามมาได้เลย ถ้าอยากให้ช่วยตีความโจทย์หรือแนะแนวการตอบ",
      en: "Ask me if you want help understanding the question.",
    },
    promptHints: [
      { th: "ช่วยอธิบายโจทย์แบบง่าย ๆ", en: "Explain the question simply" },
      { th: "ถ้าทำไม่ทันควรวางแผนยังไง", en: "How should I manage my time?" },
      { th: "ช่วยทบทวนก่อนเริ่มทำ", en: "Help me review before I start" },
    ],
    actions: [
      {
        kind: "link",
        href: "/skill-test",
        style: "default",
        label: { th: "เริ่มแบบทดสอบ", en: "Start the test" },
      },
      {
        kind: "prompt",
        prompt: "ช่วยให้กำลังใจก่อนทำแบบทดสอบหน่อย",
        style: "outline",
        label: { th: "ขอกำลังใจ", en: "Encourage me" },
      },
    ],
    icon: "brain",
  },
  success: {
    badge: { th: "Success", en: "Success" },
    defaultMessage: {
      th: "เก่งมาก! คุณพัฒนาไปอีกขั้นแล้ว!",
      en: "Great job. You just leveled up.",
    },
    description: {
      th: "ฉันช่วยสรุปความคืบหน้าและแนะนำก้าวต่อไปให้คุณได้ทันที",
      en: "I can summarize your progress and suggest the next step.",
    },
    emptyState: {
      th: "อยากรู้ว่าควรเรียนต่อยังไงหรือทบทวนอะไรเพิ่ม ถามฉันได้เลย",
      en: "Ask me what to review or learn next.",
    },
    promptHints: [
      { th: "ช่วยสรุปความคืบหน้าของฉัน", en: "Summarize my progress" },
      { th: "แนะนำก้าวต่อไปให้หน่อย", en: "Suggest the next step" },
      { th: "อยากได้เป้าหมายสั้น ๆ สำหรับสัปดาห์นี้", en: "Set a short goal for this week" },
    ],
    actions: [
      {
        kind: "link",
        href: "/dashboard",
        style: "default",
        label: { th: "ดูแดชบอร์ด", en: "Open dashboard" },
      },
      {
        kind: "link",
        href: "/courses",
        style: "outline",
        label: { th: "เรียนต่อ", en: "Keep learning" },
      },
    ],
    icon: "success",
  },
  error: {
    badge: { th: "Error / Empty State", en: "Error / Empty State" },
    defaultMessage: {
      th: "อุ๊ปส์ ยังไม่มีข้อมูล ลองใหม่อีกครั้งนะ",
      en: "Oops, there is no data yet. Please try again.",
    },
    description: {
      th: "ฉันยังช่วยหาเส้นทางต่อหรือเสนอสิ่งที่ควรลองใหม่ให้ได้อยู่",
      en: "I can still help you decide what to try next.",
    },
    emptyState: {
      th: "ถ้าไม่แน่ใจว่าจะทำอะไรต่อ ลองบอกสิ่งที่อยากได้ ฉันจะช่วยไล่ให้ทีละข้อ",
      en: "Tell me what you need and I will help step by step.",
    },
    promptHints: [
      { th: "ช่วยบอกว่าควรลองใหม่ยังไง", en: "How should I retry this?" },
      { th: "ถ้าไม่มีข้อมูลควรเริ่มจากอะไร", en: "Where should I start if there is no data?" },
      { th: "ช่วยสรุปสิ่งที่ควรเช็ก", en: "Summarize what I should check" },
    ],
    actions: [
      {
        kind: "prompt",
        prompt: "ช่วยแนะนำขั้นตอนตรวจสอบเบื้องต้นหน่อย",
        style: "default",
        label: { th: "แนะนำวิธีเช็ก", en: "Suggest checks" },
      },
      {
        kind: "link",
        href: "/courses",
        style: "ghost",
        label: { th: "กลับไปดูคอร์ส", en: "Back to courses" },
      },
    ],
    icon: "alert",
  },
  assistant: {
    badge: { th: "AI Assistant Mode", en: "AI Assistant Mode" },
    defaultMessage: {
      th: "ถามฉันได้ทุกเรื่องเกี่ยวกับการเรียนเลย!",
      en: "Ask me anything about learning.",
    },
    description: {
      th: "ฉันช่วยอธิบายบทเรียน วางแผนเรียน และตอบคำถามสั้น ๆ แบบเพื่อนคู่เรียนได้",
      en: "I can explain lessons, build study plans, and answer learning questions.",
    },
    emptyState: {
      th: "เริ่มจากคำถามสั้น ๆ ก็ได้ เช่น วันนี้ควรเรียนอะไร หรือช่วยอธิบายหัวข้อนี้หน่อย",
      en: "Start with a simple question, like what to learn today.",
    },
    promptHints: [
      { th: "ช่วยวางแผนเรียนให้หน่อย", en: "Help me build a study plan" },
      { th: "อธิบายหัวข้อยากให้เข้าใจง่าย", en: "Explain a hard topic simply" },
      { th: "ช่วยเลือกคอร์สจากเป้าหมายของฉัน", en: "Choose a course based on my goal" },
    ],
    actions: [
      {
        kind: "link",
        href: "/recommendations",
        style: "outline",
        label: { th: "ไปหน้าแนะนำคอร์ส", en: "Open recommendations" },
      },
      {
        kind: "prompt",
        prompt: "ช่วยแนะนำคอร์สที่เหมาะกับฉันหน่อย",
        style: "default",
        label: { th: "เริ่มถาม AI", en: "Start with AI" },
      },
    ],
    icon: "bot",
  },
};

function localize(text: LocalizedText, locale: MascotLocale) {
  return locale === "en" ? text.en : text.th;
}

export function getMascotModeConfig(mode: MascotMode) {
  return modeConfigs[mode];
}

export function getMascotMessage(mode: MascotMode, locale: MascotLocale) {
  return localize(modeConfigs[mode].defaultMessage, locale);
}

export function getMascotDescription(mode: MascotMode, locale: MascotLocale) {
  return localize(modeConfigs[mode].description, locale);
}

export function getMascotBadge(mode: MascotMode, locale: MascotLocale) {
  return localize(modeConfigs[mode].badge, locale);
}

export function getMascotEmptyState(mode: MascotMode, locale: MascotLocale) {
  return localize(modeConfigs[mode].emptyState, locale);
}

export function getMascotPromptHints(mode: MascotMode, locale: MascotLocale) {
  return modeConfigs[mode].promptHints.map((hint) => localize(hint, locale));
}

export function getMascotActions(mode: MascotMode, locale: MascotLocale) {
  return modeConfigs[mode].actions.map((action) => ({
    ...action,
    label: localize(action.label, locale),
  }));
}

export function resolveMascotMode(pathname: string) {
  if (
    pathname === "/payment/success" ||
    pathname.startsWith("/skill-test/result") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/profile")
  ) {
    return "success";
  }

  if (pathname.startsWith("/skill-test") || pathname.includes("/quiz")) {
    return "quiz";
  }

  if (
    pathname.startsWith("/recommendations") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/course")
  ) {
    return "recommend";
  }

  if (pathname === "/") {
    return "welcome";
  }

  if (pathname.startsWith("/notifications")) {
    return "error";
  }

  return "assistant";
}

export function shouldHideMascot(pathname: string) {
  return [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/admin",
    "/instructor",
  ].some((prefix) => pathname.startsWith(prefix));
}

export function createMascotSystemPrompt(mode: MascotMode) {
  return `คุณคือ ${MASCOT_NAME} มาสคอต AI ประจำเว็บไซต์ Learney

บทบาท:
- ต้อนรับผู้ใช้
- แนะนำคอร์สและแนวทางการเรียน
- อธิบายสิ่งที่ยากให้เข้าใจง่าย
- ให้กำลังใจแบบอบอุ่น เป็นมิตร เหมือนเพื่อนคู่เรียน

บุคลิก:
- สดใส ฉลาด ใจดี
- พูดกระชับ ไม่เกิน 1-2 ประโยคต่อคำตอบถ้าไม่จำเป็น
- ใช้ภาษาไทยเป็นหลัก
- ถ้าผู้ใช้สับสน ให้แบ่งเป็นขั้นสั้น ๆ
- ถ้าข้อมูลในระบบไม่พอ ให้บอกตรง ๆ แล้วเสนอทางเลือกถัดไป

สถานะปัจจุบันของคุณคือ: ${mode}

หลีกเลี่ยง:
- คำตอบยาวเกินไป
- น้ำเสียงแข็งหรือหุ่นยนต์เกินไป
- การแต่งข้อมูลที่ไม่รู้จริง`;
}

export function buildMascotFallbackReply(
  input: string,
  mode: MascotMode,
  locale: MascotLocale,
) {
  const normalized = input.toLowerCase();

  if (/คอร์ส|course|แนะนำ|recommend/.test(normalized)) {
    return locale === "en"
      ? "Start with the course that matches your current level, then build momentum with one small lesson today."
      : "เริ่มจากคอร์สที่ตรงกับพื้นฐานของคุณก่อน แล้วค่อยต่อยอดทีละบท ฉันช่วยเลือกให้ละเอียดขึ้นได้ถ้าบอกเป้าหมายมาอีกนิด";
  }

  if (/quiz|แบบทดสอบ|skill test|assessment|โจทย์/.test(normalized)) {
    return locale === "en"
      ? "Try answering with what feels closest first, and I can help you reason through the tricky parts."
      : "ลองตอบจากสิ่งที่ใกล้กับตัวคุณที่สุดก่อนนะ ถ้าติดข้อไหนบอกฉันได้ ฉันจะช่วยไล่วิธีคิดให้ทีละขั้น";
  }

  if (/dashboard|progress|พัฒนา|ความคืบหน้า/.test(normalized)) {
    return locale === "en"
      ? "Your progress becomes clearer when you review one strength and one next step at a time."
      : "ความคืบหน้าจะชัดขึ้นมากถ้าเราดูทีละอย่างว่าอะไรคือจุดแข็ง และอะไรคือก้าวถัดไป ฉันช่วยสรุปให้ได้เลย";
  }

  if (/อธิบาย|explain|สรุป|summary|ช่วย/.test(normalized)) {
    return locale === "en"
      ? "I can explain it in simpler words. Send the topic or question and I will break it down."
      : "ฉันช่วยอธิบายให้เข้าใจง่ายขึ้นได้เลย ส่งหัวข้อหรือคำถามมา แล้วเราค่อยแกะไปทีละส่วน";
  }

  return mode === "error"
    ? locale === "en"
      ? "There is not enough data yet, but we can still decide the next step together."
      : "ตอนนี้ข้อมูลยังไม่ครบ แต่เรายังเลือกก้าวถัดไปด้วยกันได้ ลองบอกสิ่งที่อยากทำต่อมาได้เลย"
    : getMascotMessage(mode, locale);
}
