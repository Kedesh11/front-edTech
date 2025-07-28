'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Course } from '@/types/teacher';
import { getTeacherCourses } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function TeacherCourses() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  useEffect(() => {
    if (teacher?.id) {
      const teacherCourses = getTeacherCourses(teacher.id);
      setCourses(teacherCourses);
      setFilteredCourses(teacherCourses);
    }
  }, [teacher?.id]);

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (subjectFilter) {
      filtered = filtered.filter(course => course.subject === subjectFilter);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, subjectFilter]);

  const subjects = [...new Set(courses.map(course => course.subject))];

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
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
              <h1 className="text-2xl font-bold text-gray-900">Mes Cours</h1>
              <p className="text-gray-600">Gérez vos cours et ressources pédagogiques</p>
            </div>
            <Button onClick={() => console.log('Nouveau cours')}>
              Nouveau cours
            </Button>
          </div>

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">Toutes les matières</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des cours */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Cours ({filteredCourses.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedCourse?.id === course.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{course.name}</h3>
                          <Badge className={getStatusColor(course.isActive)}>
                            {course.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{course.className}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{course.schedule.day} {formatTime(course.schedule.startTime)}</span>
                          <span>{course.students.length} élèves</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails du cours */}
            <div className="lg:col-span-2">
              {selectedCourse ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedCourse.name}</CardTitle>
                        <p className="text-gray-600 mt-1">{selectedCourse.className}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Informations générales */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Informations générales</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Matière</label>
                            <p className="text-gray-900">{selectedCourse.subject}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Salle</label>
                            <p className="text-gray-900">{selectedCourse.schedule.room}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Horaire</label>
                            <p className="text-gray-900">
                              {selectedCourse.schedule.day} {formatTime(selectedCourse.schedule.startTime)} - {formatTime(selectedCourse.schedule.endTime)}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Élèves</label>
                            <p className="text-gray-900">{selectedCourse.students.length} élèves</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {selectedCourse.description && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                          <p className="text-gray-700">{selectedCourse.description}</p>
                        </div>
                      )}

                      {/* Objectifs */}
                      {selectedCourse.objectives && selectedCourse.objectives.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Objectifs</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedCourse.objectives.map((objective, index) => (
                              <li key={index} className="text-gray-700">{objective}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Ressources */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium text-gray-900">Ressources ({selectedCourse.resources?.length || 0})</h3>
                          <Button size="sm" variant="outline">
                            Ajouter
                          </Button>
                        </div>
                        {selectedCourse.resources && selectedCourse.resources.length > 0 ? (
                          <div className="space-y-2">
                            {selectedCourse.resources.map((resource) => (
                              <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{resource.name}</p>
                                  <p className="text-sm text-gray-600">{resource.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="text-xs">
                                    {resource.type}
                                  </Badge>
                                  <Button size="sm" variant="ghost">
                                    Voir
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">Aucune ressource ajoutée</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="text-gray-500">Sélectionnez un cours pour voir les détails</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
