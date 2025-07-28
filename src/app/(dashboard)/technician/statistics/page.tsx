'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function TechnicianStatistics() {
  const { user } = useAuth();

  // Données fictives pour les graphiques
  const ticketsData = [{
    values: [30, 20, 10, 5],
    labels: ['Incidents', 'Maintenance', 'Installation', 'Autres'],
    type: 'pie' as const,
    marker: { colors: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
    textinfo: 'label+percent' as 'label+percent',
  }];
  const ticketsLayout = {
    title: { text: 'Tickets par type' },
    height: 320,
    width: 400,
    showlegend: true,
    margin: { t: 40, l: 10, r: 10, b: 10 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const interventionsData = [{
    x: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    y: [12, 15, 10, 18, 14, 20],
    type: 'bar' as const,
    marker: { color: '#2563eb' },
  }];
  const interventionsLayout = {
    title: { text: 'Interventions par mois' },
    height: 320,
    margin: { t: 40, l: 40, r: 10, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  };

  const dispoData = [{
    x: ['PC', 'Imprimantes', 'Tablettes', 'Projecteurs'],
    y: [90, 80, 70, 60],
    type: 'bar' as const,
    marker: { color: ['#2563eb', '#f59e42', '#10b981', '#f43f5e'] },
  }];
  const dispoLayout = {
    title: { text: 'Disponibilité des équipements (%)' },
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
            <PlotlyChart data={ticketsData} layout={ticketsLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={interventionsData} layout={interventionsLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={dispoData} layout={dispoLayout} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 