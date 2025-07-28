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

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'course' | 'exam' | 'assignment' | 'other';
  location?: string;
  description?: string;
}

export default function StudentSchedule() {
  const { user } = useAuth();
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Cours de Mathématiques',
      start: '2025-07-29T09:00:00',
      end: '2025-07-29T11:00:00',
      type: 'course',
      location: 'Salle 201',
    },
    {
      id: '2',
      title: 'Examen de Physique',
      start: '2025-07-30T14:00:00',
      end: '2025-07-30T16:00:00',
      type: 'exam',
      location: 'Amphithéâtre A',
      description: 'Examen final du semestre',
    },
    {
      id: '3',
      title: 'Rendu Projet Info',
      start: '2025-08-01T23:59:59',
      end: '2025-08-01T23:59:59',
      type: 'assignment',
      description: 'Date limite de rendu du projet',
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

  const getEventColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'course':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'exam':
        return 'border-red-200 bg-red-50 text-red-700';
      case 'assignment':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getEventIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'exam':
        return '📝';
      case 'assignment':
        return '✍️';
      default:
        return '📅';
    }
  };

  // Grouper les événements par jour
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.start).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, ScheduleEvent[]>);

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
                Mon planning
              </h1>
              <p className="text-lg text-gray-600">
                Consultez votre emploi du temps et gérez vos échéances importantes.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, dayEvents]) => (
              <div key={date} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {date}
                </h2>

                <div className="space-y-4">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-xl border ${getEventColor(event.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <span className="text-xl">
                            {getEventIcon(event.type)}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {event.title}
                            </h3>
                            <div className="text-sm mt-1">
                              {new Date(event.start).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {event.end !== event.start && (
                                <>
                                  {' - '}
                                  {new Date(event.end).toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </>
                              )}
                            </div>
                            {event.location && (
                              <p className="text-sm mt-1">
                                📍 {event.location}
                              </p>
                            )}
                            {event.description && (
                              <p className="text-sm mt-2 opacity-80">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
