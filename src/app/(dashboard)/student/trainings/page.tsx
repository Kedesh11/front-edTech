'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';
import { Training, TrainingFilter, TrainingEnrollment } from '@/types/content';
import { mockTrainings, getStudentEnrollments, enrollInTraining } from '@/data/mock-trainings';

export default function TrainingsPage() {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>([]);
  const [filters, setFilters] = useState<TrainingFilter>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    if (user) {
      setTrainings(mockTrainings);
      setFilteredTrainings(mockTrainings);
      const userEnrollments = getStudentEnrollments(user.id);
      setEnrollments(userEnrollments);
    }
  }, [user]);

  useEffect(() => {
    let filtered = trainings;

    if (filters.category) {
      filtered = filtered.filter(training => training.category === filters.category);
    }

    if (filters.level) {
      filtered = filtered.filter(training => training.level === filters.level);
    }

    if (filters.status) {
      filtered = filtered.filter(training => training.status === filters.status);
    }

    if (filters.enrollmentStatus) {
      filtered = filtered.filter(training => training.enrollmentStatus === filters.enrollmentStatus);
    }

    if (filters.instructor) {
      filtered = filtered.filter(training => 
        training.instructor.name.toLowerCase().includes(filters.instructor!.toLowerCase())
      );
    }

    setFilteredTrainings(filtered);
  }, [trainings, filters]);

  const handleEnroll = async (trainingId: string) => {
    if (!user) return;
    
    setIsEnrolling(true);
    try {
      const enrollment = enrollInTraining(user.id, trainingId);
      if (enrollment) {
        setEnrollments(prev => [...prev, enrollment]);
        setTrainings(prev => 
          prev.map(training => 
            training.id === trainingId 
              ? { ...training, currentParticipants: training.currentParticipants + 1 }
              : training
          )
        );
        alert('Inscription réussie !');
      } else {
        alert('Impossible de s\'inscrire à cette formation.');
      }
    } catch (error) {
      alert('Erreur lors de l\'inscription.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const isEnrolled = (trainingId: string) => {
    return enrollments.some(enrollment => enrollment.trainingId === trainingId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'technology': return 'bg-purple-100 text-purple-800';
      case 'soft-skills': return 'bg-green-100 text-green-800';
      case 'career': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDuration = (hours: number, minutes: number) => {
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}min`;
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuit';
    return `${price}€`;
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
              <p className="text-gray-600 mt-1">
                Découvrez et inscrivez-vous aux formations disponibles
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {enrollments.length} formation{enrollments.length > 1 ? 's' : ''} suivie{enrollments.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select
                  label="Catégorie"
                  value={filters.category || ''}
                  onChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="academic">Académique</option>
                  <option value="technology">Technologie</option>
                  <option value="soft-skills">Compétences douces</option>
                  <option value="career">Carrière</option>
                </Select>

                <Select
                  label="Niveau"
                  value={filters.level || ''}
                  onChange={(value) => setFilters(prev => ({ ...prev, level: value || undefined }))}
                >
                  <option value="">Tous les niveaux</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </Select>

                <Select
                  label="Statut"
                  value={filters.status || ''}
                  onChange={(value) => setFilters(prev => ({ ...prev, status: value || undefined }))}
                >
                  <option value="">Tous les statuts</option>
                  <option value="upcoming">À venir</option>
                  <option value="ongoing">En cours</option>
                  <option value="completed">Terminé</option>
                </Select>

                <Select
                  label="Inscription"
                  value={filters.enrollmentStatus || ''}
                  onChange={(value) => setFilters(prev => ({ ...prev, enrollmentStatus: value || undefined }))}
                >
                  <option value="">Tous</option>
                  <option value="open">Ouvertes</option>
                  <option value="closed">Fermées</option>
                  <option value="waitlist">Liste d'attente</option>
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

          {/* Trainings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTrainings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500">Aucune formation trouvée</p>
              </div>
            ) : (
              filteredTrainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(training.category)}`}>
                          {training.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(training.level)}`}>
                          {training.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {training.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Instructor */}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {training.instructor.name}
                      </div>

                      {/* Schedule */}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(training.schedule.startDate)}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDuration(training.duration.hours, training.duration.minutes)}
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {training.location.type === 'online' ? 'En ligne' : 
                         training.location.type === 'hybrid' ? 'Hybride' : 
                         training.location.room || 'Salle à définir'}
                      </div>

                      {/* Participants */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {training.currentParticipants}/{training.maxParticipants} participants
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(training.status)}`}>
                          {training.status}
                        </span>
                      </div>

                      {/* Price and Certificate */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-900">
                          {formatPrice(training.price)}
                        </span>
                        {training.certificate && (
                          <span className="text-green-600 text-xs flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Certificat
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {isEnrolled(training.id) ? (
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled
                          >
                            Inscrit
                          </Button>
                        ) : training.enrollmentStatus === 'closed' ? (
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled
                          >
                            Complet
                          </Button>
                        ) : training.enrollmentStatus === 'waitlist' ? (
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled
                          >
                            Liste d'attente
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleEnroll(training.id)}
                            disabled={isEnrolling}
                            className="w-full"
                          >
                            {isEnrolling ? 'Inscription...' : 'S\'inscrire'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* My Enrollments */}
          {enrollments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mes formations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrollments.map((enrollment) => {
                    const training = trainings.find(t => t.id === enrollment.trainingId);
                    if (!training) return null;

                    return (
                      <div key={enrollment.id} className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{training.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Statut: <span className="capitalize">{enrollment.status}</span></p>
                          <p>Progression: {enrollment.progress}%</p>
                          <p>Inscrit le: {formatDate(enrollment.enrollmentDate)}</p>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}