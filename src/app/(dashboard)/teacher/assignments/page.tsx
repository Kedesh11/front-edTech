'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Form } from '@/components/shared/forms/Form';
import { FormField } from '@/components/shared/forms/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  submissionsCount: number;
  totalStudents: number;
  type: 'homework' | 'project' | 'quiz';
  description: string;
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Exercices Chapitre 3',
    subject: 'Mathématiques',
    class: '1ère A',
    dueDate: '2025-07-29',
    status: 'pending',
    submissionsCount: 15,
    totalStudents: 32,
    type: 'homework',
    description: 'Exercices 1 à 5 du chapitre sur les fonctions.'
  },
  {
    id: '2',
    title: 'TP Forces et Mouvement',
    subject: 'Physique',
    class: 'Term B',
    dueDate: '2025-07-27',
    status: 'submitted',
    submissionsCount: 28,
    totalStudents: 28,
    type: 'project',
    description: 'Compte rendu du TP sur les forces et le mouvement.'
  },
  {
    id: '3',
    title: 'Contrôle Continu 2',
    subject: 'Mathématiques',
    class: '2nde C',
    dueDate: '2025-07-26',
    status: 'graded',
    submissionsCount: 35,
    totalStudents: 35,
    type: 'quiz',
    description: 'Contrôle sur les équations du second degré.'
  }
];

export default function TeacherAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    class: '',
    dueDate: '',
    type: '',
    description: ''
  });

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      subject: 'Mathématiques', // À adapter selon le contexte
      class: newAssignment.class,
      dueDate: newAssignment.dueDate,
      status: 'pending',
      submissionsCount: 0,
      totalStudents: 30,
      type: newAssignment.type as 'homework' | 'project' | 'quiz',
      description: newAssignment.description
    };
    setAssignments([...assignments, assignment]);
    setNewAssignment({
      title: '',
      class: '',
      dueDate: '',
      type: '',
      description: ''
    });
    setIsAddingAssignment(false);
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'submitted':
        return 'text-blue-700 bg-blue-50';
      case 'graded':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'En cours';
      case 'submitted':
        return 'Soumis';
      case 'graded':
        return 'Noté';
      default:
        return status;
    }
  };

  const formFields: FormField[] = [
    {
      name: 'title',
      label: 'Titre du devoir',
      type: 'text',
      required: true,
      placeholder: 'Ex: Exercices sur les équations',
      value: newAssignment.title,
      onChange: (value) => setNewAssignment(prev => ({ ...prev, title: value }))
    },
    {
      name: 'class',
      label: 'Classe',
      type: 'select',
      required: true,
      options: [
        { value: '1ère A', label: '1ère A' },
        { value: '1ère B', label: '1ère B' },
        { value: 'Term A', label: 'Terminale A' },
        { value: 'Term B', label: 'Terminale B' }
      ],
      value: newAssignment.class,
      onChange: (value) => setNewAssignment(prev => ({ ...prev, class: value }))
    },
    {
      name: 'dueDate',
      label: 'Date limite',
      type: 'date',
      required: true,
      value: newAssignment.dueDate,
      onChange: (value) => setNewAssignment(prev => ({ ...prev, dueDate: value }))
    },
    {
      name: 'type',
      label: 'Type de devoir',
      type: 'select',
      required: true,
      options: [
        { value: 'homework', label: 'Devoir maison' },
        { value: 'project', label: 'Projet' },
        { value: 'quiz', label: 'Contrôle' }
      ],
      value: newAssignment.type,
      onChange: (value) => setNewAssignment(prev => ({ ...prev, type: value }))
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Description détaillée du devoir...',
      value: newAssignment.description,
      onChange: (value) => setNewAssignment(prev => ({ ...prev, description: value }))
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedStatus && assignment.status !== selectedStatus) return false;
    if (selectedClass && assignment.class !== selectedClass) return false;
    return true;
  });

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
              <h1 className="text-3xl font-bold text-black mb-2">
                Gestion des devoirs
              </h1>
              <p className="text-lg text-gray-900">
                Créez, gérez et suivez les devoirs de vos classes.
              </p>
            </div>
          </div>

          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="pending">En cours</option>
                <option value="submitted">Soumis</option>
                <option value="graded">Noté</option>
              </Select>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les classes</option>
                <option value="1ère A">1ère A</option>
                <option value="1ère B">1ère B</option>
                <option value="Term A">Terminale A</option>
                <option value="Term B">Terminale B</option>
                <option value="2nde C">2nde C</option>
              </Select>
            </div>
            <Button
              onClick={() => setIsAddingAssignment(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouveau devoir
            </Button>
          </div>

          {/* Add Assignment Form */}
          {isAddingAssignment && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau devoir</h3>
              <Form
                fields={formFields}
                onSubmit={handleAddAssignment}
                submitLabel="Créer le devoir"
                onCancel={() => setIsAddingAssignment(false)}
              />
            </div>
          )}

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>📚 {assignment.subject}</span>
                      <span>👥 {assignment.class}</span>
                      <span>📅 {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}</span>
                      <span>📝 {assignment.submissionsCount}/{assignment.totalStudents} rendus</span>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col gap-2">
                    <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Voir détails
                    </Button>
                    {assignment.status === 'submitted' && (
                      <Button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Noter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
