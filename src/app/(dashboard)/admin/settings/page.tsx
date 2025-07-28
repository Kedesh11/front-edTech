'use client';

import { useEffect, useState } from 'react';
import { Admin } from '@/mock/types';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Sidebar } from '@/components/layout/Sidebar';
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
import { PlotlyChart } from '@/components/shared/PlotlyChart';

interface SystemConfig {
  general: {
    schoolName: string;
    academicYear: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      requireUppercase: boolean;
      maxAge: number;
    };
    sessionTimeout: number;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    notificationTypes: {
      absence: boolean;
      grades: boolean;
      discipline: boolean;
      announcements: boolean;
    };
  };
  academic: {
    gradingScale: {
      min: number;
      max: number;
      passingGrade: number;
    };
    attendanceTracking: boolean;
    automaticGradeCalculation: boolean;
    homeworkSubmissionDeadline: number;
  };
}

const mockConfig: SystemConfig = {
  general: {
    schoolName: 'Lycée edTech',
    academicYear: '2024-2025',
    timezone: 'Europe/Paris',
    language: 'fr',
    maintenanceMode: false,
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      maxAge: 90,
    },
    sessionTimeout: 30,
    twoFactorAuth: true,
    ipWhitelist: ['192.168.1.0/24'],
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notificationTypes: {
      absence: true,
      grades: true,
      discipline: true,
      announcements: true,
    },
  },
  academic: {
    gradingScale: {
      min: 0,
      max: 20,
      passingGrade: 10,
    },
    attendanceTracking: true,
    automaticGradeCalculation: true,
    homeworkSubmissionDeadline: 7,
  },
};

export default function AdminSettings() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [config, setConfig] = useState<SystemConfig>(mockConfig);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'academic'>('general');
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleConfigChange = (section: string, field: string, value: unknown) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof SystemConfig],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: Implement save to backend
    console.log('Saving configuration:', config);
    setHasChanges(false);
  };

  // Exemple de données fictives pour un graphique Plotly (notifications)
  const notificationsData = [
    {
      values: [config.notifications.emailNotifications ? 1 : 0, config.notifications.smsNotifications ? 1 : 0, config.notifications.pushNotifications ? 1 : 0],
      labels: ['Email', 'SMS', 'Push'],
      type: 'pie' as const,
      marker: { colors: ['#2563eb', '#f59e42', '#10b981'] },
      textinfo: 'label+percent' as 'label+percent',
    },
  ];
  const notificationsLayout = {
    title: { text: 'Types de notifications activées' },
    height: 320,
    width: 400,
    showlegend: true,
    margin: { t: 40, l: 10, r: 10, b: 10 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  return (
    <DashboardLayout
      sidebarItems={menuItems}
      user={admin ? { firstName: admin.firstName, lastName: admin.lastName, role: admin.role } : { firstName: '', lastName: '', role: '' }}
    >
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Configuration Système</h1>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-4 py-2 rounded-lg ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              Enregistrer les modifications
            </button>
          </div>

          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['general', 'security', 'notifications', 'academic'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'general' | 'security' | 'notifications' | 'academic')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {/* Exemple de graphique Plotly pour illustrer la config notifications */}
          {activeTab === 'notifications' && (
            <div className="mb-8 flex justify-center">
              <PlotlyChart data={notificationsData} layout={notificationsLayout} />
            </div>
          )}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom de l&apos;établissement
                </label>
                <Input
                  type="text"
                  value={config.general.schoolName}
                  onChange={(e) =>
                    handleConfigChange('general', 'schoolName', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Année scolaire
                </label>
                <Input
                  type="text"
                  value={config.general.academicYear}
                  onChange={(e) =>
                    handleConfigChange('general', 'academicYear', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mode maintenance
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={config.general.maintenanceMode}
                      onChange={(e) =>
                        handleConfigChange('general', 'maintenanceMode', e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Activer le mode maintenance
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Politique de mot de passe
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Longueur minimale
                    </label>
                    <Input
                      type="number"
                      value={config.security.passwordPolicy.minLength}
                      onChange={(e) =>
                        handleConfigChange('security', 'passwordPolicy', {
                          ...config.security.passwordPolicy,
                          minLength: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={config.security.passwordPolicy.requireSpecialChars}
                        onChange={(e) =>
                          handleConfigChange('security', 'passwordPolicy', {
                            ...config.security.passwordPolicy,
                            requireSpecialChars: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Caractères spéciaux requis
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={config.security.twoFactorAuth}
                        onChange={(e) =>
                          handleConfigChange('security', 'twoFactorAuth', e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Authentification à deux facteurs
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Configuration des notifications
                </h3>
                <div className="mt-4 space-y-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={config.notifications.emailNotifications}
                      onChange={(e) =>
                        handleConfigChange('notifications', 'emailNotifications', e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Notifications par email
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={config.notifications.smsNotifications}
                      onChange={(e) =>
                        handleConfigChange('notifications', 'smsNotifications', e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Notifications par SMS
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Échelle de notation
                </label>
                <div className="mt-1 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500">Minimum</label>
                    <Input
                      type="number"
                      value={config.academic.gradingScale.min}
                      onChange={(e) =>
                        handleConfigChange('academic', 'gradingScale', {
                          ...config.academic.gradingScale,
                          min: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Maximum</label>
                    <Input
                      type="number"
                      value={config.academic.gradingScale.max}
                      onChange={(e) =>
                        handleConfigChange('academic', 'gradingScale', {
                          ...config.academic.gradingScale,
                          max: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Note de passage</label>
                    <Input
                      type="number"
                      value={config.academic.gradingScale.passingGrade}
                      onChange={(e) =>
                        handleConfigChange('academic', 'gradingScale', {
                          ...config.academic.gradingScale,
                          passingGrade: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Délai de soumission des devoirs (jours)
                </label>
                <Input
                  type="number"
                  value={config.academic.homeworkSubmissionDeadline}
                  onChange={(e) =>
                    handleConfigChange(
                      'academic',
                      'homeworkSubmissionDeadline',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
