'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Technician } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  requestedBy: string;
  requestDate: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'infrastructure';
}

interface SecurityAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'intrusion' | 'vulnerability' | 'anomaly' | 'audit';
  description: string;
  timestamp: string;
  source: string;
  status: 'new' | 'investigating' | 'resolved';
}

interface LoadTest {
  id: string;
  timestamp: string;
  duration: number;
  concurrentUsers: number;
  responseTime: number;
  errorRate: number;
  recommendations: string[];
}

interface CodeQuality {
  score: number;
  issues: {
    critical: number;
    major: number;
    minor: number;
  };
  coverage: number;
  duplications: number;
  techDebt: number;
}

interface TechnicianStats {
  tasks: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
    byCategory: {
      hardware: number;
      software: number;
      network: number;
      infrastructure: number;
    };
    byPriority: {
      high: number;
      medium: number;
      low: number;
    };
  };
  system: {
    networkStatus: {
      uptime: number;
      bandwidth: number;
      activeConnections: number;
      latency: number;
      trafficIn: number[];
      trafficOut: number[];
      timePoints: string[];
      anomalyScore: number;
    };
    serverStatus: {
      cpu: number;
      memory: number;
      storage: number;
      temperature: number;
      loadAverage: number[];
      processCount: number;
      iowait: number;
    };
    security: {
      alerts: SecurityAlert[];
      vulnerabilities: number;
      lastAuditDate: string;
      securityScore: number;
      threatLevel: number;
      blockedAttacks: number;
    };
    performance: {
      loadTests: LoadTest[];
      apiLatency: number;
      errorRate: number;
      cacheHitRate: number;
      databaseConnections: number;
    };
    codeQuality: CodeQuality;
  };
};

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    title: 'Remplacement écran salle 201',
    location: 'Salle 201',
    priority: 'high',
    status: 'in_progress',
    requestedBy: 'Prof. Martin',
    requestDate: '2025-07-25',
    description: 'Écran de projection défaillant',
    category: 'hardware',
  },
  {
    id: '2',
    title: 'Mise à jour antivirus',
    location: 'Salle informatique',
    priority: 'medium',
    status: 'pending',
    requestedBy: 'Admin',
    requestDate: '2025-07-26',
    description: 'Mise à jour des définitions antivirus',
    category: 'software',
  },
];

const mockStats: TechnicianStats = {
  tasks: {
    total: 45,
    completed: 32,
    pending: 8,
    inProgress: 5,
    byCategory: {
      hardware: 15,
      software: 12,
      network: 10,
      infrastructure: 8,
    },
    byPriority: {
      high: 5,
      medium: 25,
      low: 15,
    },
  },
  system: {
    networkStatus: {
      uptime: 99.98,
      bandwidth: 85,
      activeConnections: 1250,
      latency: 12,
      trafficIn: [100, 120, 110, 130, 140, 125, 135],
      trafficOut: [90, 110, 100, 120, 130, 115, 125],
      timePoints: ['9h', '10h', '11h', '12h', '13h', '14h', '15h'],
      anomalyScore: 0.02,
    },
    serverStatus: {
      cpu: 45,
      memory: 62,
      storage: 78,
      temperature: 42,
      loadAverage: [1.2, 1.5, 1.8],
      processCount: 156,
      iowait: 3.2,
    },
    security: {
      alerts: [
        {
          id: '1',
          severity: 'medium',
          type: 'anomaly',
          description: 'Activité réseau suspecte détectée',
          timestamp: '2025-07-26T10:30:00',
          source: 'Firewall',
          status: 'investigating',
        },
      ],
      vulnerabilities: 3,
      lastAuditDate: '2025-07-20',
      securityScore: 92,
      threatLevel: 2,
      blockedAttacks: 156,
    },
    performance: {
      loadTests: [
        {
          id: '1',
          timestamp: '2025-07-26T09:00:00',
          duration: 300,
          concurrentUsers: 500,
          responseTime: 245,
          errorRate: 0.1,
          recommendations: ['Optimiser les requêtes DB', 'Augmenter le cache'],
        },
      ],
      apiLatency: 245,
      errorRate: 0.1,
      cacheHitRate: 87,
      databaseConnections: 45,
    },
    codeQuality: {
      score: 85,
      issues: {
        critical: 0,
        major: 3,
        minor: 12,
      },
      coverage: 78,
      duplications: 4.2,
      techDebt: 120,
    },
  },
};

export default function TechnicianDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TechnicianStats>(mockStats);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'statistics'>('dashboard');

  // Données pour les graphiques
  const ticketsByStatusData = [{
    type: 'pie' as const,
    labels: ['Ouverts', 'En cours', 'Résolus', 'Fermés'],
    values: [
      stats.tasks.pending + stats.tasks.inProgress, // Assuming 'pending' and 'inProgress' map to 'Ouverts' and 'En cours'
      stats.tasks.inProgress, // Assuming 'inProgress' maps to 'En cours'
      stats.tasks.completed, // Assuming 'completed' maps to 'Résolus'
      stats.tasks.total - (stats.tasks.pending + stats.tasks.inProgress + stats.tasks.completed), // Assuming 'total' - (pending + inProgress + completed) maps to 'Fermés'
    ],
    marker: {
      colors: ['#EF4444', '#F59E0B', '#10B981', '#6B7280'],
    },
  }];

  const ticketsByStatusLayout = {
    title: { text: 'Répartition des tickets' },
    height: 300,
  };

  const ticketsByCategoryData = [{
    type: 'pie' as const,
    labels: ['Matériel', 'Logiciel', 'Réseau', 'Infrastructure'],
    values: [
      stats.tasks.byCategory.hardware,
      stats.tasks.byCategory.software,
      stats.tasks.byCategory.network,
      stats.tasks.byCategory.infrastructure,
    ],
    marker: {
      colors: ['#60A5FA', '#34D399', '#F472B6', '#A78BFA'],
    },
  }];

  const ticketsByCategoryLayout = {
    title: { text: 'Répartition des interventions' },
    height: 300,
  };

  // Données pour le graphique de trafic réseau
  const networkTrafficData = [
    {
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: stats.system.networkStatus.timePoints,
      y: stats.system.networkStatus.trafficIn,
      name: 'Trafic entrant',
      line: { color: '#3B82F6' },
    },
    {
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: stats.system.networkStatus.timePoints,
      y: stats.system.networkStatus.trafficOut,
      name: 'Trafic sortant',
      line: { color: '#10B981' },
    },
  ];

  const networkTrafficLayout = {
    title: { text: 'Trafic réseau' },
    height: 300,
    xaxis: { title: { text: 'Heure' } },
    yaxis: { title: { text: 'Mbps' } },
  };

  // Données fictives pour les graphiques
  const ticketsData = [{
    values: [30, 20, 10, 5],
    labels: ['Incidents', 'Maintenance', 'Installation', 'Autres'],
    type: 'pie' as const,
    marker: { colors: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
    textinfo: 'label+percent' as 'label+percent',
  }];
  const ticketsLayout = {
    title: { text: 'Tickets par type' },
    height: 320,
    width: 400,
    showlegend: true,
    margin: { t: 40, l: 10, r: 10, b: 10 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const interventionsData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [12, 15, 10, 18, 14, 20],
    type: 'bar' as const,
    marker: { color: '#2563eb' },
  }];
  const interventionsLayout = {
    title: { text: 'Interventions par mois' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const dispoData = [{
    x: ['PC', 'Imprimantes', 'Tablettes', 'Projecteurs'],
    y: [90, 80, 70, 60],
    type: 'bar' as const,
    marker: { color: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
  }];
  const dispoLayout = {
    title: { text: 'Disponibilité des équipements (%)' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  return (
    <ProtectedRoute allowedRoles={['technician']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Tableau de bord
          </button>
          <button
            className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'statistics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistiques
          </button>
        </div>
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Tableau de bord technique
                </h1>
                <p className="text-lg text-gray-600">
                  Surveillez l&apos;infrastructure, gérez les interventions et assurez la maintenance du système.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tickets ouverts</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.tasks.pending + stats.tasks.inProgress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uptime réseau</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.system.networkStatus.uptime}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Score sécurité</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.system.security.securityScore}/100</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Taux d&apos;erreur</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.system.performance.errorRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <PlotlyChart data={ticketsByCategoryData} layout={ticketsByCategoryLayout} />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <PlotlyChart data={networkTrafficData} layout={networkTrafficLayout} />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tâches en cours</h3>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border ${
                      task.priority === 'high' ? 'border-red-200 bg-red-50' :
                      task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-green-200 bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status === 'completed' ? 'Terminé' : task.status === 'in_progress' ? 'En cours' : 'En attente'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          📍 {task.location} • 👤 {task.requestedBy} • 📅 {new Date(task.requestDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'statistics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <PlotlyChart data={ticketsData} layout={ticketsLayout} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <PlotlyChart data={interventionsData} layout={interventionsLayout} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <PlotlyChart data={dispoData} layout={dispoLayout} />
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
