import { User, Role, UserWithoutPassword } from '@/types/user';

export interface AuthService {
  authenticate(email: string, password: string): Promise<AuthResult>;
  logout(): void;
  getCurrentUser(): UserWithoutPassword | null;
  isAuthenticated(): boolean;
  hasRole(role: Role): boolean;
}

export interface AuthResult {
  success: boolean;
  user?: UserWithoutPassword;
  error?: string;
}

export interface AuthContextType {
  user: UserWithoutPassword | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  isLoading: boolean;
}

// Mock implementation - à remplacer par une vraie API
class MockAuthService implements AuthService {
  private currentUser: UserWithoutPassword | null = null;

  async authenticate(email: string, password: string): Promise<AuthResult> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUsers = await this.getMockUsers();
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        error: 'Email ou mot de passe incorrect'
      };
    }

    // Ne pas stocker le mot de passe en session
    const { password: _, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    
    // Stockage sécurisé (en production, utiliser des cookies httpOnly)
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    }

    return {
      success: true,
      user: userWithoutPassword
    };
  }

  logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }
  }

  getCurrentUser(): UserWithoutPassword | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: Role): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private async getMockUsers(): Promise<User[]> {
    const { mockStudent, mockParent, mockTeacher, mockAdmin, mockTechnician } = await import('@/data/mock-users');
    return [mockStudent, mockParent, mockTeacher, mockAdmin, mockTechnician];
  }
}

// Singleton pattern pour le service d'authentification
export const authService = new MockAuthService(); 