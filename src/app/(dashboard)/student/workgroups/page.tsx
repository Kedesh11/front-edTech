'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { 
  WorkGroup, 
  WorkGroupFilter, 
  CreateWorkGroupForm,
  ALLOWED_CLASSES,
  ALLOWED_GRADES,
  DAYS_OF_WEEK,
  TIMEZONES,
  getWorkGroupStatus,
  formatMeetingSchedule,
  canStudentJoinWorkGroup,
  isOnlineMeeting,
  getCollaborationToolsCount
} from '@/types/workgroups';
import {
  mockWorkGroups,
  getWorkGroupsByClass,
  getWorkGroupsByGrade,
  getStudentWorkGroups,
  getWorkGroupsCreatedByStudent,
  getStudentInvitations,
  createWorkGroup,
  joinWorkGroup,
  leaveWorkGroup,
  canStudentJoinWorkGroup as canJoinWorkGroup
} from '@/data/mock-workgroups';
import { Student } from '@/types/user';

export default function WorkGroupsPage() {
  const { user } = useAuth();
  const student = user as Student;

  // États
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [filteredWorkGroups, setFilteredWorkGroups] = useState<WorkGroup[]>([]);
  const [selectedWorkGroup, setSelectedWorkGroup] = useState<WorkGroup | null>(null);
  const [filters, setFilters] = useState<WorkGroupFilter>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<CreateWorkGroupForm>({
    name: '',
    description: '',
    maxMembers: 5,
    tags: [],
    subject: '',
    onlineMeeting: {
      enabled: false,
      platform: 'internal',
    },
    meetingSchedule: undefined,
    collaborationTools: {
      chat: true,
      whiteboard: false,
      documentSharing: true,
      screenSharing: false,
      recording: false,
    },
  });
  const [myWorkGroups, setMyWorkGroups] = useState<WorkGroup[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);

  // Charger les données au montage
  useEffect(() => {
    if (student) {
      // Charger les groupes de la classe de l'étudiant
      const classWorkGroups = getWorkGroupsByClass(student.class);
      setWorkGroups(classWorkGroups);
      setFilteredWorkGroups(classWorkGroups);

      // Charger les groupes de l'étudiant
      const studentGroups = getStudentWorkGroups(student.id);
      setMyWorkGroups(studentGroups);

      // Charger les invitations
      const studentInvitations = getStudentInvitations(student.id);
      setInvitations(studentInvitations);
    }
  }, [student]);

  // Filtrer les groupes
  useEffect(() => {
    let filtered = workGroups;

    if (filters.subject) {
      filtered = filtered.filter(group => group.subject === filters.subject);
    }

    if (filters.isActive !== undefined) {
      filtered = filtered.filter(group => group.isActive === filters.isActive);
    }

    if (filters.hasSpace) {
      filtered = filtered.filter(group => group.currentMembers < group.maxMembers);
    }

    if (filters.createdByMe) {
      filtered = filtered.filter(group => group.createdBy === student?.id);
    }

    if (filters.memberOf) {
      const memberGroupIds = myWorkGroups.map(group => group.id);
      filtered = filtered.filter(group => memberGroupIds.includes(group.id));
    }

    setFilteredWorkGroups(filtered);
  }, [filters, workGroups, myWorkGroups, student]);

  const handleWorkGroupClick = (workGroup: WorkGroup) => {
    setSelectedWorkGroup(workGroup);
  };

  const handleCreateWorkGroup = () => {
    if (!student) return;

    const newWorkGroup = createWorkGroup({
      ...createForm,
      class: student.class,
      grade: student.grade,
      createdBy: student.id,
      isActive: true,
    });

    // Ajouter automatiquement le créateur comme membre
    joinWorkGroup(newWorkGroup.id, student.id);

    // Mettre à jour les listes
    setWorkGroups(prev => [...prev, newWorkGroup]);
    setMyWorkGroups(prev => [...prev, newWorkGroup]);
    setShowCreateForm(false);
    setCreateForm({
      name: '',
      description: '',
      maxMembers: 5,
      tags: [],
      subject: '',
      onlineMeeting: {
        enabled: false,
        platform: 'internal',
      },
      meetingSchedule: undefined,
      collaborationTools: {
        chat: true,
        whiteboard: false,
        documentSharing: true,
        screenSharing: false,
        recording: false,
      },
    });
  };

  const handleJoinWorkGroup = (workGroupId: string) => {
    if (!student) return;

    const success = joinWorkGroup(workGroupId, student.id);
    if (success) {
      // Mettre à jour les listes
      const updatedWorkGroups = workGroups.map(group => 
        group.id === workGroupId 
          ? { ...group, currentMembers: group.currentMembers + 1 }
          : group
      );
      setWorkGroups(updatedWorkGroups);

      const joinedGroup = workGroups.find(group => group.id === workGroupId);
      if (joinedGroup) {
        setMyWorkGroups(prev => [...prev, joinedGroup]);
      }
    }
  };

  const handleLeaveWorkGroup = (workGroupId: string) => {
    if (!student) return;

    const success = leaveWorkGroup(workGroupId, student.id);
    if (success) {
      // Mettre à jour les listes
      const updatedWorkGroups = workGroups.map(group => 
        group.id === workGroupId 
          ? { ...group, currentMembers: group.currentMembers - 1 }
          : group
      );
      setWorkGroups(updatedWorkGroups);

      setMyWorkGroups(prev => prev.filter(group => group.id !== workGroupId));
    }
  };

  const getStatusColor = (status: 'open' | 'full' | 'closed') => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: 'open' | 'full' | 'closed') => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'full': return 'Complet';
      case 'closed': return 'Fermé';
      default: return 'Inconnu';
    }
  };

  const isMemberOf = (workGroupId: string) => {
    return myWorkGroups.some(group => group.id === workGroupId);
  };

  const isCreatorOf = (workGroupId: string) => {
    return selectedWorkGroup?.createdBy === student?.id;
  };

  const canJoin = (workGroup: WorkGroup) => {
    if (!student) return false;
    return canJoinWorkGroup(student.class, student.grade, workGroup) && !isMemberOf(workGroup.id);
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="h-[calc(100vh-120px)] flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 space-y-6 pb-6 bg-white">
            {/* Title and Actions */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Groupes de travail</h1>
                <p className="text-gray-600 mt-1">
                  Créez et rejoignez des groupes de travail avec vos camarades de {student?.class}
                </p>
              </div>
              <div className="flex space-x-3">
                {invitations.length > 0 && (
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {invitations.length} invitation{invitations.length > 1 ? 's' : ''}
                  </Badge>
                )}
                <Button onClick={() => setShowCreateForm(true)}>
                  Créer un groupe
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select
                    label="Matière"
                    value={filters.subject || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      subject: e.target.value || undefined 
                    }))}
                  >
                    <option value="">Toutes les matières</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Français">Français</option>
                    <option value="Histoire-Géographie">Histoire-Géographie</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Langues">Langues</option>
                  </Select>

                  <Select
                    label="Statut"
                    value={filters.isActive === undefined ? '' : filters.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      isActive: e.target.value === '' ? undefined : e.target.value === 'active' 
                    }))}
                  >
                    <option value="">Tous</option>
                    <option value="active">Actifs</option>
                    <option value="inactive">Inactifs</option>
                  </Select>

                  <Select
                    label="Affichage"
                    value=""
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'available') {
                        setFilters(prev => ({ ...prev, hasSpace: true, createdByMe: undefined, memberOf: undefined }));
                      } else if (value === 'my-groups') {
                        setFilters(prev => ({ ...prev, memberOf: true, hasSpace: undefined, createdByMe: undefined }));
                      } else if (value === 'created-by-me') {
                        setFilters(prev => ({ ...prev, createdByMe: true, hasSpace: undefined, memberOf: undefined }));
                      } else {
                        setFilters(prev => ({ ...prev, hasSpace: undefined, createdByMe: undefined, memberOf: undefined }));
                      }
                    }}
                  >
                    <option value="">Tous les groupes</option>
                    <option value="available">Avec de la place</option>
                    <option value="my-groups">Mes groupes</option>
                    <option value="created-by-me">Créés par moi</option>
                  </Select>

                  <div className="flex items-end">
                    <Button
                      onClick={() => setFilters({})}
                      variant="outline"
                      className="w-full"
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* List - Scrollable */}
              <div className="lg:col-span-1">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Groupes disponibles</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden min-h-0">
                    <div className="h-full overflow-y-auto space-y-3 pr-2">
                      {filteredWorkGroups.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                          Aucun groupe trouvé
                        </p>
                      ) : (
                        filteredWorkGroups.map((workGroup) => {
                          const status = getWorkGroupStatus(workGroup);
                          const isMember = isMemberOf(workGroup.id);
                          
                          return (
                            <div
                              key={workGroup.id}
                              onClick={() => handleWorkGroupClick(workGroup)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                selectedWorkGroup?.id === workGroup.id
                                  ? 'ring-2 ring-blue-500 bg-blue-50'
                                  : 'bg-white'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-sm text-gray-900">
                                  {workGroup.name}
                                </h3>
                                <Badge className={`text-xs ${getStatusColor(status)}`}>
                                  {getStatusText(status)}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                {workGroup.description}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span>{workGroup.subject || 'Toutes matières'}</span>
                                <span>{workGroup.currentMembers}/{workGroup.maxMembers} membres</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {workGroup.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {workGroup.tags.length > 2 && (
                                    <span className="text-gray-400 text-xs">+{workGroup.tags.length - 2}</span>
                                  )}
                                </div>
                                
                                {isMember ? (
                                  <Badge variant="default" className="text-xs">
                                    Membre
                                  </Badge>
                                ) : canJoin(workGroup) ? (
                                  <Button
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleJoinWorkGroup(workGroup.id);
                                    }}
                                  >
                                    Rejoindre
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detail - Fixed height, scrollable content */}
              <div className="lg:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Détail du groupe</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    {selectedWorkGroup ? (
                      <div className="h-full overflow-y-auto space-y-6 pr-2">
                        {/* Header */}
                        <div className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                              {selectedWorkGroup.name}
                            </h2>
                            <Badge className={getStatusColor(getWorkGroupStatus(selectedWorkGroup))}>
                              {getStatusText(getWorkGroupStatus(selectedWorkGroup))}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span>Classe : {selectedWorkGroup.class}</span>
                            <span>•</span>
                            <span>{selectedWorkGroup.currentMembers}/{selectedWorkGroup.maxMembers} membres</span>
                            <span>•</span>
                            <span>Créé le {new Date(selectedWorkGroup.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {selectedWorkGroup.description}
                          </p>
                        </div>

                        {/* Matière */}
                        {selectedWorkGroup.subject && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Matière principale</h4>
                            <Badge variant="default">{selectedWorkGroup.subject}</Badge>
                          </div>
                        )}

                        {/* Tags */}
                        {selectedWorkGroup.tags.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedWorkGroup.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Planning des réunions */}
                        {selectedWorkGroup.meetingSchedule && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Planning des réunions</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {formatMeetingSchedule(selectedWorkGroup.meetingSchedule)}
                                  </p>
                                                                {selectedWorkGroup.onlineMeeting?.platform === 'internal' && (
                                <p className="text-sm text-blue-700">
                                  Réunion sur la plateforme
                                </p>
                              )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="border-t pt-4">
                          <div className="flex space-x-3">
                            {isMemberOf(selectedWorkGroup.id) ? (
                              isCreatorOf(selectedWorkGroup.id) ? (
                                <Button variant="outline" disabled>
                                  Créateur du groupe
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  onClick={() => handleLeaveWorkGroup(selectedWorkGroup.id)}
                                >
                                  Quitter le groupe
                                </Button>
                              )
                            ) : canJoin(selectedWorkGroup) ? (
                              <Button
                                onClick={() => handleJoinWorkGroup(selectedWorkGroup.id)}
                              >
                                Rejoindre le groupe
                              </Button>
                            ) : (
                              <Button variant="outline" disabled>
                                Groupe complet
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500">
                          Sélectionnez un groupe pour voir les détails
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de création de groupe */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Créer un nouveau groupe</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du groupe *
                  </label>
                  <Input
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Groupe de révision Mathématiques"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez l'objectif et le fonctionnement de votre groupe"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre maximum de membres *
                    </label>
                    <Select
                      value={createForm.maxMembers.toString()}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
                    >
                      <option value="3">3 membres</option>
                      <option value="4">4 membres</option>
                      <option value="5">5 membres</option>
                      <option value="6">6 membres</option>
                      <option value="8">8 membres</option>
                      <option value="10">10 membres</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Matière principale (optionnel)
                    </label>
                    <Select
                      value={createForm.subject || ''}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, subject: e.target.value || undefined }))}
                    >
                      <option value="">Aucune matière spécifique</option>
                      <option value="Mathématiques">Mathématiques</option>
                      <option value="Français">Français</option>
                      <option value="Histoire-Géographie">Histoire-Géographie</option>
                      <option value="Sciences">Sciences</option>
                      <option value="Langues">Langues</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (séparés par des virgules)
                  </label>
                  <Input
                    value={createForm.tags.join(', ')}
                    onChange={(e) => setCreateForm(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                    }))}
                    placeholder="Ex: révision, algèbre, géométrie"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jour de réunion
                    </label>
                    <Select
                      value={createForm.meetingSchedule?.day || ''}
                      onChange={(e) => setCreateForm(prev => ({ 
                        ...prev, 
                        meetingSchedule: e.target.value ? {
                          ...prev.meetingSchedule,
                          day: e.target.value,
                          time: prev.meetingSchedule?.time || '14:00',
                          duration: prev.meetingSchedule?.duration || 60,
                        } : undefined
                      }))}
                    >
                      <option value="">Aucune réunion planifiée</option>
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure de réunion
                    </label>
                    <Input
                      type="time"
                      value={createForm.meetingSchedule?.time || ''}
                      onChange={(e) => setCreateForm(prev => ({ 
                        ...prev, 
                        meetingSchedule: prev.meetingSchedule ? {
                          ...prev.meetingSchedule,
                          time: e.target.value,
                        } : undefined
                      }))}
                      disabled={!createForm.meetingSchedule}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuseau horaire
                  </label>
                  <Select
                    value={createForm.meetingSchedule?.timezone || 'Europe/Paris'}
                    onChange={(e) => setCreateForm(prev => ({ 
                      ...prev, 
                      meetingSchedule: prev.meetingSchedule ? {
                        ...prev.meetingSchedule,
                        timezone: e.target.value as string,
                      } : {
                        day: 'Lundi',
                        time: '14:00',
                        duration: 60,
                        timezone: e.target.value as string,
                      }
                    }))}
                  >
                    {TIMEZONES.map(timezone => (
                      <option key={timezone} value={timezone}>{timezone}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleCreateWorkGroup}
                  disabled={!createForm.name || !createForm.description}
                >
                  Créer le groupe
                </Button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
} 