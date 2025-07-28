'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function AdminStatistics() {
  const { user } = useAuth();

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
    <DashboardLayout
      user={{
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        role: user?.role || '',
      }}
    >
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Statistiques</h1>
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
      </div>
    </DashboardLayout>
  );
} 