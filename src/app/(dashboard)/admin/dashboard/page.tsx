'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Admin } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

interface DashboardStats {
  users: {
    total: number;
    activeToday: number;
    newThisWeek: number;
    byRole: {
      students: number;
      teachers: number;
      parents: number;
      admins: number;
    };
  };
  system: {
    uptime: number;
    cpuUsage: number;
    memoryUsage: number;
    storageUsage: number;
  };
  academic: {
    activeClasses: number;
    averageAttendance: number;
    averageGrade: number;
    submittedAssignments: number;
  };
  alerts: {
    id: string;
    type: 'warning' | 'error' | 'success' | 'info';
    message: string;
    timestamp: string;
  }[];
}

const mockDashboardStats: DashboardStats = {
  users: {
    total: 1250,
    activeToday: 850,
    newThisWeek: 45,
    byRole: {
      students: 1000,
      teachers: 100,
      parents: 800,
      admins: 5,
    },
  },
  system: {
    uptime: 99.98,
    cpuUsage: 45,
    memoryUsage: 62,
    storageUsage: 78,
  },
  academic: {
    activeClasses: 45,
    averageAttendance: 92,
    averageGrade: 14.5,
    submittedAssignments: 256,
  },
  alerts: [
    {
      id: '1',
      type: 'warning',
      message: 'Utilisation du stockage élevée (78%)',
      timestamp: '2025-07-26T10:30:00',
    },
    {
      id: '2',
      type: 'error',
      message: 'Échec de la sauvegarde de la base de données',
      timestamp: '2025-07-26T09:15:00',
    },
    {
      id: '3',
      type: 'success',
      message: 'Mise à jour du système réussie',
      timestamp: '2025-07-26T08:00:00',
    },
  ],
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'statistics'>('dashboard');

  // Données pour les graphiques
  const userDistributionData = [{
    type: 'pie' as const,
    labels: ['Élèves', 'Enseignants', 'Parents', 'Administrateurs'],
    values: [
      stats.users.byRole.students,
      stats.users.byRole.teachers,
      stats.users.byRole.parents,
      stats.users.byRole.admins,
    ],
    marker: {
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
  }];

  const userDistributionLayout = {
    title: { text: 'Répartition des utilisateurs' },
    height: 300,
  };

  const systemMetricsData = [{
    type: 'scatter' as const,
    mode: 'lines' as const,
    x: ['CPU', 'Mémoire', 'Stockage'],
    y: [stats.system.cpuUsage, stats.system.memoryUsage, stats.system.storageUsage],
    line: { color: '#3B82F6' },
    name: 'Utilisation (%)',
  }];

  const systemMetricsLayout = {
    title: { text: 'Métriques système' },
    height: 300,
    yaxis: {
      title: { text: 'Utilisation (%)' },
    },
  };

  // Données fictives pour les graphiques
  const rolesData = [{
    values: [40, 30, 20, 10],
    labels: ['Élèves', 'Enseignants', 'Parents', 'Techniciens'],
    type: 'pie' as const,
    marker: { colors: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
    textinfo: 'label+percent' as 'label+percent',
  }];
  const rolesLayout = {
    title: { text: 'Répartition des rôles' },
    height: 320,
    width: 400,
    showlegend: true,
    margin: { t: 40, l: 10, r: 10, b: 10 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const connexionsData = [{
    x: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    y: [120, 150, 130, 170, 160],
    type: 'bar' as const,
    marker: { color: '#2563eb' },
  }];
  const connexionsLayout = {
    title: { text: 'Connexions par jour' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const evolutionData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [200, 220, 210, 250, 240, 260],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    marker: { color: '#2563eb' },
    line: { shape: 'spline' as const, color: '#2563eb' },
  }];
  const evolutionLayout = {
    title: { text: 'Évolution des utilisateurs' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
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
                  Tableau de bord administrateur
                </h1>
                <p className="text-lg text-gray-600">
                  Vue d'ensemble de la plateforme éducative et des métriques système.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.users.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Classes actives</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.academic.activeClasses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uptime système</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.system.uptime}%</p>
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
                    <p className="text-sm font-medium text-gray-600">Moyenne générale</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.academic.averageGrade}/20</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <PlotlyChart data={userDistributionData} layout={userDistributionLayout} />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <PlotlyChart data={systemMetricsData} layout={systemMetricsLayout} />
              </div>
            </div>

            {/* Alerts Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes système</h3>
              <div className="space-y-3">
                {stats.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.type === 'error' ? 'border-red-200 bg-red-50' :
                      alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      alert.type === 'success' ? 'border-green-200 bg-green-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          alert.type === 'error' ? 'bg-red-500' :
                          alert.type === 'warning' ? 'bg-yellow-500' :
                          alert.type === 'success' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">
                          {alert.message}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(alert.timestamp).toLocaleString('fr-FR')}
                      </span>
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
              <PlotlyChart data={rolesData} layout={rolesLayout} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <PlotlyChart data={connexionsData} layout={connexionsLayout} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <PlotlyChart data={evolutionData} layout={evolutionLayout} />
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
