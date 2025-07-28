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
import { PlotlyChart } from '@/components/shared/PlotlyChart';

interface SchoolStats {
  academicYear: string;
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  successRate: number;
  monthlyData: {
    month: string;
    attendance: number;
    grades: number;
    incidents: number;
  }[];
  subjectPerformance: {
    subject: string;
    averageGrade: number;
    successRate: number;
  }[];
  classDistribution: {
    level: string;
    count: number;
  }[];
}

const mockSchoolStats: SchoolStats = {
  academicYear: '2024-2025',
  totalStudents: 1200,
  averageGrade: 14.2,
  attendanceRate: 94.5,
  successRate: 87.8,
  monthlyData: [
    { month: '09/2024', attendance: 96.5, grades: 13.8, incidents: 5 },
    { month: '10/2024', attendance: 95.8, grades: 14.1, incidents: 4 },
    { month: '11/2024', attendance: 94.2, grades: 14.3, incidents: 6 },
    { month: '12/2024', attendance: 93.5, grades: 14.0, incidents: 3 },
    { month: '01/2025', attendance: 92.8, grades: 14.2, incidents: 4 },
    { month: '02/2025', attendance: 93.9, grades: 14.4, incidents: 5 },
    { month: '03/2025', attendance: 94.6, grades: 14.5, incidents: 4 },
    { month: '04/2025', attendance: 95.2, grades: 14.3, incidents: 3 },
    { month: '05/2025', attendance: 94.8, grades: 14.1, incidents: 5 },
    { month: '06/2025', attendance: 93.5, grades: 14.4, incidents: 4 },
  ],
  subjectPerformance: [
    { subject: 'Mathématiques', averageGrade: 13.8, successRate: 85.5 },
    { subject: 'Français', averageGrade: 14.2, successRate: 88.2 },
    { subject: 'Histoire-Géo', averageGrade: 14.5, successRate: 90.1 },
    { subject: 'Sciences', averageGrade: 14.0, successRate: 86.8 },
    { subject: 'Langues', averageGrade: 14.8, successRate: 91.5 },
  ],
  classDistribution: [
    { level: 'Seconde', count: 400 },
    { level: 'Première', count: 420 },
    { level: 'Terminale', count: 380 },
  ],
};

export default function AdminReports() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [timeRange, setTimeRange] = useState('year');
  const [stats, setStats] = useState<SchoolStats>(mockSchoolStats);

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

  // Données des graphiques
  const monthlyPerformanceData = {
    data: [
      {
        type: 'scatter' as const,
        x: stats.monthlyData.map(d => d.month),
        y: stats.monthlyData.map(d => d.grades),
        name: 'Moyennes',
        mode: 'lines+markers' as const,
        line: { color: '#60A5FA' },
      },
      {
        type: 'scatter' as const,
        x: stats.monthlyData.map(d => d.month),
        y: stats.monthlyData.map(d => d.attendance),
        name: 'Présence (%)',
        mode: 'lines+markers' as const,
        line: { color: '#34D399' },
        yaxis: 'y2',
      },
    ],
    layout: {
      title: { text: 'Évolution des performances' },
      xaxis: { title: { text: 'Mois' } },
      yaxis: { title: { text: 'Moyenne générale' } },
      yaxis2: {
        title: { text: 'Taux de présence (%)' },
        overlaying: 'y' as const,
        side: 'right' as const,
      },
      showlegend: true,
    },
  };

  const subjectPerformanceData = {
    data: [
      {
        type: 'bar' as const,
        x: stats.subjectPerformance.map(s => s.subject),
        y: stats.subjectPerformance.map(s => s.averageGrade),
        name: 'Moyenne',
        marker: { color: '#60A5FA' },
      },
      {
        type: 'bar' as const,
        x: stats.subjectPerformance.map(s => s.subject),
        y: stats.subjectPerformance.map(s => s.successRate),
        name: 'Taux de réussite (%)',
        marker: { color: '#34D399' },
      },
    ],
    layout: {
      title: { text: 'Performance par matière' },
      barmode: 'group' as const,
      xaxis: { title: { text: 'Matières' } },
      yaxis: { title: { text: 'Score' } },
    },
  };

  const classDistributionData = {
    data: [
      {
        type: 'pie' as const,
        labels: stats.classDistribution.map(c => c.level),
        values: stats.classDistribution.map(c => c.count),
        hole: 0.4,
      },
    ],
    layout: {
      title: { text: 'Répartition des élèves par niveau' },
    },
  };

  return (
    <DashboardLayout sidebar={sidebar}>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Rapports et Statistiques</h1>
            <div className="flex gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="year">Année scolaire</option>
                <option value="semester">Semestre</option>
                <option value="trimester">Trimestre</option>
                <option value="month">Mois</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Exporter PDF
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500">Total Élèves</div>
              <div className="mt-2 flex items-baseline">
                <div className="text-3xl font-semibold text-gray-900">
                  {stats.totalStudents}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500">Moyenne Générale</div>
              <div className="mt-2 flex items-baseline">
                <div className="text-3xl font-semibold text-gray-900">
                  {stats.averageGrade}/20
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500">Taux de Présence</div>
              <div className="mt-2 flex items-baseline">
                <div className="text-3xl font-semibold text-gray-900">
                  {stats.attendanceRate}%
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500">Taux de Réussite</div>
              <div className="mt-2 flex items-baseline">
                <div className="text-3xl font-semibold text-gray-900">
                  {stats.successRate}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <PlotlyChart
              data={monthlyPerformanceData.data}
              layout={monthlyPerformanceData.layout}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <PlotlyChart
                data={subjectPerformanceData.data}
                layout={subjectPerformanceData.layout}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <PlotlyChart
                data={classDistributionData.data}
                layout={classDistributionData.layout}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
