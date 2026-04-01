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
    <div className='space-y-4 lg:sticky top-10'>
      <div className='border border-accent rounded-xl w-full'>
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

      {role === 'ADMIN' && (
        <div className='border border-accent rounded-xl p-4 space-y-2'>
          <p className='text-xl font-semibold'>Quick Actions</p>

          <Link
            href='/dashboard/pending-courses'
            className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'
          >
            อนุมัติคอร์ส
          </Link>

          <button className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'>
            จัดการผู้ใช้
          </button>

          <button className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'>
            ดู Analytics
          </button>
        </div>
      )}
    </div>
  );
}
