'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserWithoutPassword } from '@/types/user';
import { AuthContextType, AuthResult, authService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'utilisateur connecté au chargement
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authService.authenticate(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook personnalisé pour vérifier les permissions
export function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = (permission: string): boolean => {
    if (!user || user.role !== 'admin') return false;
    
    // Vérifier si l'utilisateur a la propriété permissions (Admin)
    const adminUser = user as UserWithoutPassword & { permissions?: string[] };
    return adminUser.permissions?.includes(permission) || false;
  };

  const hasRole = (role: User['role']): boolean => {
    return user?.role === role;
  };

  return {
    hasPermission,
    hasRole,
    user,
  };
} 