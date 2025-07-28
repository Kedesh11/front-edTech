'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAnnouncementsByAudience } from '@/data/mock-announcements';

export function RecentAnnouncements() {
  const announcements = getAnnouncementsByAudience('student');
  const recentAnnouncements = announcements
    .filter(ann => !ann.isRead)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V4a1 1 0 00-1-1H5a1 1 0 00-1 1v1zM4 11h6v-2H4v2zM14 5h6V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1zM14 11h6v-2h-6v2zM14 17h6v-2h-6v2z" />
          </svg>
          Annonces récentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentAnnouncements.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Aucune nouvelle annonce</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                    {announcement.title}
                  </h4>
                  <Badge 
                    variant={getPriorityColor(announcement.priority)}
                    size="sm"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{announcement.author.name}</span>
                  <span>{formatDate(announcement.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {announcements.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <a 
              href="/student/announcements" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir toutes les annonces →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 