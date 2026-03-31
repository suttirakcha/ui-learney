"use client";

import { getMenusWithRole } from "@/lib/profile-menus";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function InstructorProfilePage() {
  const params = useParams();
  {
    /* TODO: Get the role from the user */
  }
  const menus = getMenusWithRole("ADMIN");

  const profileComponent = menus.find(
    (menu) => menu.href === `/${params.path}`,
  )?.component;

  return <Fragment>{profileComponent}</Fragment>;
}
