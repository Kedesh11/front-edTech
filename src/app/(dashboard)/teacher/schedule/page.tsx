'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/mock/types';
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
} from '@/components/shared/dashboard/icons';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'course' | 'meeting' | 'exam' | 'office_hours';
  startTime: string;
  endTime: string;
  date: string;
  room: string;
  class?: string;
  subject?: string;
  description?: string;
}

const mockSchedule: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Mathématiques - 1ère A',
    type: 'course',
    startTime: '09:00',
    endTime: '11:00',
    date: '2025-07-28',
    room: 'Salle 201',
    class: '1ère A',
    subject: 'Mathématiques',
    description: 'Cours sur les fonctions exponentielles'
  },
  {
    id: '2',
    title: 'Réunion équipe pédagogique',
    type: 'meeting',
    startTime: '11:30',
    endTime: '12:30',
    date: '2025-07-28',
    room: 'Salle des professeurs',
    description: 'Réunion hebdomadaire de l\'équipe pédagogique'
  },
  {
    id: '3',
    title: 'Physique - Terminale B',
    type: 'course',
    startTime: '14:00',
    endTime: '16:00',
    date: '2025-07-28',
    room: 'Laboratoire 102',
    class: 'Terminale B',
    subject: 'Physique',
    description: 'TP sur les forces et le mouvement'
  },
  {
    id: '4',
    title: 'Heures de permanence',
    type: 'office_hours',
    startTime: '16:30',
    endTime: '18:00',
    date: '2025-07-28',
    room: 'Salle 201',
    description: 'Heures de permanence pour les élèves'
  },
  {
    id: '5',
    title: 'Contrôle Mathématiques',
    type: 'exam',
    startTime: '09:00',
    endTime: '11:00',
    date: '2025-07-29',
    room: 'Salle 201',
    class: '1ère A',
    subject: 'Mathématiques',
    description: 'Contrôle sur les fonctions exponentielles'
  },
  {
    id: '6',
    title: 'Mathématiques - 2nde C',
    type: 'course',
    startTime: '10:00',
    endTime: '13:00',
    date: '2025-07-30',
    room: 'Salle 105',
    class: '2nde C',
    subject: 'Mathématiques',
    description: 'Cours sur les équations du second degré'
  }
];

export default function TeacherSchedule() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(mockSchedule);
  const [selectedDate, setSelectedDate] = useState<string>('2025-07-28');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'course' as 'course' | 'exam' | 'meeting' | 'office_hours',
    startTime: '',
    endTime: '',
    date: '',
    room: '',
    class: '',
    description: ''
  });

  const getEventTypeColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'office_hours':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'course':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'exam':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'office_hours':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      type: newEvent.type,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      date: newEvent.date,
      room: newEvent.room,
      class: newEvent.class,
      description: newEvent.description
    };
    setSchedule([...schedule, event]);
    setNewEvent({
      title: '',
      type: 'course',
      startTime: '',
      endTime: '',
      date: '',
      room: '',
      class: '',
      description: ''
    });
    setIsAddingEvent(false);
  };

  const filteredSchedule = schedule.filter(event => {
    if (selectedDate && event.date !== selectedDate) return false;
    if (selectedType && event.type !== selectedType) return false;
    return true;
  });

  const groupedEvents = filteredSchedule.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, ScheduleEvent[]>);

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
                Mon emploi du temps
              </h1>
              <p className="text-lg text-gray-600">
                Consultez votre planning, gérez vos cours et vos rendez-vous.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            < Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les types</option>
              <option value="course">Cours</option>
              <option value="meeting">Réunions</option>
              <option value="exam">Contrôles</option>
              <option value="office_hours">Permanences</option>
            </Select>
          </div>

          {/* Schedule */}
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {new Date(date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                
                <div className="space-y-4">
                  {events
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold">{event.title}</h4>
                                <span className="text-sm px-2 py-1 rounded-full bg-white bg-opacity-50">
                                  {event.type}
                                </span>
                              </div>
                              
                              <div className="text-sm space-y-1">
                                <div className="flex items-center space-x-4">
                                  <span>🕐 {event.startTime} - {event.endTime}</span>
                                  <span>📍 {event.room}</span>
                                </div>
                                
                                {event.class && (
                                  <div className="flex items-center space-x-4">
                                    <span>👥 {event.class}</span>
                                    {event.subject && <span>📚 {event.subject}</span>}
                                  </div>
                                )}
                                
                                {event.description && (
                                  <p className="text-sm opacity-90 mt-2">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button className="px-3 py-1 text-sm bg-white bg-opacity-50 rounded hover:bg-opacity-75 transition-colors">
                              Modifier
                            </Button>
                            <Button className="px-3 py-1 text-sm bg-white bg-opacity-50 rounded hover:bg-opacity-75 transition-colors">
                              Détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            
            {Object.keys(groupedEvents).length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <p className="text-gray-500">Aucun événement trouvé pour cette période.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
