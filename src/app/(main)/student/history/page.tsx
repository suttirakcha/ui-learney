import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ประวัติเรียนของฉัน",
};

export default function PageHistory() {
  redirect("/profile/history");
}
