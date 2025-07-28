'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Grade, Course } from '@/types/teacher';
import { getTeacherGrades, getTeacherCourses } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function TeacherGrades() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [grades, setGrades] = useState<Grade[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredGrades, setFilteredGrades] = useState<Grade[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (teacher?.id) {
      const teacherGrades = getTeacherGrades(teacher.id);
      const teacherCourses = getTeacherCourses(teacher.id);
      setGrades(teacherGrades);
      setCourses(teacherCourses);
      setFilteredGrades(teacherGrades);
    }
  }, [teacher?.id]);

  useEffect(() => {
    let filtered = grades;

    if (searchTerm) {
      filtered = filtered.filter(grade =>
        grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(grade => grade.courseId === selectedCourse);
    }

    if (selectedType) {
      filtered = filtered.filter(grade => grade.type === selectedType);
    }

    setFilteredGrades(filtered);
  }, [grades, searchTerm, selectedCourse, selectedType]);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeStatus = (percentage: number) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Bien';
    if (percentage >= 40) return 'Moyen';
    return 'Insuffisant';
  };

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return total / grades.length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const courseOptions = courses.map(course => ({
    value: course.id,
    label: course.name,
  }));

  const typeOptions = [
    { value: 'assignment', label: 'Devoir' },
    { value: 'exam', label: 'Examen' },
    { value: 'participation', label: 'Participation' },
    { value: 'bonus', label: 'Bonus' },
  ];

  const averageGrade = calculateAverage(filteredGrades);
  const totalGrades = filteredGrades.length;

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
              <h1 className="text-2xl font-bold text-gray-900">Notes & Évaluations</h1>
              <p className="text-gray-600">Gérez les notes de vos élèves</p>
            </div>
            <Button onClick={() => console.log('Nouvelle note')}>
              Nouvelle note
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{averageGrade.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Moyenne générale</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{totalGrades}</div>
                  <div className="text-sm text-gray-600">Total des notes</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{courses.length}</div>
                  <div className="text-sm text-gray-600">Cours concernés</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un élève ou un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Tous les cours</option>
                {courseOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
            <div className="w-48">
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tous les types</option>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Liste des notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes ({filteredGrades.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Élève</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Cours</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Devoir</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Note</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Pourcentage</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGrades.map((grade) => (
                      <tr key={grade.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{grade.studentName}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-700">{grade.courseName}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-700">
                            {grade.assignmentName || '-'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`font-bold ${getGradeColor(grade.percentage)}`}>
                            {grade.grade}/{grade.maxGrade}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getGradeColor(grade.percentage)}`}>
                              {grade.percentage}%
                            </span>
                            <Badge 
                              variant="default" 
                              className={
                                grade.percentage >= 80 ? 'bg-green-100 text-green-800' :
                                grade.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {getGradeStatus(grade.percentage)}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            {grade.type === 'assignment' && 'Devoir'}
                            {grade.type === 'exam' && 'Examen'}
                            {grade.type === 'participation' && 'Participation'}
                            {grade.type === 'bonus' && 'Bonus'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600">
                            {formatDate(grade.recordedAt)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Modifier
                            </Button>
                            <Button size="sm" variant="ghost">
                              Voir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredGrades.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune note trouvée</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Graphiques de performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Excellent (≥80%)</span>
                    <span className="font-medium text-green-600">
                      {filteredGrades.filter(g => g.percentage >= 80).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(filteredGrades.filter(g => g.percentage >= 80).length / Math.max(filteredGrades.length, 1)) * 100}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bien (60-79%)</span>
                    <span className="font-medium text-yellow-600">
                      {filteredGrades.filter(g => g.percentage >= 60 && g.percentage < 80).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(filteredGrades.filter(g => g.percentage >= 60 && g.percentage < 80).length / Math.max(filteredGrades.length, 1)) * 100}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Moyen (40-59%)</span>
                    <span className="font-medium text-orange-600">
                      {filteredGrades.filter(g => g.percentage >= 40 && g.percentage < 60).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(filteredGrades.filter(g => g.percentage >= 40 && g.percentage < 60).length / Math.max(filteredGrades.length, 1)) * 100}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Insuffisant (&lt;40%)</span>
                    <span className="font-medium text-red-600">
                      {filteredGrades.filter(g => g.percentage < 40).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(filteredGrades.filter(g => g.percentage < 40).length / Math.max(filteredGrades.length, 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance par cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map(course => {
                    const courseGrades = filteredGrades.filter(g => g.courseId === course.id);
                    const courseAverage = calculateAverage(courseGrades);
                    
                    return (
                      <div key={course.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-600">{courseGrades.length} notes</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${getGradeColor((courseAverage / 20) * 100)}`}>
                            {courseAverage.toFixed(1)}/20
                          </p>
                          <p className="text-sm text-gray-600">
                            {((courseAverage / 20) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
