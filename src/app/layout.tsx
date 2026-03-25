import type { Metadata } from "next";
import "@/styles/globals.css";
import { kanit } from "@/styles/font";

export const metadata: Metadata = {
  title: {
    default: "Learney",
    template: "%s - Learney"
  },
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} antialiased`}
      >
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
