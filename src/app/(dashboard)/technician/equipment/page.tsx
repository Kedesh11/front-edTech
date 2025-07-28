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

interface Equipment {
  id: string;
  name: string;
  type: 'computer' | 'printer' | 'projector' | 'network' | 'other';
  status: 'operational' | 'maintenance' | 'repair' | 'retired';
  serialNumber: string;
  location: string;
  purchaseDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  specifications: Record<string, string>;
  notes: string[];
}

const mockEquipments: Equipment[] = [
  {
    id: '1',
    name: 'PC-LAB-001',
    type: 'computer',
    status: 'operational',
    serialNumber: 'DELL-XPS-2025-001',
    location: 'Laboratoire Info - Poste 1',
    purchaseDate: '2024-09-01',
    lastMaintenance: '2025-06-15',
    nextMaintenance: '2025-09-15',
    specifications: {
      processor: 'Intel i7 12th Gen',
      ram: '32GB DDR5',
      storage: '1TB SSD',
      os: 'Windows 11 Pro',
    },
    notes: [
      'Mise à jour Windows effectuée le 15/06/2025',
      'Nettoyage système effectué',
    ],
  },
  {
    id: '2',
    name: 'PRINT-ADM-001',
    type: 'printer',
    status: 'maintenance',
    serialNumber: 'HP-LJ-2025-001',
    location: 'Administration - Bureau 101',
    purchaseDate: '2024-10-15',
    lastMaintenance: '2025-07-01',
    nextMaintenance: '2025-08-01',
    specifications: {
      model: 'HP LaserJet Pro',
      type: 'Laser Couleur',
      format: 'A3/A4',
      network: 'Ethernet/Wifi',
    },
    notes: [
      'Remplacement toner prévu pour août 2025',
      'Problème papier récurrent - à surveiller',
    ],
  },
];

export default function TechnicianEquipment() {
  const router = useRouter();
  const [user, setUser] = useState<Technician | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
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
      label: 'Statistiques',
      href: '/technician/statistics',
      icon: <DashboardIcon />,
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

  // Données pour le graphique de statut des équipements
  const statusData = {
    labels: ['Opérationnel', 'Maintenance', 'Réparation', 'Retiré'],
    values: [
      equipments.filter((e) => e.status === 'operational').length,
      equipments.filter((e) => e.status === 'maintenance').length,
      equipments.filter((e) => e.status === 'repair').length,
      equipments.filter((e) => e.status === 'retired').length,
    ],
  };

  const statusChartData = [{
    values: statusData.values,
    labels: statusData.labels,
    type: 'pie' as const,
    hole: 0.4,
    marker: {
      colors: ['#22c55e', '#eab308', '#ef4444', '#94a3b8'],
    },
  }];

  const statusChartLayout = {
    title: {
      text: 'État des équipements',
    },
    height: 300,
    showlegend: true,
    legend: {
      x: 1,
      y: 0.5,
    },
  };

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesType = filterType === 'all' || equipment.type === filterType;
    const matchesStatus = filterStatus === 'all' || equipment.status === filterStatus;
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
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
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Équipements</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher un équipement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Tous les types</option>
              <option value="computer">Ordinateurs</option>
              <option value="printer">Imprimantes</option>
              <option value="projector">Projecteurs</option>
              <option value="network">Réseau</option>
              <option value="other">Autres</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Tous les statuts</option>
              <option value="operational">Opérationnel</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Réparation</option>
              <option value="retired">Retiré</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Nouvel Équipement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <PlotlyChart data={statusChartData} layout={statusChartLayout} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total des équipements</p>
                <p className="text-2xl font-semibold">{equipments.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">En maintenance</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {equipments.filter((e) => e.status === 'maintenance').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">En réparation</p>
                <p className="text-2xl font-semibold text-red-600">
                  {equipments.filter((e) => e.status === 'repair').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEquipments.map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {equipment.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          equipment.status === 'operational'
                            ? 'bg-green-100 text-green-800'
                            : equipment.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : equipment.status === 'repair'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {equipment.status}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Type:</span>{' '}
                      {equipment.type}
                    </div>
                    <div>
                      <span className="font-medium">Numéro de série:</span>{' '}
                      {equipment.serialNumber}
                    </div>
                    <div>
                      <span className="font-medium">Emplacement:</span>{' '}
                      {equipment.location}
                    </div>
                    <div>
                      <span className="font-medium">Date d&apos;achat:</span>{' '}
                      {new Date(equipment.purchaseDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  {equipment.specifications && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Spécifications:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    Modifier
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Historique
                  </button>
                </div>
              </div>
              {equipment.notes && equipment.notes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes:</h4>
                  <ul className="space-y-1">
                    {equipment.notes.map((note, index) => (
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
