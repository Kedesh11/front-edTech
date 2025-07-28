'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Parent } from '@/mock/types';
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
} from '@/components/shared/dashboard/icons';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'statistics'>('dashboard');

  // Données fictives pour les graphiques
  const notesData = [{
    x: ['Maths', 'Physique', 'Français', 'Histoire', 'Anglais'],
    y: [14, 13, 15, 12, 16],
    type: 'bar' as const,
    marker: { color: ['#2563eb', '#f59e42', '#10b981', '#f43f5e', '#a21caf'] },
  }];
  const notesLayout = {
    title: { text: 'Notes par matière (enfant)' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const progressionData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [13, 14, 14, 15, 15, 16],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    marker: { color: '#2563eb' },
    line: { shape: 'spline' as const, color: '#2563eb' },
  }];
  const progressionLayout = {
    title: { text: 'Progression des notes (enfant)' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const presenceData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [97, 98, 99, 95, 96, 98],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    marker: { color: '#10b981' },
    line: { shape: 'spline' as const, color: '#10b981' },
  }];
  const presenceLayout = {
    title: { text: 'Taux de présence (enfant) (%)' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord parent
            </h1>
            <p className="text-lg text-gray-600">
              Suivez la progression scolaire de vos enfants et restez informé de leur parcours éducatif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte de suivi des enfants */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Suivi des enfants</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">Alex Dupont</div>
                <div className="text-sm text-blue-600 mt-1">Classe: 1ère A</div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Moyenne générale</span>
                  <span className="font-medium">15.5/20</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Présence</span>
                  <span className="font-medium text-green-600">96%</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">Emma Dupont</div>
                <div className="text-sm text-green-600 mt-1">Classe: 3ème B</div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Moyenne générale</span>
                  <span className="font-medium">14.2/20</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Présence</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carte des derniers résultats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Derniers résultats</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">Mathématiques</div>
                    <div className="text-sm text-gray-600">Alex - Contrôle continu</div>
                  </div>
                  <span className="font-semibold text-green-600">17/20</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">Français</div>
                    <div className="text-sm text-gray-600">Emma - Dissertation</div>
                  </div>
                  <span className="font-semibold text-blue-600">15/20</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">Histoire</div>
                    <div className="text-sm text-gray-600">Alex - Exposé</div>
                  </div>
                  <span className="font-semibold text-orange-600">13/20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carte des devoirs à venir */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Devoirs à venir</h2>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-medium text-orange-800">Physique - Alex</div>
                <div className="text-sm text-orange-600">TP Circuits électriques</div>
                <div className="text-xs text-orange-500 mt-1">Date limite : Vendredi</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">SVT - Emma</div>
                <div className="text-sm text-blue-600">Contrôle sur la génétique</div>
                <div className="text-xs text-blue-500 mt-1">Date limite : Lundi</div>
              </div>
            </div>
          </div>

          {/* Carte des communications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Communications récentes</h2>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="font-medium text-purple-800">Réunion parents-profs</div>
                <div className="text-sm text-purple-600">1ère A • Vendredi 18h00</div>
                <div className="text-xs text-purple-500">Salle polyvalente</div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="font-medium text-indigo-800">Sortie pédagogique</div>
                <div className="text-sm text-indigo-600">3ème B • Mardi prochain</div>
                <div className="text-xs text-indigo-500">Autorisation requise</div>
              </div>
            </div>
          </div>

          {/* Carte des alertes */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertes</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-medium text-yellow-800">Retard de devoir</div>
                <div className="text-sm text-yellow-600">Alex - Mathématiques</div>
                <div className="text-xs text-yellow-500">À régulariser</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">Progrès notable</div>
                <div className="text-sm text-green-600">Emma - Français</div>
                <div className="text-xs text-green-500">+2.5 points</div>
              </div>
            </div>
          </div>

          {/* Carte des événements */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Événements à venir</h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="font-medium text-red-800">Conseil de classe</div>
                <div className="text-sm text-red-600">1ère A • 15 décembre</div>
                <div className="text-xs text-red-500">Convocation envoyée</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">Portes ouvertes</div>
                <div className="text-sm text-blue-600">Samedi 20 décembre</div>
                <div className="text-xs text-blue-500">9h00-12h00</div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
