import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/lib/AuthContext";
import { CartProvider } from "@/app/lib/CartContext";
import MainContainer from "@/components/custom/MainContainer";
import { kanit } from "@/styles/font";

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
          <CartProvider>
            <MainContainer>{children}</MainContainer>
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
