export type Role = 'student' | 'parent' | 'teacher' | 'admin' | 'technician';

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

export interface User extends BaseUser {
  role: Role;
  password: string; // À retirer en production, utiliser des tokens JWT
}

export interface Student extends BaseUser {
  role: 'student';
  grade: string;
  class: string;
  parentId: string;
  subjects: string[];
  averageGrade: number;
}

export interface Parent extends BaseUser {
  role: 'parent';
  studentIds: string[];
  phoneNumber: string;
}

export interface Teacher extends BaseUser {
  role: 'teacher';
  subjects: string[];
  classIds: string[];
  department: string;
  qualifications: string[];
}

export interface Admin extends BaseUser {
  role: 'admin';
  department: string;
  permissions: Permission[];
  accessLevel: 'super' | 'standard';
}

export interface Technician extends BaseUser {
  role: 'technician';
  specialization: string;
  certifications: string[];
  assignedEquipment: string[];
}

export type Permission = 
  | 'user:read'
  | 'user:write'
  | 'user:delete'
  | 'class:read'
  | 'class:write'
  | 'class:delete'
  | 'grade:read'
  | 'grade:write'
  | 'system:admin'
  | 'reports:read'
  | 'reports:write';

// Types utilitaires
export type UserWithoutPassword = Omit<User, 'password'>;
export type StudentWithoutPassword = Omit<Student, 'password'>;
export type ParentWithoutPassword = Omit<Parent, 'password'>;
export type TeacherWithoutPassword = Omit<Teacher, 'password'>;
export type AdminWithoutPassword = Omit<Admin, 'password'>;
export type TechnicianWithoutPassword = Omit<Technician, 'password'>;

// Type guard functions
export const isStudent = (user: User): user is Student & User => user.role === 'student';
export const isParent = (user: User): user is Parent & User => user.role === 'parent';
export const isTeacher = (user: User): user is Teacher & User => user.role === 'teacher';
export const isAdmin = (user: User): user is Admin & User => user.role === 'admin';
export const isTechnician = (user: User): user is Technician & User => user.role === 'technician';

// Helper functions
export const getUserDisplayName = (user: BaseUser): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const getUserInitials = (user: BaseUser): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}; 