import { Announcement } from '@/types/content';

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Réunion parents-professeurs - 15 décembre',
    content: 'La réunion parents-professeurs aura lieu le 15 décembre de 18h à 20h. Tous les parents sont invités à participer pour discuter du progrès de leurs enfants.',
    author: {
      id: 'admin-1',
      name: 'Pierre Durand',
      role: 'Administrateur'
    },
    category: 'event',
    priority: 'high',
    targetAudience: ['parent', 'student'],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    expiresAt: '2024-12-15T20:00:00Z',
    isRead: false,
    tags: ['réunion', 'parents', 'professeurs']
  },
  {
    id: 'ann-2',
    title: 'Maintenance système - 10 décembre',
    content: 'Le système sera en maintenance le 10 décembre de 22h à 02h. Pendant cette période, l\'accès à la plateforme sera temporairement indisponible.',
    author: {
      id: 'technician-1',
      name: 'Lucas Bernard',
      role: 'Technicien'
    },
    category: 'general',
    priority: 'medium',
    targetAudience: ['student', 'parent', 'teacher', 'admin'],
    createdAt: '2024-12-01T14:30:00Z',
    updatedAt: '2024-12-01T14:30:00Z',
    expiresAt: '2024-12-10T02:00:00Z',
    isRead: true,
    tags: ['maintenance', 'système']
  },
  {
    id: 'ann-3',
    title: 'Devoir de mathématiques - Chapitre 4',
    content: 'Le devoir de mathématiques sur le chapitre 4 (Fonctions exponentielles) est à rendre pour le 12 décembre. Consultez les ressources en ligne pour vous préparer.',
    author: {
      id: 'teacher-1',
      name: 'Sophie Martin',
      role: 'Enseignante'
    },
    category: 'academic',
    priority: 'high',
    targetAudience: ['student'],
    attachments: [
      {
        name: 'Devoir_Chapitre4.pdf',
        url: '/documents/devoir-math-ch4.pdf',
        type: 'application/pdf',
        size: 245760
      }
    ],
    createdAt: '2024-12-02T09:15:00Z',
    updatedAt: '2024-12-02T09:15:00Z',
    expiresAt: '2024-12-12T23:59:00Z',
    isRead: false,
    tags: ['devoir', 'mathématiques', 'chapitre 4']
  },
  {
    id: 'ann-4',
    title: 'Rappel : Code vestimentaire',
    content: 'Rappel important : le code vestimentaire doit être respecté. Les tenues doivent être appropriées et décentes. Merci de votre coopération.',
    author: {
      id: 'admin-1',
      name: 'Pierre Durand',
      role: 'Administrateur'
    },
    category: 'reminder',
    priority: 'medium',
    targetAudience: ['student', 'parent'],
    createdAt: '2024-12-02T11:00:00Z',
    updatedAt: '2024-12-02T11:00:00Z',
    isRead: true,
    tags: ['code vestimentaire', 'règlement']
  },
  {
    id: 'ann-5',
    title: 'Formation Excel avancé - Inscriptions ouvertes',
    content: 'Une formation Excel avancé sera organisée les 20 et 21 décembre. Places limitées à 20 participants. Inscriptions jusqu\'au 15 décembre.',
    author: {
      id: 'teacher-1',
      name: 'Sophie Martin',
      role: 'Enseignante'
    },
    category: 'academic',
    priority: 'low',
    targetAudience: ['student'],
    attachments: [
      {
        name: 'Programme_Formation_Excel.pdf',
        url: '/documents/programme-excel.pdf',
        type: 'application/pdf',
        size: 102400
      }
    ],
    createdAt: '2024-12-02T15:45:00Z',
    updatedAt: '2024-12-02T15:45:00Z',
    expiresAt: '2024-12-15T23:59:00Z',
    isRead: false,
    tags: ['formation', 'excel', 'inscription']
  },
  {
    id: 'ann-6',
    title: 'URGENT : Annulation cours de physique',
    content: 'Le cours de physique prévu aujourd\'hui à 14h est annulé en raison de l\'absence de l\'enseignant. Le cours sera reporté à une date ultérieure.',
    author: {
      id: 'admin-1',
      name: 'Pierre Durand',
      role: 'Administrateur'
    },
    category: 'emergency',
    priority: 'urgent',
    targetAudience: ['student'],
    createdAt: '2024-12-02T13:30:00Z',
    updatedAt: '2024-12-02T13:30:00Z',
    isRead: false,
    tags: ['annulation', 'physique', 'urgence']
  },
  {
    id: 'ann-7',
    title: 'Nouveau club de programmation',
    content: 'Un nouveau club de programmation sera créé à partir de janvier. Ouvert à tous les niveaux, du débutant au confirmé. Réunion d\'information le 10 janvier.',
    author: {
      id: 'teacher-4',
      name: 'Alexandre Moreau',
      role: 'Enseignant'
    },
    category: 'academic',
    priority: 'medium',
    targetAudience: ['student'],
    createdAt: '2024-12-03T09:00:00Z',
    updatedAt: '2024-12-03T09:00:00Z',
    expiresAt: '2024-12-10T18:00:00Z',
    isRead: false,
    tags: ['club', 'programmation', 'informatique']
  },
  {
    id: 'ann-8',
    title: 'Sortie au musée des sciences',
    content: 'Sortie éducative au musée des sciences le 20 décembre. Départ à 8h30, retour à 17h. Prévoir un pique-nique. Inscription obligatoire.',
    author: {
      id: 'teacher-1',
      name: 'Sophie Martin',
      role: 'Enseignante'
    },
    category: 'event',
    priority: 'medium',
    targetAudience: ['student', 'parent'],
    createdAt: '2024-12-03T14:15:00Z',
    updatedAt: '2024-12-03T14:15:00Z',
    expiresAt: '2024-12-15T23:59:00Z',
    isRead: true,
    tags: ['sortie', 'musée', 'sciences']
  },
  {
    id: 'ann-9',
    title: 'Rappel : Devoir de français',
    content: 'N\'oubliez pas de rendre votre devoir de français sur "Les Misérables" pour demain. Format numérique accepté.',
    author: {
      id: 'teacher-3',
      name: 'Marie Laurent',
      role: 'Enseignante'
    },
    category: 'reminder',
    priority: 'high',
    targetAudience: ['student'],
    createdAt: '2024-12-03T16:30:00Z',
    updatedAt: '2024-12-03T16:30:00Z',
    expiresAt: '2024-12-04T23:59:00Z',
    isRead: false,
    tags: ['devoir', 'français', 'rappel']
  },
  {
    id: 'ann-10',
    title: 'Maintenance informatique - Salle 203',
    content: 'La salle informatique 203 sera fermée pour maintenance le 5 décembre de 14h à 16h. Les cours prévus seront déplacés en salle 205.',
    author: {
      id: 'technician-1',
      name: 'Lucas Bernard',
      role: 'Technicien'
    },
    category: 'general',
    priority: 'low',
    targetAudience: ['student', 'teacher'],
    createdAt: '2024-12-03T17:45:00Z',
    updatedAt: '2024-12-03T17:45:00Z',
    expiresAt: '2024-12-05T16:00:00Z',
    isRead: true,
    tags: ['maintenance', 'salle', 'informatique']
  }
];

export const getAnnouncementsByAudience = (audience: string): Announcement[] => {
  return mockAnnouncements.filter(announcement => 
    announcement.targetAudience.includes(audience)
  );
};

export const getUnreadAnnouncements = (audience: string): Announcement[] => {
  return getAnnouncementsByAudience(audience).filter(announcement => !announcement.isRead);
};

export const markAnnouncementAsRead = (id: string): void => {
  const announcement = mockAnnouncements.find(ann => ann.id === id);
  if (announcement) {
    announcement.isRead = true;
  }
}; 