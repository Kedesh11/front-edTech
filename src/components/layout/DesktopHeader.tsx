'use client';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface DesktopHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export function DesktopHeader({ user }: DesktopHeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="hidden lg:block bg-white border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Tableau de bord
          </h1>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-600 capitalize">
            {user.role}
          </span>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 01-6 6h.75a6 6 0 006 6h3a6 6 0 006-6v-.75a6 6 0 00-6-6h-.75z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User dropdown */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Logout button */}
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={logout}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
} 