'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getStudentWorkGroups, getWorkGroupsCreatedByStudent } from '@/data/mock-workgroups';
import { WorkGroup } from '@/types/workgroups';
import { Student } from '@/types/user';

interface WorkGroupStatsProps {
  studentId: string;
}

export function WorkGroupStats({ studentId }: WorkGroupStatsProps) {
  const { user } = useAuth();
  const student = user as Student;
  const [myWorkGroups, setMyWorkGroups] = useState<WorkGroup[]>([]);
  const [createdWorkGroups, setCreatedWorkGroups] = useState<WorkGroup[]>([]);

  useEffect(() => {
    if (student) {
      const studentGroups = getStudentWorkGroups(studentId);
      const createdGroups = getWorkGroupsCreatedByStudent(studentId);
      
      setMyWorkGroups(studentGroups);
      setCreatedWorkGroups(createdGroups);
    }
  }, [student, studentId]);

  const totalMembers = myWorkGroups.reduce((sum, group) => sum + group.currentMembers, 0);
  const activeGroups = myWorkGroups.filter(group => group.isActive).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Groupes de travail</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{myWorkGroups.length}</div>
            <div className="text-sm text-gray-600">Groupes rejoints</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{createdWorkGroups.length}</div>
            <div className="text-sm text-gray-600">Groupes créés</div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Groupes actifs</span>
            <Badge variant="default">{activeGroups}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total membres</span>
            <Badge variant="default">{totalMembers}</Badge>
          </div>
        </div>

        {myWorkGroups.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Mes groupes récents</h4>
            <div className="space-y-2">
              {myWorkGroups.slice(0, 3).map((group) => (
                <div key={group.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate">{group.name}</span>
                  <Badge 
                    variant="default" 
                    className="text-xs"
                  >
                    {group.currentMembers}/{group.maxMembers}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t">
          <a 
            href="/student/workgroups" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Voir tous mes groupes →
          </a>
        </div>
      </CardContent>
    </Card>
  );
} 