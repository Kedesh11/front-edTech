'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Admin } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout, SidebarItem } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  DashboardIcon,
  AnnouncementsIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
  ProjectsIcon,
  SettingsIcon,
} from '@/components/shared/dashboard/icons';
import { PlotlyChart } from '@/components/shared/PlotlyChart';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Class {
  id: string;
  name: string;
  level: string;
  teacher: string;
  studentsCount: number;
  maxStudents: number;
  subjects: string[];
  schedule: string;
  room: string;
  averageGrade: number;
  attendanceRate: number;
}

const mockClasses: Class[] = [
  {
    id: '1',
    name: '1ère A',
    level: 'Première',
    teacher: 'Jean Martin',
    studentsCount: 32,
    maxStudents: 35,
    subjects: ['Mathématiques', 'Physique', 'Français', 'Histoire'],
    schedule: 'Lundi-Vendredi, 8h-17h',
    room: 'Salle 201',
    averageGrade: 14.2,
    attendanceRate: 92
  },
  {
    id: '2',
    name: 'Terminale B',
    level: 'Terminale',
    teacher: 'Marie Dubois',
    studentsCount: 28,
    maxStudents: 30,
    subjects: ['Mathématiques', 'Physique', 'Philosophie', 'Anglais'],
    schedule: 'Lundi-Vendredi, 8h-17h',
    room: 'Salle 105',
    averageGrade: 13.8,
    attendanceRate: 89
  },
  {
    id: '3',
    name: '2nde C',
    level: 'Seconde',
    teacher: 'Pierre Bernard',
    studentsCount: 35,
    maxStudents: 35,
    subjects: ['Mathématiques', 'SVT', 'Français', 'Histoire-Géo'],
    schedule: 'Lundi-Vendredi, 8h-17h',
    room: 'Salle 203',
    averageGrade: 12.5,
    attendanceRate: 95
  },
  {
    id: '4',
    name: '1ère B',
    level: 'Première',
    teacher: 'Sophie Laurent',
    studentsCount: 30,
    maxStudents: 35,
    subjects: ['Mathématiques', 'Chimie', 'Français', 'Philosophie'],
    schedule: 'Lundi-Vendredi, 8h-17h',
    room: 'Salle 102',
    averageGrade: 13.9,
    attendanceRate: 91
  }
];

export default function AdminClasses() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    level: '',
    teacher: '',
    maxStudents: 35,
    subjects: [] as string[],
    room: ''
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const classData: Class = {
      id: Date.now().toString(),
      name: newClass.name,
      level: newClass.level,
      teacher: newClass.teacher,
      studentsCount: 0,
      maxStudents: newClass.maxStudents,
      subjects: newClass.subjects,
      schedule: 'À définir',
      room: newClass.room,
      averageGrade: 0,
      attendanceRate: 0
    };
    setClasses([...classes, classData]);
    setNewClass({
      name: '',
      level: '',
      teacher: '',
      maxStudents: 35,
      subjects: [],
      room: ''
    });
    setIsAddingClass(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Seconde':
        return 'text-blue-600 bg-blue-50';
      case 'Première':
        return 'text-green-600 bg-green-50';
      case 'Terminale':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 15) return 'text-green-600 bg-green-50';
    if (grade >= 12) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-50';
    if (rate >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredClasses = classes.filter(classItem => {
    if (selectedLevel && classItem.level !== selectedLevel) return false;
    if (searchTerm && !classItem.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Données pour le graphique de répartition des classes
  const classDistributionData = [{
    type: 'pie' as const,
    labels: classes.map(c => c.name),
    values: classes.map(c => c.studentsCount),
    textinfo: 'label+percent' as const,
    hole: 0.4,
    marker: {
      colors: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']
    }
  }];

  const classDistributionLayout = {
    title: { text: 'Répartition des élèves par classe' },
    height: 400,
    showlegend: false
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
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
                Gestion des classes
              </h1>
              <p className="text-lg text-gray-600">
                Gérez les classes, les effectifs et les emplois du temps de l'établissement.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">🏫</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total classes</p>
                  <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total élèves</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {classes.reduce((sum, c) => sum + c.studentsCount, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enseignants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(classes.map(c => c.teacher)).size}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Moyenne générale</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(classes.reduce((sum, c) => sum + c.averageGrade, 0) / classes.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les niveaux</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </Select>
            </div>
            <button
              onClick={() => setIsAddingClass(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouvelle classe
            </button>
          </div>

          {/* Add Class Form */}
          {isAddingClass && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvelle classe</h3>
              <form onSubmit={handleAddClass} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la classe
                    </label>
                    <Input
                      type="text"
                      value={newClass.name}
                      onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 1ère A"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau
                    </label>
                    <Select
                      value={newClass.level}
                      onChange={(e) => setNewClass(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner un niveau</option>
                      <option value="Seconde">Seconde</option>
                      <option value="Première">Première</option>
                      <option value="Terminale">Terminale</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professeur principal
                    </label>
                    <Input
                      type="text"
                      value={newClass.teacher}
                      onChange={(e) => setNewClass(prev => ({ ...prev, teacher: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nom du professeur"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salle
                    </label>
                    <Input
                      type="text"
                      value={newClass.room}
                      onChange={(e) => setNewClass(prev => ({ ...prev, room: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Salle 201"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Effectif maximum
                  </label>
                  <Input
                    type="number"
                    value={newClass.maxStudents}
                    onChange={(e) => setNewClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="40"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingClass(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={classDistributionData} layout={classDistributionLayout} />
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {classItem.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(classItem.level)}`}>
                    {classItem.level}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Professeur principal</p>
                    <p className="text-gray-900">{classItem.teacher}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Effectif</p>
                    <p className="text-gray-900">
                      {classItem.studentsCount}/{classItem.maxStudents} élèves
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(classItem.studentsCount / classItem.maxStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Salle</p>
                    <p className="text-gray-900">{classItem.room}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Matières principales</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {classItem.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                      {classItem.subjects.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{classItem.subjects.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Moyenne</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(classItem.averageGrade)}`}>
                        {classItem.averageGrade}/20
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Présence</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAttendanceColor(classItem.attendanceRate)}`}>
                        {classItem.attendanceRate}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Voir détails
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredClasses.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
              <p className="text-gray-500">Aucune classe trouvée.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
