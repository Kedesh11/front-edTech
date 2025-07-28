'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Technician } from '@/mock/types';
import DashboardLayout from '@/components/shared/dashboard/DashboardLayout';
import { Sidebar } from '@/components/shared/dashboard/Sidebar';
import {
  DashboardIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
  SettingsIcon,
} from '@/components/shared/dashboard/icons';
import { PlotlyChart } from '@/components/shared/PlotlyChart';
import { Input } from '@/components/ui/Input';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'preventive' | 'corrective' | 'upgrade';
  equipmentId: string;
  assignedTo?: string;
  scheduledDate: string;
  completedDate?: string;
  duration: number;
  notes: string[];
  checklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
}

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    title: 'Maintenance préventive - Salle informatique',
    description: 'Vérification et nettoyage des postes informatiques',
    status: 'in_progress',
    priority: 'medium',
    type: 'preventive',
    equipmentId: 'LAB-001',
    assignedTo: 'Thomas Robert',
    scheduledDate: '2025-07-27',
    duration: 240,
    notes: [
      'Mise à jour des systèmes à effectuer',
      'Vérification des ventilateurs',
    ],
    checklist: [
      { id: '1', task: 'Nettoyage physique', completed: true },
      { id: '2', task: 'Vérification des performances', completed: false },
      { id: '3', task: 'Mise à jour logiciels', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Remplacement disque dur - PC-ADM-002',
    description: 'Remplacement du disque dur défectueux',
    status: 'pending',
    priority: 'high',
    type: 'corrective',
    equipmentId: 'PC-ADM-002',
    scheduledDate: '2025-07-28',
    duration: 120,
    notes: [
      'Disque dur commandé - en attente de livraison',
      'Sauvegarde des données nécessaire',
    ],
    checklist: [
      { id: '1', task: 'Sauvegarde des données', completed: false },
      { id: '2', task: 'Installation du nouveau disque', completed: false },
      { id: '3', task: 'Restauration des données', completed: false },
      { id: '4', task: 'Tests de fonctionnement', completed: false },
    ],
  },
];

export default function TechnicianMaintenance() {
  const router = useRouter();
  const [user, setUser] = useState<Technician | null>(null);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const mockUser: Technician = {
      id: '1',
      email: 'tech@education.fr',
      password: 'hashed_password',
      role: 'technician',
      firstName: 'Thomas',
      lastName: 'Robert',
      specialization: 'Infrastructure',
      certifications: ['CCNA', 'CompTIA A+'],
      createdAt: '2025-01-01',
      lastLogin: '2025-07-26',
    };
    setUser(mockUser);
  }, []);

  const menuItems = [
    {
      label: 'Tableau de bord',
      href: '/technician/dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'Tickets',
      href: '/technician/tickets',
      icon: <DocumentsIcon />,
    },
    {
      label: 'Équipements',
      href: '/technician/equipment',
      icon: <TrainingsIcon />,
    },
    {
      label: 'Maintenance',
      href: '/technician/maintenance',
      icon: <CalendarIcon />,
    },
    {
      label: 'Inventaire',
      href: '/technician/inventory',
      icon: <RequestsIcon />,
    },
    {
      label: 'Paramètres',
      href: '/technician/settings',
      icon: <SettingsIcon />,
    },
  ];

  // Données pour le graphique de répartition des tâches
  const taskDistributionData = [{
    values: [
      tasks.filter(t => t.type === 'preventive').length,
      tasks.filter(t => t.type === 'corrective').length,
      tasks.filter(t => t.type === 'upgrade').length,
    ],
    labels: ['Préventive', 'Corrective', 'Mise à niveau'],
    type: 'pie' as const,
    hole: 0.4,
    marker: {
      colors: ['#3b82f6', '#ef4444', '#22c55e'],
    },
  }];

  const taskDistributionLayout = {
    title: {
      text: 'Types de maintenance',
    },
    height: 300,
    showlegend: true,
    legend: {
      x: 1,
      y: 0.5,
    },
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.equipmentId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesType && matchesSearch;
  });

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          items={menuItems}
          userName={user ? `${user.firstName} ${user.lastName}` : ''}
          userRole="Technicien"
        />
      }
    >
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Maintenance</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher une tâche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Toutes les priorités</option>
              <option value="urgent">Urgente</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Tous les types</option>
              <option value="preventive">Préventive</option>
              <option value="corrective">Corrective</option>
              <option value="upgrade">Mise à niveau</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Nouvelle tâche
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <PlotlyChart data={taskDistributionData} layout={taskDistributionLayout} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total des tâches</p>
                <p className="text-2xl font-semibold">{tasks.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">En attente</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {tasks.filter((t) => t.status === 'pending').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {tasks.filter((t) => t.status === 'in_progress').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {task.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          task.priority === 'urgent'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          task.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : task.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Type:</span> {task.type}
                    </div>
                    <div>
                      <span className="font-medium">Équipement:</span> {task.equipmentId}
                    </div>
                    <div>
                      <span className="font-medium">Date prévue:</span>{' '}
                      {new Date(task.scheduledDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div>
                      <span className="font-medium">Durée estimée:</span>{' '}
                      {task.duration} minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    Modifier
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Détails
                  </button>
                </div>
              </div>
              {task.checklist && task.checklist.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Liste de vérification:
                  </h4>
                  <div className="space-y-2">
                    {task.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {task.notes && task.notes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes:</h4>
                  <ul className="space-y-1">
                    {task.notes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
