'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
  onMenuClick?: () => void;
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">edTech</span>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMenuClick}
          className="lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && !onMenuClick && (
        <div className="border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 