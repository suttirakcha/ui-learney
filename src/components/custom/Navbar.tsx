'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LearneyLogo from './LearneyLogo';

import {
  BookOpen,
  Newspaper,
  LayoutGrid,
  Search,
  Globe,
  Check,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import SearchDialog from '../dialogs/SearchDialog';

export default function Navbar() {
  const [lang, setLang] = useState('ไทย');
  const { user, logout } = useAuth();

  return (
    <nav className='flex items-center justify-between px-8 border-b bg-white fixed inset-x-0 z-99 h-18'>
      {/* Logo */}
      <LearneyLogo />

      {/* Menu */}
      <div className='flex items-center gap-6 text-sm'>
        <Link
          href='/course'
          className='flex items-center gap-1 hover:text-cyan-600'
        >
          <BookOpen className='w-4 h-4' />
          คอร์สเรียน
        </Link>

        <Link
          href='/blog'
          className='flex items-center gap-1 hover:text-cyan-600'
        >
          <Newspaper className='w-4 h-4' />
          บทความ
        </Link>

        <Link
          href='/categories'
          className='flex items-center gap-1 hover:text-cyan-600'
        >
          <LayoutGrid className='w-4 h-4' />
          หมวดหมู่
        </Link>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4'>
        {/* Search */}
        <SearchDialog />
        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center gap-1 text-sm hover:text-cyan-600'>
              <Globe className='w-4 h-4' />
              {lang}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setLang('ไทย')}>
              ไทย {lang === 'ไทย' && <Check className='w-4 h-4 ml-2' />}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setLang('EN')}>
              EN {lang === 'EN' && <Check className='w-4 h-4 ml-2' />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ✅ Auth */}
        {!user ? (
          <>
            <Link href='/login'>
              <Button variant='ghost'>Sign in</Button>
            </Link>

            <Link href='/register'>
              <Button className='bg-cyan-500 hover:bg-cyan-600'>Sign up</Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex items-center gap-2 text-sm hover:text-cyan-600'>
                {/* Avatar */}
                <div className='w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-semibold'>
                  {user.name?.charAt(0)}
                </div>

                {/* Name */}
                {user.name}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-52'>
              <DropdownMenuItem asChild>
                <Link href='/profile'>👤 โปรไฟล์</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href='/dashboard'>📊 Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href='/my-courses'>🎓 คอร์สของฉัน</Link>
              </DropdownMenuItem>

              <div className='border-t my-2' />

              <DropdownMenuItem
                onClick={logout}
                className='text-red-500 cursor-pointer'
              >
                🚪 ออกจากระบบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
