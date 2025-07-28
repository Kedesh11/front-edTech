'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-blue-600">edTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about"
              className={`${
                isActive('/about')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              À propos
            </Link>
            <Link 
              href="/features"
              className={`${
                isActive('/features')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              Fonctionnalités
            </Link>
            <Link 
              href="/pricing"
              className={`${
                isActive('/pricing')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              Tarifs
            </Link>
            <Link 
              href="/contact"
              className={`${
                isActive('/contact')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connexion
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/about"
                className={`${
                  isActive('/about')
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                } block px-4 py-2 rounded-lg hover:bg-gray-100`}
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/features"
                className={`${
                  isActive('/features')
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                } block px-4 py-2 rounded-lg hover:bg-gray-100`}
                onClick={() => setIsOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="/pricing"
                className={`${
                  isActive('/pricing')
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                } block px-4 py-2 rounded-lg hover:bg-gray-100`}
                onClick={() => setIsOpen(false)}
              >
                Tarifs
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive('/contact')
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                } block px-4 py-2 rounded-lg hover:bg-gray-100`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
