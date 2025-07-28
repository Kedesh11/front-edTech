'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { 
  getTeacherCourses, 
  getTeacherAssignments, 
  mockTeacherStatistics,
  getTodayClasses,
  getPendingAssignments
} from '@/data/mock-teacher';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [todayClasses, setTodayClasses] = useState<any[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);

  useEffect(() => {
    if (teacher?.id) {
      setCourses(getTeacherCourses(teacher.id));
      setAssignments(getTeacherAssignments(teacher.id));
      setTodayClasses(getTodayClasses(teacher.id));
      setPendingAssignments(getPendingAssignments(teacher.id));
    }
  }, [teacher?.id]);

  const stats = mockTeacherStatistics;

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
          {/* Onglets */}
          {/* Supprimer tout ce qui concerne activeTab, setActiveTab, les boutons d'onglet, et le rendu conditionnel lié à ces variables. */}
          {/* Garde uniquement le contenu principal du dashboard (Tableau de bord). */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte des classes du jour */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cours d&apos;aujourd&apos;hui</h2>
              <div className="space-y-3">
                {todayClasses.length > 0 ? (
                  todayClasses.map((course) => (
                    <div key={course.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-medium text-blue-800">{course.name}</div>
                      <div className="text-sm text-blue-600 mt-1">
                        {course.schedule.startTime} - {course.schedule.endTime} • {course.schedule.room}
                      </div>
                      <div className="text-sm text-blue-600">{course.students.length} élèves</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-gray-600">Aucun cours aujourd&apos;hui</div>
                  </div>
                )}
              </div>
            </div>

            {/* Carte des devoirs à corriger */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Devoirs à corriger</h2>
              <div className="space-y-3">
                {pendingAssignments.length > 0 ? (
                  pendingAssignments.map((assignment) => {
                    const pendingSubmissions = assignment.submissions.filter(
                      (sub: any) => sub.status === 'submitted'
                    );
                    return (
                      <div key={assignment.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-orange-800">{assignment.title}</div>
                        <div className="text-sm text-orange-600 mt-1">
                          {assignment.className} • {pendingSubmissions.length} copies
                        </div>
                        <div className="text-sm text-red-600">
                          Date limite : {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-gray-600">Aucun devoir à corriger</div>
                  </div>
                )}
              </div>
            </div>

            {/* Carte des alertes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertes</h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-medium text-red-800">Absence prolongée</div>
                  <div className="text-sm text-red-600 mt-1">Marie Dupont - 5 jours</div>
                  <div className="text-xs text-red-500">À contacter</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Réunion pédagogique</div>
                  <div className="text-sm text-blue-600 mt-1">Demain 14h00</div>
                  <div className="text-xs text-blue-500">Salle des profs</div>
                </div>
              </div>
            </div>

            {/* Carte des statistiques */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Moyenne générale</span>
                  <span className="font-semibold text-green-600">{stats.averageGrade.toFixed(1)}/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de présence</span>
                  <span className="font-semibold text-blue-600">{stats.attendanceRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Devoirs rendus</span>
                  <span className="font-semibold text-orange-600">{stats.assignmentCompletionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total élèves</span>
                  <span className="font-semibold text-purple-600">{stats.totalStudents}</span>
                </div>
              </div>
            </div>

            {/* Carte des prochains événements */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Prochains événements</h2>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-800">Conseil de classe</div>
                  <div className="text-sm text-purple-600">1ère A • Vendredi 15h00</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="font-medium text-indigo-800">Formation continue</div>
                  <div className="text-sm text-indigo-600">Lundi • 9h00-12h00</div>
                </div>
              </div>
            </div>

            {/* Carte des ressources */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ressources récentes</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-800">Support cours intégrales</div>
                  <div className="text-sm text-gray-600">Ajouté hier</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-800">Exercices circuits</div>
                  <div className="text-sm text-gray-600">Ajouté il y a 2 jours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
