export type Role = 'student' | 'parent' | 'teacher' | 'admin' | 'technician';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastLogin: string;
}

export interface Student extends User {
  role: 'student';
  grade: string;
  class: string;
  parentId: string;
}

export interface Parent extends User {
  role: 'parent';
  studentIds: string[];
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  classIds: string[];
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export interface Technician extends User {
  role: 'technician';
  specialization: string;
  certifications: string[];
}
