'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Form } from '@/components/shared/forms/Form';
import { FormField } from '@/components/shared/forms/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Grade {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  date: string;
  comments: string;
  class: string;
}

const mockGrades: Grade[] = [
  {
    id: '1',
    studentName: 'Marie Dupont',
    studentId: 'STU001',
    subject: 'Mathématiques',
    assignment: 'Contrôle Chapitre 3',
    grade: 16,
    maxGrade: 20,
    date: '2025-07-25',
    comments: 'Excellent travail, bonne compréhension des concepts',
    class: '1ère A'
  },
  {
    id: '2',
    studentName: 'Pierre Martin',
    studentId: 'STU002',
    subject: 'Mathématiques',
    assignment: 'Contrôle Chapitre 3',
    grade: 12,
    maxGrade: 20,
    date: '2025-07-25',
    comments: 'Quelques erreurs de calcul, mais bonne démarche',
    class: '1ère A'
  },
  {
    id: '3',
    studentName: 'Sophie Bernard',
    studentId: 'STU003',
    subject: 'Physique',
    assignment: 'TP Forces et Mouvement',
    grade: 18,
    maxGrade: 20,
    date: '2025-07-24',
    comments: 'Rapport très bien structuré, expérimentation rigoureuse',
    class: 'Terminale B'
  }
];

export default function TeacherGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isAddingGrade, setIsAddingGrade] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentName: '',
    subject: '',
    assignment: '',
    grade: '',
    maxGrade: '20',
    comments: '',
    class: ''
  });

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const grade: Grade = {
      id: Date.now().toString(),
      studentName: newGrade.studentName,
      studentId: 'STU' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      subject: newGrade.subject,
      assignment: newGrade.assignment,
      grade: parseFloat(newGrade.grade),
      maxGrade: parseFloat(newGrade.maxGrade),
      date: new Date().toISOString().split('T')[0],
      comments: newGrade.comments,
      class: newGrade.class
    };
    setGrades([...grades, grade]);
    setNewGrade({
      studentName: '',
      subject: '',
      assignment: '',
      grade: '',
      maxGrade: '20',
      comments: '',
      class: ''
    });
    setIsAddingGrade(false);
  };

  const formFields: FormField[] = [
    {
      name: 'studentName',
      label: 'Nom de l\'élève',
      type: 'text',
      required: true,
      placeholder: 'Ex: Jean Dupont',
      value: newGrade.studentName,
      onChange: (value) => setNewGrade(prev => ({ ...prev, studentName: value }))
    },
    {
      name: 'subject',
      label: 'Matière',
      type: 'select',
      required: true,
      options: [
        { value: 'Mathématiques', label: 'Mathématiques' },
        { value: 'Physique', label: 'Physique' },
        { value: 'Français', label: 'Français' },
        { value: 'Histoire', label: 'Histoire' },
        { value: 'Anglais', label: 'Anglais' }
      ],
      value: newGrade.subject,
      onChange: (value) => setNewGrade(prev => ({ ...prev, subject: value }))
    },
    {
      name: 'assignment',
      label: 'Devoir/Contrôle',
      type: 'text',
      required: true,
      placeholder: 'Ex: Contrôle Chapitre 3',
      value: newGrade.assignment,
      onChange: (value) => setNewGrade(prev => ({ ...prev, assignment: value }))
    },
    {
      name: 'grade',
      label: 'Note',
      type: 'number',
      required: true,
      placeholder: 'Ex: 15',
      value: newGrade.grade,
      onChange: (value) => setNewGrade(prev => ({ ...prev, grade: value }))
    },
    {
      name: 'maxGrade',
      label: 'Note maximale',
      type: 'number',
      required: true,
      placeholder: 'Ex: 20',
      value: newGrade.maxGrade,
      onChange: (value) => setNewGrade(prev => ({ ...prev, maxGrade: value }))
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
      value: newGrade.class,
      onChange: (value) => setNewGrade(prev => ({ ...prev, class: value }))
    },
    {
      name: 'comments',
      label: 'Commentaires',
      type: 'textarea',
      required: false,
      placeholder: 'Commentaires optionnels...',
      value: newGrade.comments,
      onChange: (value) => setNewGrade(prev => ({ ...prev, comments: value }))
    }
  ];

  const filteredGrades = grades.filter(grade => {
    if (selectedSubject && grade.subject !== selectedSubject) return false;
    if (selectedClass && grade.class !== selectedClass) return false;
    return true;
  });

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Notes & Évaluations
              </h1>
              <p className="text-lg text-gray-600">
                Gérez les notes de vos élèves et suivez leur progression académique.
              </p>
            </div>
          </div>

          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les matières</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Physique">Physique</option>
                <option value="Chimie">Chimie</option>
                <option value="Histoire">Histoire</option>
                <option value="Français">Français</option>
              </select>
              <select
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
              </select>
            </div>
            <button
              onClick={() => setIsAddingGrade(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouvelle note
            </button>
          </div>

          {/* Add Grade Form */}
          {isAddingGrade && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvelle note</h3>
              <Form
                fields={formFields}
                onSubmit={handleAddGrade}
                submitLabel="Ajouter la note"
                onCancel={() => setIsAddingGrade(false)}
              />
            </div>
          )}

          {/* Grades List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notes récentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Élève
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matière
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Devoir
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {grade.studentName}
                          </div>
                          <div className="text-sm text-gray-500">{grade.class}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.assignment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                          {grade.grade}/{grade.maxGrade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(grade.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
