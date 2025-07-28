'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Course, CourseResource } from '@/types/teacher';
import { getTeacherCourses } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export default function TeacherResources() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [courses, setCourses] = useState<Course[]>([]);
  const [allResources, setAllResources] = useState<(CourseResource & { courseName: string; courseId: string })[]>([]);
  const [filteredResources, setFilteredResources] = useState<(CourseResource & { courseName: string; courseId: string })[]>([]);
  const [selectedResource, setSelectedResource] = useState<(CourseResource & { courseName: string; courseId: string }) | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'document' as const,
    url: '',
    description: '',
    courseId: '',
    isPublic: true,
  });

  useEffect(() => {
    if (teacher?.id) {
      const teacherCourses = getTeacherCourses(teacher.id);
      setCourses(teacherCourses);
      
      // Extraire toutes les ressources de tous les cours
      const resources = teacherCourses.flatMap(course => 
        course.resources?.map(resource => ({
          ...resource,
          courseName: course.name,
          courseId: course.id,
        })) || []
      );
      setAllResources(resources);
      setFilteredResources(resources);
    }
  }, [teacher?.id]);

  useEffect(() => {
    let filtered = allResources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    if (courseFilter) {
      filtered = filtered.filter(resource => resource.courseId === courseFilter);
    }

    setFilteredResources(filtered);
  }, [allResources, searchTerm, typeFilter, courseFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTypeText = (type: CourseResource['type']) => {
    switch (type) {
      case 'document': return 'Document';
      case 'video': return 'Vidéo';
      case 'link': return 'Lien';
      case 'presentation': return 'Présentation';
      default: return type;
    }
  };

  const getTypeColor = (type: CourseResource['type']) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'link': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.url && newResource.courseId) {
      const resource: CourseResource & { courseName: string; courseId: string } = {
        id: `resource-${Date.now()}`,
        name: newResource.name,
        type: newResource.type,
        url: newResource.url,
        description: newResource.description,
        uploadedAt: new Date().toISOString(),
        isPublic: newResource.isPublic,
        courseName: courses.find(c => c.id === newResource.courseId)?.name || '',
        courseId: newResource.courseId,
      };

      setAllResources([resource, ...allResources]);
      setNewResource({
        name: '',
        type: 'document',
        url: '',
        description: '',
        courseId: '',
        isPublic: true,
      });
      setIsAddingResource(false);
    }
  };

  const courseOptions = courses.map(course => ({
    value: course.id,
    label: course.name,
  }));

  const typeOptions = [
    { value: 'document', label: 'Document' },
    { value: 'video', label: 'Vidéo' },
    { value: 'link', label: 'Lien' },
    { value: 'presentation', label: 'Présentation' },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Ressources pédagogiques</h1>
              <p className="text-gray-600">Gérez vos ressources et supports de cours</p>
            </div>
            <Button onClick={() => setIsAddingResource(true)}>
              Nouvelle ressource
            </Button>
          </div>

          {/* Formulaire d'ajout de ressource */}
          {isAddingResource && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle ressource</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la ressource
                    </label>
                    <Input
                      value={newResource.name}
                      onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nom de la ressource"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <Select
                        value={newResource.type}
                        onChange={(e) => setNewResource(prev => ({ 
                          ...prev, 
                          type: e.target.value as any 
                        }))}
                      >
                        {typeOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cours
                      </label>
                      <Select
                        value={newResource.courseId}
                        onChange={(e) => setNewResource(prev => ({ 
                          ...prev, 
                          courseId: e.target.value 
                        }))}
                      >
                        <option value="">Sélectionner un cours</option>
                        {courseOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL ou fichier
                    </label>
                    <Input
                      value={newResource.url}
                      onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="URL ou chemin du fichier"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={newResource.description}
                      onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description de la ressource..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newResource.isPublic}
                      onChange={(e) => setNewResource(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isPublic" className="text-sm text-gray-700">
                      Ressource publique (visible par les élèves)
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddResource}>
                      Ajouter
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingResource(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Tous les types</option>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
            <div className="w-48">
              <Select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">Tous les cours</option>
                {courseOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des ressources */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources ({filteredResources.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedResource?.id === resource.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedResource(resource)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{resource.name}</h3>
                          <Badge className={getTypeColor(resource.type)}>
                            {getTypeText(resource.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{resource.courseName}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{formatDate(resource.uploadedAt)}</span>
                          <Badge 
                            variant="default" 
                            className={resource.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {resource.isPublic ? 'Public' : 'Privé'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails de la ressource */}
            <div className="lg:col-span-2">
              {selectedResource ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedResource.name}</CardTitle>
                        <p className="text-gray-600 mt-1">{selectedResource.courseName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button size="sm">
                          Voir
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
                            <label className="text-sm font-medium text-gray-700">Type</label>
                            <Badge className={getTypeColor(selectedResource.type)}>
                              {getTypeText(selectedResource.type)}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Visibilité</label>
                            <Badge 
                              variant="default" 
                              className={selectedResource.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {selectedResource.isPublic ? 'Public' : 'Privé'}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Ajouté le</label>
                            <p className="text-gray-900">{formatDate(selectedResource.uploadedAt)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Cours</label>
                            <p className="text-gray-900">{selectedResource.courseName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {selectedResource.description && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                          <p className="text-gray-700">{selectedResource.description}</p>
                        </div>
                      )}

                      {/* URL */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Lien</h3>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-blue-600 break-all">{selectedResource.url}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Actions</h3>
                        <div className="flex gap-2">
                          <Button>
                            Télécharger
                          </Button>
                          <Button variant="outline">
                            Partager
                          </Button>
                          <Button variant="outline">
                            Copier le lien
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="text-gray-500">Sélectionnez une ressource pour voir les détails</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{allResources.length}</div>
                  <div className="text-sm text-gray-600">Total des ressources</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {allResources.filter(r => r.isPublic).length}
                  </div>
                  <div className="text-sm text-gray-600">Ressources publiques</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(allResources.map(r => r.type)).size}
                  </div>
                  <div className="text-sm text-gray-600">Types de ressources</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {new Set(allResources.map(r => r.courseId)).size}
                  </div>
                  <div className="text-sm text-gray-600">Cours concernés</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
