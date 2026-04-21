"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
  useState,
} from "react";

type Theme =
  | "songkran"
  | "new_year"
  | "valentine"
  | "pride"
  | "halloween"
  | "loy_krathong"
  | "christmas"
  | "back_to_school"
  | "exam_prep"
  | "ai_tech";

type ThemeInfo = {
  key: Theme;
  name: { th: string; en: string };
  month: number[]; // Thai months 0-11
  message: { th: string; en: string };
};

const themes: ThemeInfo[] = [
  {
    key: "songkran",
    name: { th: "สงกรานต์", en: "Songkran" },
    month: [3],
    message: {
      th: "ช่วงปิดเทอมนี้คุณควรเรียนอะไร",
      en: "What to learn this semester break",
    },
  },
  {
    key: "new_year",
    name: { th: "ปีใหม่", en: "New Year" },
    month: [0, 11],
    message: { th: "เป้าหมายปีใหม่ของคุณ", en: "Your new year goals" },
  },
  {
    key: "valentine",
    name: { th: "วาเลนไทน์", en: "Valentine" },
    month: [1],
    message: { th: "ภาษารักในการเรียนรู้", en: "Love language for learning" },
  },
  {
    key: "pride",
    name: { th: "Pride", en: "Pride" },
    month: [5],
    message: { th: "จุดแข็งและตัวตนของคุณ", en: "Your strengths and identity" },
  },
  {
    key: "halloween",
    name: { th: "ฮาโลวีน", en: "Halloween" },
    month: [10],
    message: { th: "ด้านลับของบุคลิกคุณ", en: "Your hidden personality side" },
  },
  {
    key: "loy_krathong",
    name: { th: "ลอยกระทง", en: "Loy Krathong" },
    month: [10],
    message: {
      th: "สิ่งที่ควรปล่อยวางและเริ่มใหม่",
      en: "What to let go and start anew",
    },
  },
  {
    key: "christmas",
    name: { th: "คริสต์มาส", en: "Christmas" },
    month: [11],
    message: {
      th: "ของขวัญการเรียนรู้สำหรับคุณ",
      en: "Learning gifts for you",
    },
  },
  {
    key: "back_to_school",
    name: { th: "เปิดเทอม", en: "Back to School" },
    month: [8],
    message: { th: "เริ่มเรียนตรงไหนดี", en: "Where to start learning" },
  },
  {
    key: "exam_prep",
    name: { th: "เตรียมสอบ", en: "Exam Prep" },
    month: [2, 5],
    message: { th: "จุดอ่อนในการสอบของคุณ", en: "Your exam weak points" },
  },
  {
    key: "ai_tech",
    name: { th: "AI Tech", en: "AI Tech" },
    month: [],
    message: { th: "ทักษะสายเทคของคุณ", en: "Your tech skills" },
  },
];

const ThemeContext = createContext<{
  theme: Theme;
  aiMessage: string;
  setTheme: (theme: Theme) => void;
} | null>(null);

function resolveAutoTheme() {
  const now = new Date();
  const month = now.getMonth();
  const thaiYearMonth = (month + 3) % 12;
  const matched = themes.find(
    (candidate) =>
      candidate.month.includes(thaiYearMonth) ||
      candidate.month.includes(month),
  );

  return {
    theme: matched?.key ?? "back_to_school",
    aiMessage: matched
      ? `AI เลือกธีม ${matched.name.th}: ${matched.message.th}`
      : "AI เลือกธีม Back to School",
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const autoTheme = useMemo(() => resolveAutoTheme(), []);
  const [theme, setThemeState] = useState<Theme>(autoTheme.theme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    Array.from(root.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => root.classList.remove(className));

    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, aiMessage: autoTheme.aiMessage, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
