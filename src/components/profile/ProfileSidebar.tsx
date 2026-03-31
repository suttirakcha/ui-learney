'use client';

import { getMenusWithRole } from '@/lib/profile-menus';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProfileSidebarProps {
  role: 'USER' | 'ADMIN' | 'INSTRUCTOR';
}

export default function ProfileSidebar({ role }: ProfileSidebarProps) {
  const menus = getMenusWithRole(role);
  const pathname = usePathname();

  return (
    <div className='border border-accent rounded-xl lg:sticky top-10 w-full'>
      {menus.map((menu) => {
        const menuLink = `/profile${menu.href}`;
        return (
          <Link
            href={menuLink}
            key={menu.label}
            className={cn(
              'flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200',
              pathname === menuLink && 'bg-primary text-white'
            )}
          >
            {menu.icon}
            {menu.label}
          </Link>
        );
      })}
      <button className='flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200'>
        <LogOut />
        <p>Logout</p>
      </button>
    </div>
  );
}
