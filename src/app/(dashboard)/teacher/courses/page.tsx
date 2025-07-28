'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Form } from '@/components/shared/forms/Form';
import { FormField } from '@/components/shared/forms/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Course {
  id: string;
  title: string;
  subject: string;
  class: string;
  schedule: string;
  room: string;
  studentsCount: number;
  description: string;
  nextLesson: string;
  progress: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Mathématiques - 1ère A',
    subject: 'Mathématiques',
    class: '1ère A',
    schedule: 'Lundi et Mercredi, 9h-11h',
    room: 'Salle 201',
    studentsCount: 32,
    description: 'Cours de mathématiques avancées couvrant l\'algèbre et l\'analyse',
    nextLesson: '2025-07-29T09:00:00',
    progress: 65,
  },
  {
    id: '2',
    title: 'Physique - Terminale B',
    subject: 'Physique',
    class: 'Terminale B',
    schedule: 'Mardi et Jeudi, 14h-16h',
    room: 'Laboratoire 102',
    studentsCount: 28,
    description: 'Introduction à la physique quantique et à la mécanique ondulatoire',
    nextLesson: '2025-07-28T14:00:00',
    progress: 45,
  },
  {
    id: '3',
    title: 'Mathématiques - 2nde C',
    subject: 'Mathématiques',
    class: '2nde C',
    schedule: 'Vendredi, 10h-13h',
    room: 'Salle 105',
    studentsCount: 35,
    description: 'Fondamentaux des mathématiques pour la classe de seconde',
    nextLesson: '2025-08-01T10:00:00',
    progress: 80,
  },
];

export default function TeacherCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    subject: '',
    class: '',
    schedule: '',
    description: ''
  });

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mes cours
              </h1>
              <p className="text-lg text-gray-600">
                Gérez vos cours, consultez les emplois du temps et suivez la progression de vos classes.
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {course.title}
                  </h2>
                  <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                    {course.progress}%
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Matière</p>
                    <p className="text-gray-900">{course.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Horaires</p>
                    <p className="text-gray-900">{course.schedule}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Salle</p>
                    <p className="text-gray-900">{course.room}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Élèves</p>
                    <p className="text-gray-900">{course.studentsCount} inscrits</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm font-medium text-gray-500">Prochain cours</p>
                    <p className="text-gray-900">
                      {new Date(course.nextLesson).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Voir détails
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Emploi du temps
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
