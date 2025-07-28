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
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface PlanningEvent {
  id: string;
  title: string;
  type: 'course' | 'exam' | 'meeting' | 'event';
  startTime: string;
  endTime: string;
  date: string;
  room: string;
  class?: string;
  teacher?: string;
  description?: string;
  participants?: string[];
}

const mockEvents: PlanningEvent[] = [
  {
    id: '1',
    title: 'Bac Blanc - Mathématiques',
    type: 'exam',
    startTime: '09:00',
    endTime: '12:00',
    date: '2025-07-29',
    room: 'Salle 201',
    class: 'Terminale B',
    teacher: 'Jean Martin',
    description: 'Épreuve de mathématiques du bac blanc'
  },
  {
    id: '2',
    title: 'Réunion équipe pédagogique',
    type: 'meeting',
    startTime: '14:00',
    endTime: '16:00',
    date: '2025-07-29',
    room: 'Salle des professeurs',
    participants: ['Tous les enseignants', 'Direction'],
    description: 'Réunion hebdomadaire de l\'équipe pédagogique'
  },
  {
    id: '3',
    title: 'Cours Mathématiques - 1ère A',
    type: 'course',
    startTime: '08:00',
    endTime: '10:00',
    date: '2025-07-30',
    room: 'Salle 201',
    class: '1ère A',
    teacher: 'Jean Martin',
    description: 'Cours sur les fonctions exponentielles'
  },
  {
    id: '4',
    title: 'Portes ouvertes',
    type: 'event',
    startTime: '14:00',
    endTime: '18:00',
    date: '2025-07-31',
    room: 'Hall principal',
    participants: ['Familles', 'Élèves', 'Enseignants'],
    description: 'Journée portes ouvertes de l\'établissement'
  },
  {
    id: '5',
    title: 'Contrôle Physique - Terminale B',
    type: 'exam',
    startTime: '10:00',
    endTime: '12:00',
    date: '2025-08-01',
    room: 'Salle 105',
    class: 'Terminale B',
    teacher: 'Marie Dubois',
    description: 'Contrôle sur les forces et le mouvement'
  }
];

export default function AdminPlanning() {
  const { user } = useAuth();
  const [events, setEvents] = useState<PlanningEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<string>('2025-07-29');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'course' as 'course' | 'exam' | 'meeting' | 'event',
    startTime: '',
    endTime: '',
    date: '',
    room: '',
    class: '',
    teacher: '',
    description: ''
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: PlanningEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      type: newEvent.type,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      date: newEvent.date,
      room: newEvent.room,
      class: newEvent.class,
      teacher: newEvent.teacher,
      description: newEvent.description
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      type: 'course',
      startTime: '',
      endTime: '',
      date: '',
      room: '',
      class: '',
      teacher: '',
      description: ''
    });
    setIsAddingEvent(false);
  };

  const getEventTypeColor = (type: PlanningEvent['type']) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'event':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: PlanningEvent['type']) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'exam':
        return '📝';
      case 'meeting':
        return '👥';
      case 'event':
        return '🎉';
      default:
        return '📅';
    }
  };

  const getEventTypeLabel = (type: PlanningEvent['type']) => {
    switch (type) {
      case 'course':
        return 'Cours';
      case 'exam':
        return 'Examen';
      case 'meeting':
        return 'Réunion';
      case 'event':
        return 'Événement';
      default:
        return type;
    }
  };

  const filteredEvents = events.filter(event => {
    if (selectedDate && event.date !== selectedDate) return false;
    if (selectedType && event.type !== selectedType) return false;
    return true;
  });

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, PlanningEvent[]>);

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
                Planning général
              </h1>
              <p className="text-lg text-gray-600">
                Gérez le planning de l'établissement, les examens et les événements.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total événements</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Examens</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.type === 'exam').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Réunions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.type === 'meeting').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">🎉</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Événements</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.type === 'event').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                <option value="course">Cours</option>
                <option value="exam">Examens</option>
                <option value="meeting">Réunions</option>
                <option value="event">Événements</option>
              </select>
            </div>
            <button
              onClick={() => setIsAddingEvent(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouvel événement
            </button>
          </div>

          {/* Add Event Form */}
          {isAddingEvent && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvel événement</h3>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <Input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <Select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="course">Cours</option>
                      <option value="exam">Examen</option>
                      <option value="meeting">Réunion</option>
                      <option value="event">Événement</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure début
                    </label>
                    <Input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure fin
                    </label>
                    <Input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salle
                    </label>
                    <Input
                      type="text"
                      value={newEvent.room}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, room: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Classe (optionnel)
                    </label>
                    <Input
                      type="text"
                      value={newEvent.class}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, class: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 1ère A"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description de l'événement"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingEvent(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List */}
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, dayEvents]) => (
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
                  {dayEvents
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
                                  {getEventTypeLabel(event.type)}
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
                                    {event.teacher && <span>👨‍🏫 {event.teacher}</span>}
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
                            <button className="px-3 py-1 text-sm bg-white bg-opacity-50 rounded hover:bg-opacity-75 transition-colors">
                              Modifier
                            </button>
                            <button className="px-3 py-1 text-sm bg-white bg-opacity-50 rounded hover:bg-opacity-75 transition-colors">
                              Supprimer
                            </button>
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
