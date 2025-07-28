'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Course {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  description: string;
  schedule: string;
  room: string;
  materials: string[];
  assignments: number;
  progress: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Mathématiques Avancées',
    subject: 'Mathématiques',
    teacher: 'Jean Martin',
    description: 'Cours approfondi sur les fonctions exponentielles et logarithmiques.',
    schedule: 'Lundi, Mercredi, Vendredi - 8h-10h',
    room: 'Salle 201',
    materials: ['Livre de cours', 'Exercices en ligne', 'Calculatrice'],
    assignments: 5,
    progress: 75
  },
  {
    id: '2',
    title: 'Physique Quantique',
    subject: 'Physique',
    teacher: 'Marie Dubois',
    description: 'Introduction aux concepts de la physique quantique.',
    schedule: 'Mardi, Jeudi - 10h-12h',
    room: 'Salle 105',
    materials: ['Manuel de physique', 'Simulations numériques'],
    assignments: 3,
    progress: 60
  },
  {
    id: '3',
    title: 'Littérature Française',
    subject: 'Français',
    teacher: 'Sophie Laurent',
    description: 'Étude des œuvres majeures de la littérature française du XIXe siècle.',
    schedule: 'Lundi, Jeudi - 14h-16h',
    room: 'Salle 203',
    materials: ['Anthologie littéraire', 'Cahier de notes'],
    assignments: 4,
    progress: 85
  }
];

export default function StudentCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => {
    if (selectedSubject && course.subject !== selectedSubject) return false;
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <ProtectedRoute allowedRoles={['student']}>
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
              <h1 className="text-3xl font-bold text-black mb-2">
                Mes cours
              </h1>
              <p className="text-lg text-gray-600">
                Consultez vos cours, devoirs et ressources pédagogiques.
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-black">
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les matières</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Physique">Physique</option>
                <option value="Français">Français</option>
                <option value="Histoire">Histoire</option>
                <option value="Anglais">Anglais</option>
              </select>
            </div>
            <Input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-900 mb-2">
                      {course.subject} • {course.teacher}
                    </p>
                    <p className="text-gray-800 text-sm mb-4">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    {course.schedule}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    {course.room}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📝</span>
                    {course.assignments} devoirs
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold">
                    Voir le cours
                  </Button>
                  <Button className="bg-gray-100 text-gray-900 hover:bg-gray-200 font-bold">
                    📚
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
