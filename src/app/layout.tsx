import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/lib/AuthContext";
import MainContainer from "@/components/custom/MainContainer";
import { kanit } from "@/styles/font";
import ChatWidget from "@/components/ai-chat/ChatWidget";

export const metadata: Metadata = {
  title: {
    default: "Learney",
    template: "%s - Learney",
  },
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kanit.variable} h-full antialiased font-sans`}>
      <body className={`${kanit.className} min-h-full flex flex-col`}>
        <AuthProvider>
          <MainContainer>{children}</MainContainer>
          <ChatWidget />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
