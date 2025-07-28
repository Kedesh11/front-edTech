import { User, Student, Parent, Teacher, Admin, Technician } from '@/types/user';

export const mockStudent: Student & User = {
  id: 'student-1',
  email: 'eleve@gmail.com',
  password: 'eleve1234',
  role: 'student',
  firstName: 'Marie',
  lastName: 'Dubois',
  createdAt: '2024-01-15T10:00:00Z',
  lastLogin: '2024-01-20T14:30:00Z',
  isActive: true,
  grade: 'Terminale',
  class: 'TS1',
  parentId: 'parent-1',
  subjects: ['Mathématiques', 'Physique', 'SVT', 'Français', 'Histoire'],
  averageGrade: 15.5,
};

export const mockParent: Parent & User = {
  id: 'parent-1',
  email: 'parent@gmail.com',
  password: 'parent1234',
  role: 'parent',
  firstName: 'Jean',
  lastName: 'Dubois',
  createdAt: '2024-01-15T10:00:00Z',
  lastLogin: '2024-01-20T16:45:00Z',
  isActive: true,
  studentIds: ['student-1'],
  phoneNumber: '+33 6 12 34 56 78',
};

export const mockTeacher: Teacher & User = {
  id: 'teacher-1',
  email: 'enseignant@gmail.com',
  password: 'enseignant1234',
  role: 'teacher',
  firstName: 'Sophie',
  lastName: 'Martin',
  createdAt: '2024-01-10T09:00:00Z',
  lastLogin: '2024-01-20T08:15:00Z',
  isActive: true,
  subjects: ['Mathématiques', 'Physique'],
  classIds: ['TS1', 'TS2', '1S1'],
  department: 'Sciences',
  qualifications: ['CAPES Mathématiques', 'Master Didactique'],
};

export const mockAdmin: Admin & User = {
  id: 'admin-1',
  email: 'admin@gmail.com',
  password: 'admin1234',
  role: 'admin',
  firstName: 'Pierre',
  lastName: 'Durand',
  createdAt: '2024-01-01T08:00:00Z',
  lastLogin: '2024-01-20T17:30:00Z',
  isActive: true,
  department: 'Direction',
  permissions: [
    'user:read',
    'user:write',
    'user:delete',
    'class:read',
    'class:write',
    'class:delete',
    'grade:read',
    'grade:write',
    'system:admin',
    'reports:read',
    'reports:write'
  ],
  accessLevel: 'super',
};

export const mockTechnician: Technician & User = {
  id: 'technician-1',
  email: 'technicien@gmail.com',
  password: 'technicien1234',
  role: 'technician',
  firstName: 'Lucas',
  lastName: 'Bernard',
  createdAt: '2024-01-05T11:00:00Z',
  lastLogin: '2024-01-20T15:20:00Z',
  isActive: true,
  specialization: 'Informatique et réseaux',
  certifications: ['CISCO CCNA', 'CompTIA A+', 'Microsoft MCSA'],
  assignedEquipment: ['lab-info-1', 'lab-info-2', 'serveur-principal'],
};

// Export de tous les utilisateurs mock
export const mockUsers = [
  mockStudent,
  mockParent,
  mockTeacher,
  mockAdmin,
  mockTechnician,
] as const;

// Fonctions utilitaires pour les données mock
export const getMockUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email === email);
};

export const getMockUserById = (id: string) => {
  return mockUsers.find(user => user.id === id);
};

export const getMockUsersByRole = <T extends User['role']>(role: T) => {
  return mockUsers.filter(user => user.role === role);
}; 