'use client';

import { useState } from 'react';
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
} from '@/components/shared/dashboard/icons';

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

export default function StudentAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      courseId: '1',
      title: 'Devoir de Probabilités',
      description: 'Exercices sur les lois de probabilité continues',
      dueDate: '2025-08-05T23:59:59',
      status: 'pending',
    },
    {
      id: '2',
      courseId: '2',
      title: 'Rapport d\'expérience',
      description: 'Compte-rendu de l\'expérience sur l\'effet photoélectrique',
      dueDate: '2025-08-03T23:59:59',
      status: 'submitted',
    },
    {
      id: '3',
      courseId: '3',
      title: 'Projet de programmation',
      description: 'Implémentation d\'un arbre binaire de recherche',
      dueDate: '2025-08-10T23:59:59',
      status: 'graded',
      grade: 18,
      feedback: 'Excellent travail, bonne gestion des cas particuliers',
    },
  ]);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <DashboardIcon />,
      label: 'Tableau de bord',
      href: '/student/dashboard',
    },
    {
      icon: <DocumentsIcon />,
      label: 'Cours et devoirs',
      href: '/student/courses',
    },
    {
      icon: <RequestsIcon />,
      label: 'Notes',
      href: '/student/grades',
    },
    {
      icon: <DashboardIcon />,
      label: 'Statistiques',
      href: '/student/statistics',
    },
    {
      icon: <TrainingsIcon />,
      label: 'Formations',
      href: '/student/trainings',
    },
    {
      icon: <AnnouncementsIcon />,
      label: 'Annonces',
      href: '/student/announcements',
    },
    {
      icon: <CalendarIcon />,
      label: 'Emploi du temps',
      href: '/student/schedule',
    },
  ];

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'submitted':
        return 'text-blue-700 bg-blue-50';
      case 'graded':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'À faire';
      case 'submitted':
        return 'Soumis';
      case 'graded':
        return 'Noté';
      default:
        return status;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        sidebarItems={sidebarItems}
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
                Mes devoirs
              </h1>
              <p className="text-lg text-gray-600">
                Gérez vos devoirs, suivez les échéances et consultez vos résultats.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {assignment.title}
                      </h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-gray-600">
                      {assignment.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date limite : {new Date(assignment.dueDate).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    
                    {assignment.grade && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-800">Note obtenue</p>
                            <p className="text-lg font-bold text-green-600">{assignment.grade}/20</p>
                          </div>
                          {assignment.feedback && (
                            <div className="text-sm text-green-700">
                              <p className="font-medium">Commentaire :</p>
                              <p>{assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex flex-col gap-2">
                    {assignment.status === 'pending' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Soumettre
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
