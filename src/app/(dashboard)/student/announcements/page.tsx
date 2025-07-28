'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';
import { Announcement, AnnouncementFilter } from '@/types/content';
import { getAnnouncementsByAudience, markAnnouncementAsRead } from '@/data/mock-announcements';

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [filters, setFilters] = useState<AnnouncementFilter>({});
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    if (user) {
      const userAnnouncements = getAnnouncementsByAudience('student');
      setAnnouncements(userAnnouncements);
      setFilteredAnnouncements(userAnnouncements);
    }
  }, [user]);

  useEffect(() => {
    let filtered = announcements;

    if (filters.category) {
      filtered = filtered.filter(ann => ann.category === filters.category);
    }

    if (filters.priority) {
      filtered = filtered.filter(ann => ann.priority === filters.priority);
    }

    if (filters.isRead !== undefined) {
      filtered = filtered.filter(ann => ann.isRead === filters.isRead);
    }

    setFilteredAnnouncements(filtered);
  }, [announcements, filters]);

  const handleAnnouncementClick = (announcement: Announcement) => {
    if (!announcement.isRead) {
      markAnnouncementAsRead(announcement.id);
      setAnnouncements(prev => 
        prev.map(ann => 
          ann.id === announcement.id ? { ...ann, isRead: true } : ann
        )
      );
    }
    setSelectedAnnouncement(announcement);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'bg-red-50 border-red-200';
      case 'academic': return 'bg-blue-50 border-blue-200';
      case 'event': return 'bg-purple-50 border-purple-200';
      case 'reminder': return 'bg-yellow-50 border-yellow-200';
      case 'general': return 'bg-gray-50 border-gray-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = announcements.filter(ann => !ann.isRead).length;

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="h-[calc(100vh-120px)] flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 space-y-6 pb-6 bg-white">
            {/* Title and Badge */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Annonces</h1>
                <p className="text-gray-600 mt-1">
                  Restez informé des dernières nouvelles et événements
                </p>
              </div>
              {unreadCount > 0 && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select
                    label="Catégorie"
                    value={filters.category || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      category: (e.target.value as Announcement['category']) || undefined 
                    }))}
                  >
                    <option value="">Toutes les catégories</option>
                    <option value="general">Général</option>
                    <option value="academic">Académique</option>
                    <option value="event">Événement</option>
                    <option value="reminder">Rappel</option>
                    <option value="emergency">Urgence</option>
                  </Select>

                  <Select
                    label="Priorité"
                    value={filters.priority || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priority: (e.target.value as Announcement['priority']) || undefined 
                    }))}
                  >
                    <option value="">Toutes les priorités</option>
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgente</option>
                  </Select>

                  <Select
                    label="Statut"
                    value={filters.isRead === undefined ? '' : filters.isRead ? 'read' : 'unread'}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      isRead: e.target.value === '' ? undefined : e.target.value === 'read' 
                    }))}
                  >
                    <option value="">Tous</option>
                    <option value="unread">Non lus</option>
                    <option value="read">Lus</option>
                  </Select>

                  <div className="flex items-end">
                    <Button
                      onClick={() => setFilters({})}
                      variant="outline"
                      className="w-full"
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* List - Scrollable */}
              <div className="lg:col-span-1">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Liste des annonces</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden min-h-0">
                    <div className="h-full overflow-y-auto space-y-3 pr-2">
                      {filteredAnnouncements.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                          Aucune annonce trouvée
                        </p>
                      ) : (
                        filteredAnnouncements.map((announcement) => (
                          <div
                            key={announcement.id}
                            onClick={() => handleAnnouncementClick(announcement)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              selectedAnnouncement?.id === announcement.id
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : getCategoryColor(announcement.category)
                            } ${!announcement.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-semibold text-sm ${!announcement.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                                {announcement.title}
                              </h3>
                              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                                {announcement.priority}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Par {announcement.author.name} • {formatDate(announcement.createdAt)}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 capitalize">
                                {announcement.category}
                              </span>
                              {!announcement.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detail - Fixed height, scrollable content */}
              <div className="lg:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Détail de l'annonce</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    {selectedAnnouncement ? (
                      <div className="h-full overflow-y-auto space-y-6 pr-2">
                        {/* Header */}
                        <div className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                              {selectedAnnouncement.title}
                            </h2>
                            <span className={`text-sm px-3 py-1 rounded-full border ${getPriorityColor(selectedAnnouncement.priority)}`}>
                              {selectedAnnouncement.priority}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span>Par {selectedAnnouncement.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(selectedAnnouncement.createdAt)}</span>
                            <span>•</span>
                            <span className="capitalize">{selectedAnnouncement.category}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed">
                            {selectedAnnouncement.content}
                          </p>
                        </div>

                        {/* Tags */}
                        {selectedAnnouncement.tags.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedAnnouncement.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Attachments */}
                        {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pièces jointes</h4>
                            <div className="space-y-2">
                              {selectedAnnouncement.attachments.map((attachment, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                      <p className="text-xs text-gray-500">
                                        {(attachment.size / 1024).toFixed(1)} KB
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => window.open(attachment.url, '_blank')}
                                    variant="outline"
                                    size="sm"
                                  >
                                    Télécharger
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Expiration */}
                        {selectedAnnouncement.expiresAt && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm text-yellow-800">
                                Cette annonce expire le {formatDate(selectedAnnouncement.expiresAt)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V4a1 1 0 00-1-1H5a1 1 0 00-1 1v1zM4 11h6v-2H4v2zM14 5h6V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1zM14 11h6v-2h-6v2zM14 17h6v-2h-6v2z" />
                        </svg>
                        <p className="text-gray-500">
                          Sélectionnez une annonce pour voir les détails
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 