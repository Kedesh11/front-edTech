'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { 
  AIAgent, 
  AIConversation, 
  AIAgentFilter,
  AI_AGENT_SUBJECTS,
  AI_AGENT_CAPABILITIES,
  isAgentAvailable,
  getAgentAvailabilityStatus,
  getRestrictionMessage
} from '@/types/ai-agents';
import { Student } from '@/types/user';
import {
  mockAIAgents,
  mockAIConversations,
  mockExamSessions,
  mockHomeworkSessions,
  getAIAgentsBySubject,
  getStudentConversations,
  getActiveExamSession,
  getActiveHomeworkSession,
  createConversation,
  addMessageToConversation,
  generateAIResponse,
} from '@/data/mock-ai-agents';

export default function AIAssistantsPage() {
  const { user } = useAuth();
  const student = user as Student;

  // États
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<AIAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<AIConversation | null>(null);
  const [filters, setFilters] = useState<AIAgentFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showStartConversation, setShowStartConversation] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [conversationTopic, setConversationTopic] = useState('');
  const [conversationSubject, setConversationSubject] = useState('');

  // Sessions actives
  const [activeExamSession, setActiveExamSession] = useState(getActiveExamSession(student?.id || ''));
  const [activeHomeworkSession, setActiveHomeworkSession] = useState(getActiveHomeworkSession(student?.id || ''));

  // Chargement des données
  useEffect(() => {
    setAgents(mockAIAgents);
    setConversations(getStudentConversations(student?.id || ''));
  }, [student?.id]);

  // Filtrage des agents
  useEffect(() => {
    let filtered = agents;

    // Filtre par matière
    if (filters.subject) {
      filtered = filtered.filter(agent => agent.subjects.includes(filters.subject!));
    }

    // Filtre par capacité
    if (filters.capability) {
      filtered = filtered.filter(agent => agent.capabilities[filters.capability!]);
    }

    // Filtre par statut actif
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(agent => agent.isActive === filters.isActive);
    }

    // Filtre par disponibilité
    if (filters.availability) {
      filtered = filtered.filter(agent => {
        const status = getAgentAvailabilityStatus(agent, mockExamSessions, mockHomeworkSessions);
        return status === filters.availability;
      });
    }

    // Recherche textuelle
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredAgents(filtered);
  }, [agents, filters, searchTerm, mockExamSessions, mockHomeworkSessions]);

  // Vérification des restrictions
  const restrictionMessage = getRestrictionMessage(mockExamSessions, mockHomeworkSessions);
  const isRestricted = !!restrictionMessage;

  // Fonctions
  const handleStartConversation = () => {
    if (!selectedAgent || !conversationTopic || !conversationSubject) return;

    const newConversation = createConversation(
      selectedAgent.id,
      student?.id || '',
      conversationSubject,
      conversationTopic,
      {
        currentLesson: conversationSubject,
        currentExercise: conversationTopic,
      }
    );

    setConversations(prev => [...prev, newConversation]);
    setActiveConversation(newConversation);
    setShowStartConversation(false);
    setConversationTopic('');
    setConversationSubject('');
  };

  const handleSendMessage = () => {
    if (!activeConversation || !newMessage.trim()) return;

    // Ajouter le message de l'étudiant
    addMessageToConversation(activeConversation.id, 'student', newMessage);

    // Générer la réponse de l'IA
    const aiResponse = generateAIResponse(selectedAgent!, newMessage, {
      subject: activeConversation.subject,
      topic: activeConversation.topic,
    });
    addMessageToConversation(activeConversation.id, 'ai', aiResponse);

    // Mettre à jour les conversations
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { ...conv, messages: [...conv.messages] }
          : conv
      )
    );

    setNewMessage('');
  };

  const getAvailabilityBadge = (agent: AIAgent) => {
    const status = getAgentAvailabilityStatus(agent, mockExamSessions, mockHomeworkSessions);
    
    switch (status) {
      case 'available':
        return <Badge variant="default" className="bg-green-100 text-green-800">Disponible</Badge>;
      case 'busy':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Occupé</Badge>;
      case 'restricted':
        return <Badge variant="default" className="bg-red-100 text-red-800">Restreint</Badge>;
      case 'offline':
        return <Badge variant="default" className="bg-gray-100 text-gray-800">Hors ligne</Badge>;
      default:
        return <Badge variant="default" className="bg-gray-100 text-gray-800">Inconnu</Badge>;
    }
  };

  const getCapabilitiesBadges = (agent: AIAgent) => {
    return Object.entries(agent.capabilities)
      .filter(([_, enabled]) => enabled)
      .map(([capability, _]) => (
        <Badge key={capability} variant="default" className="text-xs mr-1 mb-1">
          {capability === 'courseHelp' && 'Cours'}
          {capability === 'exerciseHelp' && 'Exercices'}
          {capability === 'homeworkHelp' && 'Devoirs'}
          {capability === 'examHelp' && 'Examens'}
          {capability === 'explanation' && 'Explications'}
          {capability === 'examples' && 'Exemples'}
          {capability === 'stepByStep' && 'Étape par étape'}
        </Badge>
      ));
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
          {/* Header fixe */}
          <div className="flex-shrink-0 space-y-6 pb-6 bg-white">
            {/* Titre et badge */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Assistants IA</h1>
                <p className="text-gray-600 mt-2">
                  Consultez nos agents IA spécialisés pour obtenir de l'aide sur vos cours et exercices
                </p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                🤖 {agents.filter(a => a.isActive).length} agents disponibles
              </Badge>
            </div>

            {/* Message de restriction */}
            {isRestricted && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 font-medium">
                      {restrictionMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Filtres */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recherche
                </label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un agent..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matière
                </label>
                <Select
                  value={filters.subject || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value || undefined }))}
                >
                  <option value="">Toutes les matières</option>
                  {AI_AGENT_SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacité
                </label>
                <Select
                  value={filters.capability || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, capability: e.target.value as any || undefined }))}
                >
                  <option value="">Toutes les capacités</option>
                  <option value="courseHelp">Aide aux cours</option>
                  <option value="exerciseHelp">Aide aux exercices</option>
                  <option value="homeworkHelp">Aide aux devoirs</option>
                  <option value="explanation">Explications</option>
                  <option value="examples">Exemples</option>
                  <option value="stepByStep">Étape par étape</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disponibilité
                </label>
                <Select
                  value={filters.availability || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value as any || undefined }))}
                >
                  <option value="">Tous les statuts</option>
                  <option value="available">Disponible</option>
                  <option value="busy">Occupé</option>
                  <option value="restricted">Restreint</option>
                  <option value="offline">Hors ligne</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Liste des agents - Scrollable */}
              <div className="lg:col-span-1">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Agents disponibles</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden min-h-0">
                    <div className="h-full overflow-y-auto space-y-4 pr-2">
                      {filteredAgents.map(agent => (
                        <div
                          key={agent.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedAgent?.id === agent.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {agent.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {agent.name}
                                </h3>
                                {getAvailabilityBadge(agent)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {agent.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {agent.subjects.map(subject => (
                                  <Badge key={subject} variant="default" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>⭐ {agent.statistics.averageRating.toFixed(1)}</span>
                                <span>💬 {agent.statistics.totalConversations}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Détail de l'agent - Fixed height, scrollable content */}
              <div className="lg:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-lg">Détail de l'agent</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    {selectedAgent ? (
                      <div className="h-full overflow-y-auto space-y-6 pr-2">
                        {/* Informations de l'agent */}
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                            {selectedAgent.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              {selectedAgent.name}
                            </h2>
                            <p className="text-gray-600 mb-4">
                              {selectedAgent.description}
                            </p>
                            <div className="flex items-center space-x-4 mb-4">
                              {getAvailabilityBadge(selectedAgent)}
                              <span className="text-sm text-gray-500">
                                Dernière activité : {new Date(selectedAgent.statistics.lastActive).toLocaleString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Capacités */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Capacités</h3>
                          <div className="flex flex-wrap gap-2">
                            {getCapabilitiesBadges(selectedAgent)}
                          </div>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedAgent.statistics.totalConversations}
                            </div>
                            <div className="text-sm text-gray-600">Conversations</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {selectedAgent.statistics.averageRating.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600">Note moyenne</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              {selectedAgent.statistics.totalHelpProvided}
                            </div>
                            <div className="text-sm text-gray-600">Aides fournies</div>
                          </div>
                        </div>

                        {/* Bouton pour démarrer une conversation */}
                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => setShowStartConversation(true)}
                            disabled={isRestricted}
                            className="w-full"
                          >
                            {isRestricted ? 'Agents temporairement indisponibles' : 'Démarrer une conversation'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🤖</div>
                          <p>Sélectionnez un agent pour voir ses détails</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Modal pour démarrer une conversation */}
        {showStartConversation && selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Démarrer une conversation avec {selectedAgent.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matière
                  </label>
                  <Select
                    value={conversationSubject}
                    onChange={(e) => setConversationSubject(e.target.value)}
                  >
                    <option value="">Sélectionner une matière</option>
                    {selectedAgent.subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet de la conversation
                  </label>
                  <Textarea
                    value={conversationTopic}
                    onChange={(e) => setConversationTopic(e.target.value)}
                    placeholder="Ex: Équations du second degré, Analyse de texte, etc."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setShowStartConversation(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleStartConversation}
                  disabled={!conversationSubject || !conversationTopic}
                  className="flex-1"
                >
                  Démarrer
                </Button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
} 