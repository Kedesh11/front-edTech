'use client';

import { useEffect, useState } from 'react';
import { Admin } from '@/mock/types';
import DashboardLayout from '@/components/shared/dashboard/DashboardLayout';
import { Sidebar } from '@/components/shared/dashboard/Sidebar';
import {
  DashboardIcon,
  AnnouncementsIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
  SettingsIcon,
} from '@/components/shared/dashboard/icons';
import { Input } from '@/components/ui/Input';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  category: 'system' | 'security' | 'user' | 'academic';
  message: string;
  details: string;
  user?: string;
  ip?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2025-07-26T10:15:00',
    level: 'error',
    category: 'security',
    message: 'Tentative de connexion échouée',
    details: 'Multiple failed login attempts detected',
    ip: '192.168.1.100',
  },
  {
    id: '2',
    timestamp: '2025-07-26T10:00:00',
    level: 'info',
    category: 'user',
    message: 'Création d\'un nouvel utilisateur',
    details: 'New student account created',
    user: 'admin@education.fr',
  },
  {
    id: '3',
    timestamp: '2025-07-26T09:45:00',
    level: 'warning',
    category: 'system',
    message: 'Utilisation élevée du CPU',
    details: 'CPU usage exceeded 80%',
  },
  {
    id: '4',
    timestamp: '2025-07-26T09:30:00',
    level: 'info',
    category: 'academic',
    message: 'Mise à jour des notes',
    details: 'Batch grade update completed',
    user: 'teacher@education.fr',
  },
  {
    id: '5',
    timestamp: '2025-07-26T09:15:00',
    level: 'critical',
    category: 'system',
    message: 'Erreur de sauvegarde',
    details: 'Database backup failed',
  },
];

export default function AdminLogs() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('24h');

  useEffect(() => {
    const mockAdmin: Admin = {
      id: '1',
      email: 'admin@education.fr',
      password: 'hashed_password',
      role: 'admin',
      firstName: 'Sophie',
      lastName: 'Martin',
      createdAt: '2025-01-01',
      lastLogin: '2025-07-26',
      department: 'Direction',
      permissions: ['all'],
    };
    setAdmin(mockAdmin);
  }, []);

  const menuItems = [
    {
      label: 'Tableau de bord',
      href: '/admin/dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'Utilisateurs',
      href: '/admin/users',
      icon: <DocumentsIcon />,
    },
    {
      label: 'Classes',
      href: '/admin/classes',
      icon: <TrainingsIcon />,
    },
    {
      label: 'Rapports',
      href: '/admin/reports',
      icon: <AnnouncementsIcon />,
    },
    {
      label: 'Planning',
      href: '/admin/planning',
      icon: <CalendarIcon />,
    },
    {
      label: 'Logs',
      href: '/admin/logs',
      icon: <RequestsIcon />,
    },
    {
      label: 'Configuration',
      href: '/admin/settings',
      icon: <SettingsIcon />,
    },
  ];

  const sidebar = (
    <Sidebar
      items={menuItems}
      userName={admin ? `${admin.firstName} ${admin.lastName}` : ''}
      userRole="Administrateur"
    />
  );

  const getLevelStyle = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'critical':
        return 'bg-red-200 text-red-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesLevel && matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout sidebar={sidebar}>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Logs Système</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                Rafraîchir
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Exporter
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Tous les niveaux</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="critical">Critical</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Toutes les catégories</option>
              <option value="system">Système</option>
              <option value="security">Sécurité</option>
              <option value="user">Utilisateur</option>
              <option value="academic">Académique</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="1h">Dernière heure</option>
              <option value="24h">24 heures</option>
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Détails
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur/IP
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelStyle(
                          log.level
                        )}`}
                      >
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.user || log.ip || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
