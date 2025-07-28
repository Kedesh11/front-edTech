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

interface InventoryItem {
  id: string;
  name: string;
  category: 'hardware' | 'software' | 'consumable' | 'accessory';
  type: string;
  quantity: number;
  minQuantity: number;
  location: string;
  supplier: string;
  unitPrice: number;
  lastOrder?: string;
  nextOrderDue?: string;
  notes: string[];
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Cartouche d\'encre HP 304XL',
    category: 'consumable',
    type: 'printer_supplies',
    quantity: 5,
    minQuantity: 3,
    location: 'Stock IT - Étagère A1',
    supplier: 'HP Direct',
    unitPrice: 29.99,
    lastOrder: '2025-06-15',
    nextOrderDue: '2025-08-01',
    notes: [
      'Compatible avec les imprimantes HP DeskJet série 3700',
      'Commander par lot de 10',
    ],
  },
  {
    id: '2',
    name: 'Licence Windows 11 Pro',
    category: 'software',
    type: 'operating_system',
    quantity: 25,
    minQuantity: 10,
    location: 'Stockage numérique',
    supplier: 'Microsoft',
    unitPrice: 199.99,
    lastOrder: '2025-05-01',
    notes: [
      'Licences valables pour mise à niveau depuis Win 10',
      'Volume licensing agreement',
    ],
  },
  {
    id: '3',
    name: 'Clavier USB Logitech K120',
    category: 'hardware',
    type: 'input_device',
    quantity: 8,
    minQuantity: 5,
    location: 'Stock IT - Étagère B2',
    supplier: 'Logitech',
    unitPrice: 15.99,
    lastOrder: '2025-07-01',
    notes: [
      'Modèle standard pour postes administratifs',
      'Garantie 3 ans',
    ],
  },
];

export default function TechnicianInventory() {
  const router = useRouter();
  const [user, setUser] = useState<Technician | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
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

  // Données pour le graphique de valeur d'inventaire par catégorie
  const inventoryValueData = [{
    type: 'bar' as const,
    x: ['Matériel', 'Logiciel', 'Consommables', 'Accessoires'],
    y: [
      inventory
        .filter((item) => item.category === 'hardware')
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      inventory
        .filter((item) => item.category === 'software')
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      inventory
        .filter((item) => item.category === 'consumable')
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      inventory
        .filter((item) => item.category === 'accessory')
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    ],
    marker: {
      color: ['#3b82f6', '#22c55e', '#eab308', '#94a3b8'],
    },
  }];

  const inventoryValueLayout = {
    title: {
      text: 'Valeur d\'inventaire par catégorie',
    },
    height: 300,
    yaxis: {
      title: {
        text: 'Valeur (€)',
      },
    },
  };

  // Données pour le graphique des stocks bas
  const lowStockItems = inventory.filter((item) => item.quantity <= item.minQuantity);
  const lowStockData = [{
    type: 'bar' as const,
    x: lowStockItems.map((item) => item.name),
    y: lowStockItems.map((item) => item.quantity),
    marker: {
      color: lowStockItems.map((item) => 
        item.quantity < item.minQuantity ? '#ef4444' : '#eab308'
      ),
    },
  }];

  const lowStockLayout = {
    title: {
      text: 'Articles en stock bas',
    },
    height: 300,
    yaxis: {
      title: {
        text: 'Quantité',
      },
    },
    xaxis: {
      tickangle: -45,
    },
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Tri des articles
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'quantity':
        return b.quantity - a.quantity;
      case 'value':
        return (b.quantity * b.unitPrice) - (a.quantity * a.unitPrice);
      default:
        return 0;
    }
  });

  const totalValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

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
          <h1 className="text-2xl font-semibold text-gray-900">Inventaire</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="all">Toutes les catégories</option>
              <option value="hardware">Matériel</option>
              <option value="software">Logiciel</option>
              <option value="consumable">Consommable</option>
              <option value="accessory">Accessoire</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="name">Nom</option>
              <option value="quantity">Quantité</option>
              <option value="value">Valeur</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Nouvel article
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <PlotlyChart data={inventoryValueData} layout={inventoryValueLayout} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <PlotlyChart data={lowStockData} layout={lowStockLayout} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">Valeur totale</h3>
            <p className="text-2xl font-semibold">
              {totalValue.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">Articles en stock</h3>
            <p className="text-2xl font-semibold">{inventory.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">Stock bas</h3>
            <p className="text-2xl font-semibold text-yellow-600">
              {lowStockItems.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">Rupture de stock</h3>
            <p className="text-2xl font-semibold text-red-600">
              {inventory.filter((item) => item.quantity === 0).length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emplacement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur unitaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur totale
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedInventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.quantity === 0
                              ? 'bg-red-100 text-red-800'
                              : item.quantity <= item.minQuantity
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {item.quantity}
                      </span>
                      {item.quantity <= item.minQuantity && (
                        <span className="ml-2 text-yellow-500">⚠️</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.unitPrice.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {(item.quantity * item.unitPrice).toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-900">
                      Modifier
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-900">
                      Commander
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
