import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ภาพรวมของฉัน",
};

export default function Page() {
  redirect("/profile/overview");
}
