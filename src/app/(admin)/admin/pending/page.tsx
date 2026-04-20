import { redirect } from "next/navigation";

export default function LegacyAdminPendingPage() {
  redirect("/admin/content-review-queue");
}
