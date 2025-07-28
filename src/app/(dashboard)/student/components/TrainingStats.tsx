'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrainingEnrollment } from '@/types/content';
import { getStudentEnrollments } from '@/data/mock-trainings';

interface TrainingStatsProps {
  studentId: string;
}

export function TrainingStats({ studentId }: TrainingStatsProps) {
  const enrollments = getStudentEnrollments(studentId);
  
  const totalEnrollments = enrollments.length;
  const completedTrainings = enrollments.filter(e => e.status === 'completed').length;
  const ongoingTrainings = enrollments.filter(e => e.status === 'attending').length;
  const averageProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Mes formations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalEnrollments}</div>
            <div className="text-sm text-gray-600">Total inscrit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTrainings}</div>
            <div className="text-sm text-gray-600">Terminées</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{ongoingTrainings}</div>
            <div className="text-sm text-gray-600">En cours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{averageProgress}%</div>
            <div className="text-sm text-gray-600">Progression</div>
          </div>
        </div>
        
        {enrollments.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Formations récentes</h4>
            <div className="space-y-2">
              {enrollments.slice(0, 3).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Formation #{enrollment.trainingId.slice(-3)}</span>
                  <Badge 
                    variant={enrollment.status === 'completed' ? 'success' : 
                           enrollment.status === 'attending' ? 'info' : 'default'}
                    size="sm"
                  >
                    {enrollment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 