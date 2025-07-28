'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AIConversation } from '@/types/ai-agents';
import { getStudentConversations, getActiveExamSession, getActiveHomeworkSession } from '@/data/mock-ai-agents';
import { Student } from '@/types/user';

interface AIAssistantStatsProps {
  studentId: string;
}

export function AIAssistantStats({ studentId }: AIAssistantStatsProps) {
  const { user } = useAuth();
  const student = user as Student;
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [activeExamSession, setActiveExamSession] = useState(getActiveExamSession(studentId));
  const [activeHomeworkSession, setActiveHomeworkSession] = useState(getActiveHomeworkSession(studentId));

  useEffect(() => {
    setConversations(getStudentConversations(studentId));
  }, [studentId]);

  const totalConversations = conversations.length;
  const activeConversations = conversations.filter(conv => conv.isActive).length;
  const averageRating = conversations.length > 0 
    ? conversations.reduce((sum, conv) => sum + (conv.rating || 0), 0) / conversations.length 
    : 0;
  const isRestricted = !!activeExamSession || !!activeHomeworkSession;

  const recentConversations = conversations
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Assistants IA</span>
          {isRestricted && (
            <Badge variant="default" className="bg-red-100 text-red-800 text-xs">
              Restreint
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {totalConversations}
            </div>
            <div className="text-sm text-gray-600">Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
        </div>

        {isRestricted && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              {activeExamSession 
                ? "Les agents IA sont désactivés pendant les examens"
                : "Les agents IA sont désactivés pendant les devoirs"
              }
            </p>
          </div>
        )}

        {recentConversations.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium text-gray-700">Conversations récentes</h4>
            {recentConversations.map(conversation => (
              <div key={conversation.id} className="flex items-center justify-between text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {conversation.topic}
                  </p>
                  <p className="text-gray-500 truncate">
                    {conversation.subject}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {conversation.rating && (
                    <span className="text-yellow-600">⭐ {conversation.rating}</span>
                  )}
                  <Badge variant="default" className={conversation.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {conversation.isActive ? 'Active' : 'Terminée'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={() => window.location.href = '/student/ai-assistants'}
          disabled={isRestricted}
          className="w-full"
        >
          {isRestricted ? 'Agents temporairement indisponibles' : 'Consulter les assistants'}
        </Button>
      </CardContent>
    </Card>
  );
} 