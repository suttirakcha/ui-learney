import ProfileSidebar from "@/components/profile/ProfileSidebar";
import StudentCourseCard from "@/components/student/StudentCourseCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ภาพรวมของฉัน",
};

export default function page() {
  return (
    <div className="">
      <ProfileSidebar role="USER" />
      <StudentCourseCard />
    </div>
  );
}
