import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div>
      <ProfileHeader />
      <div className='max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 p-8'>
        <div>
          <ProfileSidebar role={"USER"} />
        </div>
        <div className='lg:col-span-3'>{children}</div>
      </div>
    </div>
  );
}
