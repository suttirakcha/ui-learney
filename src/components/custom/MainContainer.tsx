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
        <main className="flex-1 pt-[124px] lg:pt-[72px]">{children}</main>
        {!isAdminPage ? <Footer /> : null}
      </div>
    </Fragment>
  );
}
