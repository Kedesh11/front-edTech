'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types/user';

interface UseProtectedRouteOptions {
  allowedRoles?: Role[];
  redirectTo?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { allowedRoles, redirectTo = '/login' } = options;

  useEffect(() => {
    if (isLoading) return;

    // Si pas d'utilisateur connecté, rediriger vers la page de connexion
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Si des rôles sont spécifiés, vérifier que l'utilisateur a un rôle autorisé
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        router.push(redirectTo);
        return;
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  return {
    user,
    isLoading,
    isAuthorized: user && (!allowedRoles || allowedRoles.includes(user.role)),
  };
} 