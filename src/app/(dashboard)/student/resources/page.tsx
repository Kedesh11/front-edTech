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

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'exercise';
  subject: string;
  description: string;
  url: string;
  date: string;
}

export default function StudentResources() {
  const { user } = useAuth();
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Cours sur les intégrales',
      type: 'pdf',
      subject: 'Mathématiques',
      description: 'Support de cours détaillé sur le calcul intégral',
      url: '/resources/math/integrales.pdf',
      date: '2025-07-20',
    },
    {
      id: '2',
      title: 'Vidéo - Introduction à la mécanique quantique',
      type: 'video',
      subject: 'Physique',
      description: 'Vidéo explicative sur les concepts de base',
      url: 'https://video.edu/mecanique-quantique',
      date: '2025-07-22',
    },
    {
      id: '3',
      title: 'Exercices sur les arbres binaires',
      type: 'exercise',
      subject: 'Informatique',
      description: 'Série d\'exercices pratiques',
      url: '/resources/info/arbres-exercices.pdf',
      date: '2025-07-25',
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

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'video':
        return '🎥';
      case 'link':
        return '🔗';
      case 'exercise':
        return '✏️';
      default:
        return '📚';
    }
  };

  const getResourceTypeText = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return 'Document PDF';
      case 'video':
        return 'Vidéo';
      case 'link':
        return 'Lien externe';
      case 'exercise':
        return 'Exercices';
      default:
        return type;
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
                Ressources pédagogiques
              </h1>
              <p className="text-lg text-gray-600">
                Accédez à tous les supports de cours, vidéos et exercices pour enrichir votre apprentissage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">
                    {getResourceIcon(resource.type)}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {resource.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {resource.subject}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(resource.date).toLocaleDateString('fr-FR')}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Consulter
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
