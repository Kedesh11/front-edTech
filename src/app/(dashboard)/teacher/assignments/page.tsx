'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Assignment, getAssignmentStatusColor } from '@/types/teacher';
import { getTeacherAssignments, getPendingAssignments } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function TeacherAssignments() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (teacher?.id) {
      const teacherAssignments = getTeacherAssignments(teacher.id);
      setAssignments(teacherAssignments);
      setFilteredAssignments(teacherAssignments);
    }
  }, [teacher?.id]);

  useEffect(() => {
    let filtered = assignments;

    if (searchTerm) {
      filtered = filtered.filter(assignment =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(assignment => assignment.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(assignment => assignment.type === typeFilter);
    }

    setFilteredAssignments(filtered);
  }, [assignments, searchTerm, statusFilter, typeFilter]);

  const getSubmissionStats = (assignment: Assignment) => {
    const total = assignment.submissions.length;
    const submitted = assignment.submissions.filter(sub => sub.status === 'submitted').length;
    const graded = assignment.submissions.filter(sub => sub.status === 'graded').length;
    const late = assignment.submissions.filter(sub => sub.status === 'late').length;
    const missing = assignment.submissions.filter(sub => sub.status === 'missing').length;

    return { total, submitted, graded, late, missing };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
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
              <h1 className="text-2xl font-bold text-gray-900">Devoirs</h1>
              <p className="text-gray-600">Gérez vos devoirs et évaluations</p>
            </div>
            <Button onClick={() => console.log('Nouveau devoir')}>
              Nouveau devoir
            </Button>
          </div>

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un devoir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Tous les statuts</option>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="graded">Noté</option>
                <option value="archived">Archivé</option>
              </Select>
            </div>
            <div className="w-48">
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Tous les types</option>
                <option value="homework">Devoir maison</option>
                <option value="exam">Contrôle</option>
                <option value="project">Projet</option>
                <option value="quiz">Quiz</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des devoirs */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Devoirs ({filteredAssignments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredAssignments.map((assignment) => {
                      const stats = getSubmissionStats(assignment);
                      const overdue = isOverdue(assignment.dueDate);
                      
                      return (
                        <div
                          key={assignment.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedAssignment?.id === assignment.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${overdue ? 'border-red-200 bg-red-50' : ''}`}
                          onClick={() => setSelectedAssignment(assignment)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <Badge className={getAssignmentStatusColor(assignment.status)}>
                              {assignment.status === 'draft' && 'Brouillon'}
                              {assignment.status === 'published' && 'Publié'}
                              {assignment.status === 'graded' && 'Noté'}
                              {assignment.status === 'archived' && 'Archivé'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{assignment.className}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                            <span>{assignment.type}</span>
                            <span className={overdue ? 'text-red-600 font-medium' : ''}>
                              {formatDate(assignment.dueDate)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-blue-600">{stats.submitted}/{stats.total} rendus</span>
                            <span className="text-green-600">{stats.graded} notés</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails du devoir */}
            <div className="lg:col-span-2">
              {selectedAssignment ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedAssignment.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{selectedAssignment.className}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button size="sm">
                          Noter
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
                            <p className="text-gray-900">{selectedAssignment.type}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Note maximale</label>
                            <p className="text-gray-900">{selectedAssignment.maxGrade}/20</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Date limite</label>
                            <p className={`text-gray-900 ${isOverdue(selectedAssignment.dueDate) ? 'text-red-600' : ''}`}>
                              {formatDate(selectedAssignment.dueDate)}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Statut</label>
                            <Badge className={getAssignmentStatusColor(selectedAssignment.status)}>
                              {selectedAssignment.status === 'draft' && 'Brouillon'}
                              {selectedAssignment.status === 'published' && 'Publié'}
                              {selectedAssignment.status === 'graded' && 'Noté'}
                              {selectedAssignment.status === 'archived' && 'Archivé'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700">{selectedAssignment.description}</p>
                      </div>

                      {/* Statistiques des rendus */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Statistiques des rendus</h3>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {getSubmissionStats(selectedAssignment).total}
                            </div>
                            <div className="text-sm text-gray-600">Total</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {getSubmissionStats(selectedAssignment).submitted}
                            </div>
                            <div className="text-sm text-gray-600">Rendus</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">
                              {getSubmissionStats(selectedAssignment).graded}
                            </div>
                            <div className="text-sm text-gray-600">Notés</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                              {getSubmissionStats(selectedAssignment).missing}
                            </div>
                            <div className="text-sm text-gray-600">Manquants</div>
                          </div>
                        </div>
                      </div>

                      {/* Critères de notation */}
                      {selectedAssignment.criteria && selectedAssignment.criteria.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Critères de notation</h3>
                          <div className="space-y-2">
                            {selectedAssignment.criteria.map((criteria) => (
                              <div key={criteria.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{criteria.name}</p>
                                  <p className="text-sm text-gray-600">{criteria.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">{criteria.maxPoints} pts</p>
                                  <p className="text-sm text-gray-600">{criteria.weight}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Liste des rendus */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Rendus des élèves</h3>
                        <div className="space-y-2">
                          {selectedAssignment.submissions.map((submission) => (
                            <div key={submission.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{submission.studentName}</p>
                                <p className="text-sm text-gray-600">
                                  Rendu le {formatDate(submission.submittedAt)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="default" 
                                  className={
                                    submission.status === 'graded' ? 'bg-green-100 text-green-800' :
                                    submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                    submission.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {submission.status === 'graded' && 'Noté'}
                                  {submission.status === 'submitted' && 'Rendu'}
                                  {submission.status === 'late' && 'En retard'}
                                  {submission.status === 'missing' && 'Manquant'}
                                </Badge>
                                {submission.grade && (
                                  <span className="font-medium text-gray-900">
                                    {submission.grade}/{selectedAssignment.maxGrade}
                                  </span>
                                )}
                                <Button size="sm" variant="outline">
                                  {submission.status === 'graded' ? 'Voir' : 'Noter'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="text-gray-500">Sélectionnez un devoir pour voir les détails</p>
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
