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
import { Input } from '@/components/ui/Input';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'hardware' | 'software' | 'network' | 'other';
  location: string;
  requestedBy: {
    name: string;
    role: string;
  };
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Problème de connexion réseau',
    description: 'La connexion internet est instable dans la salle 204',
    status: 'open',
    priority: 'high',
    category: 'network',
    location: 'Salle 204',
    requestedBy: {
      name: 'Marie Martin',
      role: 'teacher',
    },
    createdAt: '2025-07-26T08:00:00',
    updatedAt: '2025-07-26T08:00:00',
    comments: [
      {
        id: '1',
        author: 'Marie Martin',
        content: 'Impossible de diffuser la présentation en ligne.',
        timestamp: '2025-07-26T08:00:00',
      },
    ],
  },
  {
    id: '2',
    title: 'Mise à jour des logiciels',
    description: 'Installation des mises à jour de sécurité requise',
    status: 'in_progress',
    priority: 'medium',
    category: 'software',
    location: 'Laboratoire Info',
    requestedBy: {
      name: 'Jean Dupont',
      role: 'admin',
    },
    assignedTo: 'Thomas Robert',
    createdAt: '2025-07-25T14:30:00',
    updatedAt: '2025-07-26T09:15:00',
    comments: [
      {
        id: '1',
        author: 'Thomas Robert',
        content: 'Mise à jour en cours, 45% terminé.',
        timestamp: '2025-07-26T09:15:00',
      },
    ],
  },
];

export default function TechnicianTickets() {
  const router = useRouter();
  const [user, setUser] = useState<Technician | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
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
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Tickets</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher un ticket..."
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
              <option value="open">Ouverts</option>
              <option value="in_progress">En cours</option>
              <option value="resolved">Résolus</option>
              <option value="closed">Fermés</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Toutes les priorités</option>
              <option value="critical">Critique</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Nouveau Ticket
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {ticket.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          ticket.priority === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : ticket.priority === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : ticket.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          ticket.status === 'open'
                            ? 'bg-blue-100 text-blue-800'
                            : ticket.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : ticket.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{ticket.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span>📍 {ticket.location}</span>
                    <span>👤 {ticket.requestedBy.name}</span>
                    <span>
                      🕒{' '}
                      {new Date(ticket.createdAt).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    Prendre en charge
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Détails
                  </button>
                </div>
              </div>
              {ticket.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{ticket.comments[0].author}</span>
                    <span className="mx-2">·</span>
                    <span>
                      {new Date(ticket.comments[0].timestamp).toLocaleString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{ticket.comments[0].content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
