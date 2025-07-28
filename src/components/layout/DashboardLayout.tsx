'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DesktopHeader } from './DesktopHeader';
import { getSidebarItems } from '@/lib/sidebar-config';
import { getIconForLabel } from '@/lib/icon-mapping';

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface SidebarItem {
  icon: ReactNode;
  label: string;
  href: string;
  badge?: number;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const sidebarItems = getSidebarItems(user.role).map(item => ({
    ...item,
    icon: getIconForLabel(item.label)
  }));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <Sidebar items={sidebarItems} user={user} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-72">
        {/* Desktop Header sticky */}
        <div className="sticky top-0 z-30">
          <DesktopHeader user={user} />
        </div>
        {/* Page Content scrollable */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 