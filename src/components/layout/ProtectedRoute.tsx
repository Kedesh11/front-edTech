'use client';

import { ReactNode } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Role } from '@/types/user';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
  redirectTo?: string;
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = '/login',
  fallback 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized } = useProtectedRoute({
    allowedRoles,
    redirectTo,
  });

  // Affichage du fallback pendant le chargement
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas autorisé, ne rien afficher (la redirection est gérée par le hook)
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
} 