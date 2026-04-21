import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/lib/AuthContext";
import MainContainer from "@/components/custom/MainContainer";
import { kanit } from "@/styles/font";
import { RouteMascotAssistant } from "@/components/ai-chat/RouteMascotAssistant";
import { cookies } from "next/headers";
import { PreferenceProvider } from "@/components/learney/providers/PreferenceProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  const locale =
    cookieStore.get("learney-locale")?.value === "en" ? "en" : "th";
  const theme =
    cookieStore.get("learney-theme")?.value === "dark" ? "dark" : "light";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${kanit.variable} h-full antialiased font-sans ${theme === "dark" ? "dark" : ""}`}
    >
      <body className={`${kanit.className} min-h-full flex flex-col`}>
        <ThemeProvider>
          <PreferenceProvider initialLocale={locale} initialTheme={theme}>
            <AuthProvider>
              <MainContainer>{children}</MainContainer>
              <RouteMascotAssistant />
              <Toaster position="top-center" />
            </AuthProvider>
          </PreferenceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
