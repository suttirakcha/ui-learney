import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/lib/api/assessment.controller.ts",
    "src/lib/api/admin-chatbot.ts",
    "src/lib/api/apiClient.ts",
    "src/lib/api/career-assessment.ts",
    "src/lib/api/chatbot.ts",
    "src/lib/api/page.tsx",
    "src/lib/api/submit-attempt.dto.ts",
    "src/lib/api/tests.ts",
    "src/lib/api/useAuthStore.ts",
    "src/lib/api/useChatbotStore.ts",
    "src/lib/api/ChatMessage.tsx",
    "src/lib/api/ChatWidget.tsx",
    "src/lib/api/ChatWindow.tsx",
    "src/lib/api/ComparisonChart.tsx",
  ]),
]);

export default eslintConfig;
