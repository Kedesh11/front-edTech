'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { DashboardLayout, SidebarItem } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectsIcon, DashboardIcon, AnnouncementsIcon, DocumentsIcon, TrainingsIcon, CalendarIcon, RequestsIcon } from '@/components/shared/dashboard/icons';

const mockConversations = [
  { 
    id: 1, 
    name: 'Parent: Alex Dupont', 
    lastMessage: 'Merci pour votre retour concernant les devoirs.', 
    unread: 2,
    avatar: 'AD',
    time: '2h ago',
    status: 'En cours',
    role: 'Parent de 1ère A'
  },
  { 
    id: 2, 
    name: 'Parent: Emma Dupont', 
    lastMessage: 'On se voit à la réunion parents-profs.', 
    unread: 0,
    avatar: 'ED',
    time: '1d ago',
    status: 'Confirmé',
    role: 'Parent de 3ème B'
  },
];

const mockMessages = {
  1: [
    { from: 'teacher', text: 'Bonjour, avez-vous vu les devoirs de mathématiques ?', time: '09:00' },
    { from: 'parent', text: 'Oui, merci ! Alex les a bien reçus.', time: '09:05' },
    { from: 'teacher', text: 'N\'hésitez pas si vous avez des questions.', time: '09:10' },
    { from: 'parent', text: 'Merci pour votre retour concernant les devoirs.', time: '09:12' },
  ],
  2: [
    { from: 'teacher', text: 'Bonjour, la réunion est confirmée pour vendredi.', time: '08:00' },
    { from: 'parent', text: 'On se voit à la réunion parents-profs.', time: '08:05' },
  ],
};

export default function TeacherDiscussions() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(1);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messages = mockMessages[selected as 1 | 2] || [];
  const selectedConversation = mockConversations.find(c => c.id === selected);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Ici tu peux ajouter la logique pour envoyer le fichier
      console.log('Fichier sélectionné:', file.name);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || selectedFile) {
      // Ici tu peux ajouter la logique pour envoyer le message et/ou le fichier
      console.log('Envoi du message:', input);
      if (selectedFile) {
        console.log('Envoi du fichier:', selectedFile.name);
      }
      setInput('');
      setSelectedFile(null);
    }
  };

  const sidebarItems: SidebarItem[] = [
    { icon: <DashboardIcon />, label: 'Tableau de bord', href: '/teacher/dashboard' },
    { icon: <DocumentsIcon />, label: 'Cours', href: '/teacher/courses' },
    { icon: <ProjectsIcon />, label: 'Notes & Évaluations', href: '/teacher/grades' },
    { icon: <RequestsIcon />, label: 'Devoirs', href: '/teacher/assignments' },
    { icon: <CalendarIcon />, label: 'Emploi du temps', href: '/teacher/schedule' },
    { icon: <AnnouncementsIcon />, label: 'Communications', href: '/teacher/communications' },
    { icon: <TrainingsIcon />, label: 'Ressources pédagogiques', href: '/teacher/resources' },
    { icon: <AnnouncementsIcon />, label: 'Discussion', href: '/teacher/discussions' },
    { icon: <ProjectsIcon />, label: 'Statistiques', href: '/teacher/statistics' },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      user={{
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        role: user?.role || '',
      }}
    >
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="flex h-[70vh] bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
          {/* Liste des conversations */}
          <aside className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Messages</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input
                  className="pl-10 pr-10"
                  placeholder="Search a message here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {mockConversations.map(conv => (
                <li key={conv.id} onClick={() => setSelected(conv.id)}
                    className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-50 ${selected === conv.id ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {conv.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900 truncate">{conv.name}</p>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">{conv.role}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          conv.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {conv.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
          {/* Fenêtre de messages */}
          <section className="flex-1 flex flex-col">
            {selectedConversation && (
              <>
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-500">{selectedConversation.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  {messages.map((msg: { from: string; text: string; time: string }, i: number) => (
                    <div key={i} className={`flex ${msg.from === 'teacher' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                        msg.from === 'teacher' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === 'teacher' ? 'text-orange-100' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <label className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      />
                    </label>
                    {selectedFile && (
                      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-xs text-blue-700 truncate max-w-20">{selectedFile.name}</span>
                        <button 
                          type="button" 
                          onClick={() => setSelectedFile(null)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <Input
                      className="flex-1"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                    <button type="submit" className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
} 