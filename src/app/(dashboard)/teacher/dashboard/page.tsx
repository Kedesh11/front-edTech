'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function TeacherDashboard() {
  const { user } = useAuth();

  // Données fictives pour les graphiques
  const moyennesData = [{
    x: ['1ère A', '1ère B', 'Term A', 'Term B'],
    y: [15.2, 13.8, 14.5, 12.9],
    type: 'bar' as const,
    marker: { color: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
  }];
  const moyennesLayout = {
    title: { text: 'Moyenne par classe' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const presenceData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [95, 93, 92, 96, 94, 97],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    marker: { color: '#2563eb' },
    line: { shape: 'spline' as const, color: '#2563eb' },
  }];
  const presenceLayout = {
    title: { text: 'Taux de présence mensuel (%)' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const devoirsData = [{
    values: [85, 15],
    labels: ['Rendus', 'Non rendus'],
    type: 'pie' as const,
    marker: { colors: ['#10b981', '#f43f5e'] },
    textinfo: 'label+percent' as 'label+percent',
  }];
  const devoirsLayout = {
    title: { text: 'Devoirs rendus (%)' },
    height: 320,
    width: 400,
    showlegend: true,
    margin: { t: 40, l: 10, r: 10, b: 10 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="space-y-8">
          {/* Onglets */}
          {/* Supprimer tout ce qui concerne activeTab, setActiveTab, les boutons d'onglet, et le rendu conditionnel lié à ces variables. */}
          {/* Garde uniquement le contenu principal du dashboard (Tableau de bord). */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte des classes du jour */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cours d&apos;aujourd&apos;hui</h2>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Mathématiques - 1ère A</div>
                  <div className="text-sm text-blue-600 mt-1">9h00 - 11h00 • Salle 201</div>
                  <div className="text-sm text-blue-600">25 élèves présents</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800">Physique - Terminale B</div>
                  <div className="text-sm text-green-600 mt-1">14h00 - 16h00 • Labo Physique</div>
                  <div className="text-sm text-green-600">22 élèves présents</div>
                </div>
              </div>
            </div>

            {/* Carte des devoirs à corriger */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Devoirs à corriger</h2>
              <div className="space-y-3">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-800">Contrôle sur les intégrales</div>
                  <div className="text-sm text-orange-600 mt-1">1ère A • 28 copies</div>
                  <div className="text-sm text-red-600">Date limite : Aujourd&apos;hui</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-800">TP Circuits électriques</div>
                  <div className="text-sm text-yellow-600 mt-1">Terminale B • 15 rapports</div>
                  <div className="text-sm text-yellow-600">Date limite : Vendredi</div>
                </div>
              </div>
            </div>

            {/* Carte des alertes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertes</h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-medium text-red-800">Absence prolongée</div>
                  <div className="text-sm text-red-600 mt-1">Marie Dupont - 5 jours</div>
                  <div className="text-xs text-red-500">À contacter</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Réunion pédagogique</div>
                  <div className="text-sm text-blue-600 mt-1">Demain 14h00</div>
                  <div className="text-xs text-blue-500">Salle des profs</div>
                </div>
              </div>
            </div>

            {/* Carte des statistiques */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Moyenne générale</span>
                  <span className="font-semibold text-green-600">15.2/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de présence</span>
                  <span className="font-semibold text-blue-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Devoirs rendus</span>
                  <span className="font-semibold text-orange-600">85%</span>
                </div>
              </div>
            </div>

            {/* Carte des prochains événements */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Prochains événements</h2>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-800">Conseil de classe</div>
                  <div className="text-sm text-purple-600">1ère A • Vendredi 15h00</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="font-medium text-indigo-800">Formation continue</div>
                  <div className="text-sm text-indigo-600">Lundi • 9h00-12h00</div>
                </div>
              </div>
            </div>

            {/* Carte des ressources */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ressources récentes</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-800">Support cours intégrales</div>
                  <div className="text-sm text-gray-600">Ajouté hier</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-800">Exercices circuits</div>
                  <div className="text-sm text-gray-600">Ajouté il y a 2 jours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
