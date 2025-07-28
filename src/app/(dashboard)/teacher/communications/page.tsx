'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Teacher } from '@/types/user';
import { Communication, getPriorityColor } from '@/types/teacher';
import { getTeacherCommunications } from '@/data/mock-teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export default function TeacherCommunications() {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [filteredCommunications, setFilteredCommunications] = useState<Communication[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: '',
    content: '',
    recipients: { type: 'class' as const, ids: [] as string[] },
    priority: 'medium' as const,
  });

  useEffect(() => {
    if (teacher?.id) {
      const teacherCommunications = getTeacherCommunications(teacher.id);
      setCommunications(teacherCommunications);
      setFilteredCommunications(teacherCommunications);
    }
  }, [teacher?.id]);

  useEffect(() => {
    let filtered = communications;

    if (searchTerm) {
      filtered = filtered.filter(comm =>
        comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(comm => comm.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(comm => comm.priority === priorityFilter);
    }

    setFilteredCommunications(filtered);
  }, [communications, searchTerm, statusFilter, priorityFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = (status: Communication['status']) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'sent': return 'Envoyé';
      case 'read': return 'Lu';
      default: return status;
    }
  };

  const getPriorityText = (priority: Communication['priority']) => {
    switch (priority) {
      case 'low': return 'Faible';
      case 'medium': return 'Moyenne';
      case 'high': return 'Élevée';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.title && newMessage.content) {
      const communication: Communication = {
        id: `comm-${Date.now()}`,
        title: newMessage.title,
        content: newMessage.content,
        senderId: teacher.id,
        senderName: `${teacher.firstName} ${teacher.lastName}`,
        recipients: newMessage.recipients,
        priority: newMessage.priority,
        status: 'sent',
        sentAt: new Date().toISOString(),
        readBy: [],
      };

      setCommunications([communication, ...communications]);
      setNewMessage({
        title: '',
        content: '',
        recipients: { type: 'class', ids: [] },
        priority: 'medium',
      });
      setIsComposing(false);
    }
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
              <p className="text-gray-600">Gérez vos communications avec les élèves et parents</p>
            </div>
            <Button onClick={() => setIsComposing(true)}>
              Nouvelle communication
            </Button>
          </div>

          {/* Formulaire de nouvelle communication */}
          {isComposing && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle communication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <Input
                      value={newMessage.title}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Titre de la communication"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <Textarea
                      value={newMessage.content}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Contenu de votre message..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destinataires
                      </label>
                      <Select
                        value={newMessage.recipients.type}
                        onChange={(e) => setNewMessage(prev => ({ 
                          ...prev, 
                          recipients: { ...prev.recipients, type: e.target.value as any }
                        }))}
                      >
                        <option value="class">Classe</option>
                        <option value="student">Élève</option>
                        <option value="parent">Parent</option>
                        <option value="teacher">Enseignant</option>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priorité
                      </label>
                      <Select
                        value={newMessage.priority}
                        onChange={(e) => setNewMessage(prev => ({ 
                          ...prev, 
                          priority: e.target.value as any 
                        }))}
                      >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgente</option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSendMessage}>
                      Envoyer
                    </Button>
                    <Button variant="outline" onClick={() => setIsComposing(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher une communication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Tous les statuts</option>
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyé</option>
                <option value="read">Lu</option>
              </Select>
            </div>
            <div className="w-48">
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">Toutes les priorités</option>
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="urgent">Urgente</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des communications */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Communications ({filteredCommunications.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredCommunications.map((communication) => (
                      <div
                        key={communication.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedCommunication?.id === communication.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCommunication(communication)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{communication.title}</h3>
                          <Badge className={getPriorityColor(communication.priority)}>
                            {getPriorityText(communication.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {communication.content}
                        </p>
                                                 <div className="flex justify-between items-center text-xs text-gray-500">
                           <span>{formatDate(communication.sentAt || '')}</span>
                          <Badge 
                            variant="default" 
                            className={
                              communication.status === 'read' ? 'bg-green-100 text-green-800' :
                              communication.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {getStatusText(communication.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails de la communication */}
            <div className="lg:col-span-2">
              {selectedCommunication ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedCommunication.title}</CardTitle>
                                                 <p className="text-gray-600 mt-1">
                           Envoyé le {formatDate(selectedCommunication.sentAt || '')}
                         </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(selectedCommunication.priority)}>
                          {getPriorityText(selectedCommunication.priority)}
                        </Badge>
                        <Badge 
                          variant="default" 
                          className={
                            selectedCommunication.status === 'read' ? 'bg-green-100 text-green-800' :
                            selectedCommunication.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {getStatusText(selectedCommunication.status)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Contenu */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Contenu</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {selectedCommunication.content}
                          </p>
                        </div>
                      </div>

                      {/* Destinataires */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Destinataires</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Type</label>
                            <p className="text-gray-900">
                              {selectedCommunication.recipients.type === 'class' && 'Classe'}
                              {selectedCommunication.recipients.type === 'student' && 'Élève'}
                              {selectedCommunication.recipients.type === 'parent' && 'Parent'}
                              {selectedCommunication.recipients.type === 'teacher' && 'Enseignant'}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Nombre</label>
                            <p className="text-gray-900">{selectedCommunication.recipients.ids.length} destinataires</p>
                          </div>
                        </div>
                      </div>

                      {/* Statistiques de lecture */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Statistiques de lecture</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedCommunication.readBy.length}
                            </div>
                            <div className="text-sm text-gray-600">Lu par</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {selectedCommunication.recipients.ids.length - selectedCommunication.readBy.length}
                            </div>
                            <div className="text-sm text-gray-600">Non lu</div>
                          </div>
                        </div>
                      </div>

                      {/* Pièces jointes */}
                      {selectedCommunication.attachments && selectedCommunication.attachments.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Pièces jointes</h3>
                          <div className="space-y-2">
                            {selectedCommunication.attachments.map((attachment, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{attachment.name}</p>
                                  <p className="text-sm text-gray-600">{attachment.type}</p>
                                </div>
                                <Button size="sm" variant="outline">
                                  Télécharger
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="text-gray-500">Sélectionnez une communication pour voir les détails</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
