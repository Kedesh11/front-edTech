'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout, SidebarItem } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';
import {
  DashboardIcon,
  AnnouncementsIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
} from '@/components/shared/dashboard/icons';

interface Grade {
  id: string;
  courseId: string;
  assignmentTitle: string;
  grade: number;
  maxGrade: number;
  date: string;
  feedback?: string;
}

export default function StudentGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: '1',
      courseId: '1',
      assignmentTitle: 'Contrôle sur les intégrales',
      grade: 16,
      maxGrade: 20,
      date: '2025-07-15',
      feedback: 'Très bonne maîtrise des concepts',
    },
    {
      id: '2',
      courseId: '2',
      assignmentTitle: 'Test de mécanique quantique',
      grade: 14,
      maxGrade: 20,
      date: '2025-07-20',
      feedback: 'Bon raisonnement mais quelques erreurs de calcul',
    },
    {
      id: '3',
      courseId: '3',
      assignmentTitle: 'Projet de programmation',
      grade: 18,
      maxGrade: 20,
      date: '2025-07-25',
      feedback: 'Excellent travail, code bien structuré',
    },
  ]);

  const averageGrade = grades.reduce((acc, grade) => acc + (grade.grade * 20 / grade.maxGrade), 0) / grades.length;

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
      icon: <DashboardIcon />, // à remplacer par un icône de stats si tu en as un
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

  // Données pour le graphique d'évolution
  const progressData = [{
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    x: grades.map(grade => grade.date),
    y: grades.map(grade => grade.grade * 20 / grade.maxGrade),
    line: { color: '#3B82F6' },
    name: 'Notes',
  }];

  const progressLayout = {
    title: { text: 'Évolution des notes' },
    height: 300,
    xaxis: {
      title: { text: 'Date' },
    },
    yaxis: {
      title: { text: 'Note /20' },
      range: [0, 20],
    },
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
                Mes notes
              </h1>
              <p className="text-lg text-gray-600">
                Suivez votre progression académique et consultez vos résultats détaillés.
              </p>
            </div>
          </div>
          
          {/* Vue d'ensemble */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Moyenne générale
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {averageGrade.toFixed(2)}/20
              </p>
            </div>
          </div>

          {/* Graphique d'évolution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={progressData} layout={progressLayout} />
          </div>

          {/* Liste détaillée des notes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Détail des notes</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Devoir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commentaire
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {grade.assignmentTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        {grade.grade}/{grade.maxGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(grade.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {grade.feedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
