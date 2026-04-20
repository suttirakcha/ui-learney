"use client";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <Fragment>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mt-18 flex-1">{children}</main>
        {!isAdminPage ? <Footer /> : null}
      </div>
    </Fragment>
  );
}
