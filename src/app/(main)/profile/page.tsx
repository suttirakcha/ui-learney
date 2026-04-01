import { getMenusWithRole } from '@/lib/profile-menus';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const menus = getMenusWithRole('ADMIN');
  return redirect(`/profile/${menus[0].href}`);
}
