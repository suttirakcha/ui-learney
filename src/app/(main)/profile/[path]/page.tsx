import ProfileSection from "@/components/profile/ProfileSection";
import type { Metadata } from "next";

const PROFILE_PAGE_LABELS: Record<string, string> = {
  overview: "ภาพรวม",
  settings: "การตั้งค่า",
  history: "ประวัติคอร์สเรียน",
};

interface InstructorProfilePageProps {
  params: Promise<{ path: string }>;
}

export async function generateMetadata({
  params,
}: InstructorProfilePageProps): Promise<Metadata> {
  const { path } = await params;
  const profileLabel = PROFILE_PAGE_LABELS[path];

  return {
    title: profileLabel ? `โปรไฟล์ - ${profileLabel}` : "โปรไฟล์",
  };
}

export default async function InstructorProfilePage({
  params,
}: InstructorProfilePageProps) {
  const { path } = await params;

  return <ProfileSection path={path} />;
}
