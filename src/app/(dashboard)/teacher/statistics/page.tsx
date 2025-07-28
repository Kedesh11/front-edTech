'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { PlotlyChart } from '@/components/shared/PlotlyChart';

export default function TeacherStatistics() {
  const { user } = useAuth();
  
  // Test minimal pour vérifier le contexte
  if (!user) {
    return <div className="text-red-600 font-bold p-8">Contexte AuthProvider non disponible ou utilisateur non connecté.</div>;
  }

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
            <PlotlyChart data={moyennesData} layout={moyennesLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={presenceData} layout={presenceLayout} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PlotlyChart data={devoirsData} layout={devoirsLayout} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 