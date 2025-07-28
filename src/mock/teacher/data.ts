import { Teacher } from '../types';

export const mockTeacher: Teacher = {
  id: '3',
  email: 'enseignant@gmail.com',
  password: 'enseignant1234',
  role: 'teacher',
  firstName: 'Pierre',
  lastName: 'Martin',
  createdAt: '2025-01-01T00:00:00.000Z',
  lastLogin: '2025-07-26T07:45:00.000Z',
  subjects: ['Mathématiques', 'Physique'],
  classIds: ['1A', '1B', '2A']
};
