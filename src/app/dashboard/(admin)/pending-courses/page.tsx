import { redirect } from "next/navigation";

export default function LegacyPendingCoursesPage() {
  redirect("/admin/content-review-queue");
}
