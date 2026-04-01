import { getMenusWithRole } from '@/lib/profile-menus';
import { Role } from '@/types/user';
import { redirect } from 'next/navigation';

const USER_ROLE: Role = 'ADMIN';

export default function ProfilePage() {
  const menus = getMenusWithRole(USER_ROLE);
  return redirect(`/profile/${menus[0].href}`);
}
