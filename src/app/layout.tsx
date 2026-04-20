import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/lib/AuthContext";
import MainContainer from "@/components/custom/MainContainer";
import { kanit } from "@/styles/font";
import ChatWidget from "@/components/ai-chat/ChatWidget";
import { cookies } from "next/headers";
import { PreferenceProvider } from "@/components/learney/providers/PreferenceProvider";

export const metadata: Metadata = {
  title: {
    default: "Learney",
    template: "%s - Learney",
  },
  description: "...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("learney-locale")?.value === "en" ? "en" : "th";
  const theme = cookieStore.get("learney-theme")?.value === "dark" ? "dark" : "light";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${kanit.variable} h-full antialiased font-sans ${theme === "dark" ? "dark" : ""}`}
    >
      <body className={`${kanit.className} min-h-full flex flex-col`}>
        <PreferenceProvider initialLocale={locale} initialTheme={theme}>
          <AuthProvider>
            <MainContainer>{children}</MainContainer>
            <ChatWidget />
            <Toaster position="top-center" />
          </AuthProvider>
        </PreferenceProvider>
      </body>
    </html>
  );
}
