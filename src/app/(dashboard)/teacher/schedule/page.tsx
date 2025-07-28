'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Course, ClassSchedule } from '@/types/teacher';
import { getTeacherCourses } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';

export default function TeacherSchedule() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  useEffect(() => {
    if (teacher?.id) {
      const teacherCourses = getTeacherCourses(teacher.id);
      setCourses(teacherCourses);
    }
  }, [teacher?.id]);

  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCoursesForDay = (day: string) => {
    return courses.filter(course => course.schedule.day === day);
  };

  const getCourseAtTime = (day: string, time: string) => {
    const dayCourses = getCoursesForDay(day);
    return dayCourses.find(course => {
      const startTime = course.schedule.startTime;
      const endTime = course.schedule.endTime;
      return time >= startTime && time < endTime;
    });
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  };

  useEffect(() => {
    setSelectedWeek(getCurrentWeek());
  }, []);

  const getWeekDates = (weekNumber: number) => {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const startOfWeek = new Date(startOfYear);
    startOfWeek.setDate(startOfYear.getDate() + (weekNumber - 1) * 7);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const today = new Date().toDateString();

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
              <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>
              <p className="text-gray-600">Consultez votre planning de cours</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedWeek(selectedWeek - 1)}>
                Semaine précédente
              </Button>
              <Button variant="outline" onClick={() => setSelectedWeek(selectedWeek + 1)}>
                Semaine suivante
              </Button>
            </div>
          </div>

          {/* Sélecteur de semaine */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Semaine :</span>
                  <Select
                    value={selectedWeek.toString()}
                    onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 52 }, (_, i) => i + 1).map(week => (
                      <option key={week} value={week}>
                        Semaine {week}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="text-sm text-gray-600">
                  {weekDates[0].toLocaleDateString('fr-FR')} - {weekDates[6].toLocaleDateString('fr-FR')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emploi du temps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vue hebdomadaire */}
            <Card>
              <CardHeader>
                <CardTitle>Vue hebdomadaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 font-medium text-gray-700 w-16">Heure</th>
                        {daysOfWeek.map((day, index) => (
                          <th 
                            key={day} 
                            className={`text-center py-2 px-2 font-medium text-gray-700 ${
                              weekDates[index]?.toDateString() === today ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="text-sm font-medium">{day}</div>
                            <div className="text-xs text-gray-500">
                              {weekDates[index]?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time} className="border-b border-gray-100">
                          <td className="py-2 px-2 text-sm text-gray-600 font-medium">
                            {formatTime(time)}
                          </td>
                          {daysOfWeek.map((day) => {
                            const course = getCourseAtTime(day, time);
                            return (
                              <td key={day} className="py-2 px-2">
                                {course ? (
                                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="text-sm font-medium text-blue-900">
                                      {course.name}
                                    </div>
                                    <div className="text-xs text-blue-700">
                                      {course.schedule.room}
                                    </div>
                                    <div className="text-xs text-blue-600">
                                      {formatTime(course.schedule.startTime)} - {formatTime(course.schedule.endTime)}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-16"></div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Vue journalière */}
            <Card>
              <CardHeader>
                <CardTitle>Vue journalière - {selectedDay}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getCoursesForDay(selectedDay).length > 0 ? (
                    getCoursesForDay(selectedDay).map((course) => (
                      <div key={course.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-blue-900">{course.name}</h3>
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            {course.subject}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-blue-700 font-medium">Horaire :</span>
                            <p className="text-blue-600">
                              {formatTime(course.schedule.startTime)} - {formatTime(course.schedule.endTime)}
                            </p>
                          </div>
                          <div>
                            <span className="text-blue-700 font-medium">Salle :</span>
                            <p className="text-blue-600">{course.schedule.room}</p>
                          </div>
                          <div>
                            <span className="text-blue-700 font-medium">Classe :</span>
                            <p className="text-blue-600">{course.className}</p>
                          </div>
                          <div>
                            <span className="text-blue-700 font-medium">Élèves :</span>
                            <p className="text-blue-600">{course.students.length} élèves</p>
                          </div>
                        </div>
                        {course.description && (
                          <div className="mt-3">
                            <span className="text-blue-700 font-medium">Description :</span>
                            <p className="text-blue-600 text-sm mt-1">{course.description}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun cours programmé ce jour</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sélecteur de jour pour la vue journalière */}
          <Card>
            <CardHeader>
              <CardTitle>Sélectionner un jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {daysOfWeek.map((day) => (
                                     <Button
                     key={day}
                     variant={selectedDay === day ? 'primary' : 'outline'}
                     onClick={() => setSelectedDay(day)}
                     className="flex-1"
                   >
                    {day}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{courses.length}</div>
                  <div className="text-sm text-gray-600">Total des cours</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {courses.reduce((total, course) => total + course.students.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total des élèves</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(courses.map(course => course.subject)).size}
                  </div>
                  <div className="text-sm text-gray-600">Matières enseignées</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {new Set(courses.map(course => course.className)).size}
                  </div>
                  <div className="text-sm text-gray-600">Classes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
