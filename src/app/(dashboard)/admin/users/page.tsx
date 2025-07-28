'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Admin, User } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout, SidebarItem } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  DashboardIcon,
  AnnouncementsIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
  ProjectsIcon,
  SettingsIcon,
} from '@/components/shared/dashboard/icons';
import { Input } from '@/components/ui/Input';

interface UserWithDetails extends User {
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  department?: string;
  permissions: string[];
  isActive: boolean;
}

const mockUsers: UserWithDetails[] = [
  {
    id: '1',
    email: 'marie.dupont@education.fr',
    password: 'hashed_password',
    role: 'student',
    firstName: 'Marie',
    lastName: 'Dupont',
    createdAt: '2024-09-01',
    lastLogin: '2025-07-27T10:30:00',
    isActive: true,
    lastActivity: '2025-07-27T10:30:00',
    status: 'active',
    department: '1ère A',
    permissions: ['view_courses', 'submit_assignments']
  },
  {
    id: '2',
    email: 'jean.martin@education.fr',
    password: 'hashed_password',
    role: 'teacher',
    firstName: 'Jean',
    lastName: 'Martin',
    createdAt: '2023-09-01',
    lastLogin: '2025-07-27T09:15:00',
    isActive: true,
    lastActivity: '2025-07-27T09:15:00',
    status: 'active',
    department: 'Mathématiques',
    permissions: ['manage_courses', 'grade_assignments', 'view_students']
  },
  {
    id: '3',
    email: 'sophie.bernard@education.fr',
    password: 'hashed_password',
    role: 'parent',
    firstName: 'Sophie',
    lastName: 'Bernard',
    createdAt: '2024-09-01',
    lastLogin: '2025-07-26T16:45:00',
    isActive: true,
    lastActivity: '2025-07-26T16:45:00',
    status: 'active',
    department: 'Parents',
    permissions: ['view_child_progress', 'communicate_teachers']
  },
  {
    id: '4',
    email: 'pierre.dubois@education.fr',
    password: 'hashed_password',
    role: 'admin',
    firstName: 'Pierre',
    lastName: 'Dubois',
    createdAt: '2022-09-01',
    lastLogin: '2025-07-27T08:00:00',
    isActive: true,
    lastActivity: '2025-07-27T08:00:00',
    status: 'active',
    department: 'Administration',
    permissions: ['manage_users', 'manage_system', 'view_reports']
  },
  {
    id: '5',
    email: 'luc.technicien@education.fr',
    password: 'hashed_password',
    role: 'technician',
    firstName: 'Luc',
    lastName: 'Technicien',
    createdAt: '2023-03-01',
    lastLogin: '2025-07-26T14:20:00',
    isActive: true,
    lastActivity: '2025-07-26T14:20:00',
    status: 'active',
    department: 'IT',
    permissions: ['manage_equipment', 'view_system_logs']
  }
];

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithDetails[]>(mockUsers);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student' as 'student' | 'teacher' | 'parent' | 'admin' | 'technician',
    department: '',
    permissions: [] as string[]
  });

  const sidebarItems: SidebarItem[] = [
    {
      icon: <DashboardIcon />,
      label: 'Tableau de bord',
      href: '/admin/dashboard',
    },
    {
      icon: <DocumentsIcon />,
      label: 'Classes',
      href: '/admin/classes',
    },
    {
      icon: <ProjectsIcon />,
      label: 'Rapports',
      href: '/admin/reports',
    },
    {
      icon: <RequestsIcon />,
      label: 'Utilisateurs',
      href: '/admin/users',
    },
    {
      icon: <CalendarIcon />,
      label: 'Planning',
      href: '/admin/planning',
    },
    {
      icon: <AnnouncementsIcon />,
      label: 'Logs système',
      href: '/admin/logs',
    },
    {
      icon: <SettingsIcon />,
      label: 'Paramètres',
      href: '/admin/settings',
    },
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserWithDetails = {
      id: Date.now().toString(),
      email: newUser.email,
      password: 'hashed_password',
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString(),
      isActive: true,
      lastActivity: new Date().toISOString(),
      status: 'active',
      department: newUser.department,
      permissions: newUser.permissions
    };
    setUsers([...users, user]);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      role: 'student',
      department: '',
      permissions: []
    });
    setIsAddingUser(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 bg-red-50';
      case 'teacher':
        return 'text-blue-600 bg-blue-50';
      case 'student':
        return 'text-green-600 bg-green-50';
      case 'parent':
        return 'text-purple-600 bg-purple-50';
      case 'technician':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      case 'suspended':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'teacher':
        return 'Enseignant';
      case 'student':
        return 'Élève';
      case 'parent':
        return 'Parent';
      case 'technician':
        return 'Technicien';
      default:
        return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'suspended':
        return 'Suspendu';
      default:
        return status;
    }
  };

  const filteredUsers = users.filter(user => {
    if (selectedRole && user.role !== selectedRole) return false;
    if (selectedStatus && user.status !== selectedStatus) return false;
    if (searchTerm && !user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout
        sidebarItems={sidebarItems}
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des utilisateurs
              </h1>
              <p className="text-lg text-gray-600">
                Gérez les comptes utilisateurs, les rôles et les permissions de la plateforme.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enseignants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'teacher').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Élèves</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'student').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="teacher">Enseignants</option>
                <option value="student">Élèves</option>
                <option value="parent">Parents</option>
                <option value="technician">Techniciens</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
                <option value="suspended">Suspendus</option>
              </select>
            </div>
            <button
              onClick={() => setIsAddingUser(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouvel utilisateur
            </button>
          </div>

          {/* Add User Form */}
          {isAddingUser && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvel utilisateur</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <Input
                      type="text"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input
                      type="text"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as any }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="student">Élève</option>
                      <option value="teacher">Enseignant</option>
                      <option value="parent">Parent</option>
                      <option value="admin">Administrateur</option>
                      <option value="technician">Technicien</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Département/Classe
                  </label>
                  <Input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Mathématiques ou 1ère A"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Liste des utilisateurs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Département
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière activité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.department || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.lastActivity).toLocaleString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Suspendre
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
