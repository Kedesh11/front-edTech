'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { TrainingStats } from '../components/TrainingStats';
import { RecentAnnouncements } from '../components/RecentAnnouncements';
import { WorkGroupStats } from '../components/WorkGroupStats';
import { AIAssistantStats } from '../components/AIAssistantStats';

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['student']}>
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
              Bienvenue, {user?.firstName} !
            </h1>
            <p className="text-lg text-gray-900 mb-6">
              Voici un aperçu de votre parcours éducatif et de vos prochaines échéances.
            </p>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Devoirs en attente</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Moyenne générale</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user && 'averageGrade' in user ? `${String(user.averageGrade)}/20` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Prochains cours</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Prochains devoirs */}
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className='text-black font-bold'>Prochains devoirs</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                          <h4 className="font-semibold text-orange-800">Mathématiques</h4>
                          <span className="ml-auto text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            Demain
                          </span>
                        </div>
                        <p className="text-sm text-orange-700">Exercices 15-17, chapitre 3</p>
                        <p className="text-xs text-orange-600 mt-1">M. Martin - Salle 201</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <h4 className="font-semibold text-blue-800">Physique</h4>
                          <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Vendredi
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">TP sur les circuits électriques</p>
                        <p className="text-xs text-blue-600 mt-1">Mme Dubois - Labo Physique</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <h4 className="font-semibold text-green-800">SVT</h4>
                          <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            Lundi
                          </span>
                        </div>
                        <p className="text-sm text-green-700">Révision contrôle sur la génétique</p>
                        <p className="text-xs text-green-600 mt-1">M. Bernard - Salle 105</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Column - Dernières notes */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className='text-black font-bold'>Dernières notes</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-green-600">M</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Mathématiques</div>
                        <div className="text-sm text-gray-600">Contrôle continu</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">17/20</div>
                      <div className="text-xs text-gray-500">+2.5 pts</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-blue-600">F</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Français</div>
                        <div className="text-sm text-gray-600">Dissertation</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">14/20</div>
                      <div className="text-xs text-gray-500">+1.0 pt</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-purple-600">H</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Histoire</div>
                        <div className="text-sm text-gray-600">Exposé</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">15/20</div>
                      <div className="text-xs text-gray-500">+0.5 pt</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

                              {/* Additional Sections */}
                      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mt-8">
                        {/* Training Stats */}
                        <TrainingStats studentId={user?.id || ''} />
                        
                        {/* Recent Announcements */}
                        <RecentAnnouncements />

                        {/* Work Group Stats */}
                        <WorkGroupStats studentId={user?.id || ''} />

                        {/* AI Assistant Stats */}
                        <AIAssistantStats studentId={user?.id || ''} />
                      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
