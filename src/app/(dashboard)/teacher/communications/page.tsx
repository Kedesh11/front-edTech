'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/mock/types';
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
  ProjectsIcon,
} from '@/components/shared/dashboard/icons';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'email' | 'notification' | 'announcement';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Marie Dupont (Parent)',
    recipient: 'Jean Dupont',
    subject: 'Question sur les devoirs de mathématiques',
    content: 'Bonjour, j\'aimerais savoir si vous pourriez m\'expliquer les exercices donnés cette semaine...',
    date: '2025-07-27T10:30:00',
    isRead: false,
    priority: 'medium',
    type: 'email'
  },
  {
    id: '2',
    sender: 'Administration',
    recipient: 'Tous les enseignants',
    subject: 'Réunion pédagogique - Lundi 29 juillet',
    content: 'Rappel : Réunion pédagogique lundi 29 juillet à 11h30 en salle des professeurs.',
    date: '2025-07-26T14:00:00',
    isRead: true,
    priority: 'high',
    type: 'announcement'
  },
  {
    id: '3',
    sender: 'Pierre Martin (Parent)',
    recipient: 'Jean Dupont',
    subject: 'Absence de mon fils',
    content: 'Mon fils sera absent demain pour un rendez-vous médical.',
    date: '2025-07-26T09:15:00',
    isRead: true,
    priority: 'low',
    type: 'email'
  },
  {
    id: '4',
    sender: 'Système',
    recipient: 'Jean Dupont',
    subject: 'Nouveau devoir soumis',
    content: 'Un nouveau devoir a été soumis par l\'élève Sophie Bernard pour le cours de mathématiques.',
    date: '2025-07-25T16:45:00',
    isRead: false,
    priority: 'medium',
    type: 'notification'
  }
];

export default function TeacherCommunications() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const message: Message = {
      id: Date.now().toString(),
      sender: user?.firstName + ' ' + user?.lastName || 'Jean Dupont',
      recipient: newMessage.recipient,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      isRead: false,
      priority: newMessage.priority,
      type: 'email'
    };
    setMessages([message, ...messages]);
    setNewMessage({
      recipient: '',
      subject: '',
      content: '',
      priority: 'medium'
    });
    setIsComposing(false);
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: Message['type']) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'notification':
        return '🔔';
      case 'announcement':
        return '📢';
      default:
        return '📄';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (selectedType && message.type !== selectedType) return false;
    if (selectedPriority && message.priority !== selectedPriority) return false;
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

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
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Communications
              </h1>
              <p className="text-lg text-gray-600">
                Gérez vos messages, annonces et communications avec les parents et l'équipe pédagogique.
              </p>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Messages non lus :</span>
                <span className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsComposing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouveau message
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les types</option>
              <option value="email">Emails</option>
              <option value="notification">Notifications</option>
              <option value="announcement">Annonces</option>
            </Select>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </Select>
          </div>

          {/* Compose Message */}
          {isComposing && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau message</h3>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinataire
                  </label>
                  <Input
                    type="text"
                    value={newMessage.recipient}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, recipient: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Marie Dupont (Parent)"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <Input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sujet du message"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <Select
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contenu du message..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Envoyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer transition-colors ${
                  !message.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) markAsRead(message.id);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getTypeIcon(message.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.subject}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                          {message.priority === 'high' ? 'Haute' : message.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        De : {message.sender}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {message.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(message.date).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Répondre
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredMessages.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <p className="text-gray-500">Aucun message trouvé.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
