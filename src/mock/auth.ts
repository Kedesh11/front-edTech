import { mockStudent } from './student/data';
import { mockParent } from './parent/data';
import { mockTeacher } from './teacher/data';
import { mockAdmin } from './admin/data';
import { mockTechnician } from './technician/data';
import { User } from './types';

const mockUsers = [
  mockStudent,
  mockParent,
  mockTeacher,
  mockAdmin,
  mockTechnician
];

export const authenticateUser = (email: string, password: string): Omit<User, 'password'> | null => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) return null;
  
  // Ne pas renvoyer le mot de passe dans la réponse
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserRole = (email: string): string | null => {
  const user = mockUsers.find(u => u.email === email);
  return user ? user.role : null;
};
