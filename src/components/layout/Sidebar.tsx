'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  items: SidebarItem[];
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export function Sidebar({ items, user }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo sticky */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white sticky top-0 z-20">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">e</span>
          </div>
          <span className="text-xl font-bold text-gray-900">edTech</span>
        </Link>
      </div>
      {/* Navigation scrollable */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Navigation
          </h3>
        </div>
        
        {items.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
              }`}
            >
              <span className="mr-4 flex-shrink-0 w-5 h-5">
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      {/* Footer sticky (user info + logout) */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white sticky bottom-0 z-20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-sm font-bold text-white">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user.role}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-red-200 hover:border-red-300"
          onClick={logout}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
} 