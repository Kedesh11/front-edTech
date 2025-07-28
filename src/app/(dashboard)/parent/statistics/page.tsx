'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function ParentStatistics() {
  const { user } = useAuth();

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
            <PlotlyChart data={notesData} layout={notesLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={progressionData} layout={progressionLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={presenceData} layout={presenceLayout} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 