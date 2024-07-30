'use client';

import { Logo } from '@/components/logo';
import SearchComponent from '@/components/search/search';
import { Menubar } from '@/components/menu-bar';
import ActionMenu from '@/components/action-menu';
import { Suspense } from 'react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-14 border-b px-6 shadow-sm dark:bg-slate-700 bg-white flex items-center z-50">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          <Menubar />
        </div>
        <Suspense fallback={null}>
          <SearchComponent />
        </Suspense>
        <ActionMenu />
      </div>
    </nav>
  );
};
