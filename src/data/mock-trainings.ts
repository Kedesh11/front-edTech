import { Training, TrainingEnrollment } from '@/types/content';

export const mockTrainings: Training[] = [
  {
    id: 'train-1',
    title: 'Excel Avancé pour les Étudiants',
    description: 'Maîtrisez les fonctionnalités avancées d\'Excel : formules complexes, tableaux croisés dynamiques, macros et automatisation.',
    instructor: {
      id: 'teacher-1',
      name: 'Sophie Martin',
      department: 'Sciences'
    },
    category: 'technology',
    level: 'intermediate',
    duration: {
      hours: 12,
      minutes: 0
    },
    schedule: {
      startDate: '2024-12-20T09:00:00Z',
      endDate: '2024-12-21T17:00:00Z',
      sessions: [
        {
          day: '2024-12-20',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-20',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-21',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-21',
          time: '14:00-17:00',
          duration: 180
        }
      ]
    },
    location: {
      type: 'classroom',
      room: 'Salle informatique A'
    },
    maxParticipants: 20,
    currentParticipants: 15,
    prerequisites: ['Connaissance de base d\'Excel', 'Niveau lycée'],
    objectives: [
      'Maîtriser les formules avancées',
      'Créer des tableaux croisés dynamiques',
      'Automatiser des tâches avec les macros',
      'Analyser des données complexes'
    ],
    materials: [
      {
        name: 'Manuel Excel Avancé',
        type: 'document',
        url: '/materials/excel-advanced-manual.pdf',
        description: 'Guide complet des fonctionnalités avancées'
      },
      {
        name: 'Fichiers d\'exercices',
        type: 'document',
        url: '/materials/excel-exercises.zip',
        description: 'Fichiers Excel pour les exercices pratiques'
      },
      {
        name: 'Vidéos de démonstration',
        type: 'video',
        url: '/materials/excel-demos',
        description: 'Série de vidéos explicatives'
      }
    ],
    status: 'upcoming',
    enrollmentStatus: 'open',
    certificate: true,
    price: 0,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z'
  },
  {
    id: 'train-2',
    title: 'Préparation au Bac - Mathématiques',
    description: 'Formation intensive de révision pour le baccalauréat en mathématiques. Couvre tous les chapitres du programme.',
    instructor: {
      id: 'teacher-2',
      name: 'Jean Dupont',
      department: 'Mathématiques'
    },
    category: 'academic',
    level: 'advanced',
    duration: {
      hours: 20,
      minutes: 0
    },
    schedule: {
      startDate: '2024-12-25T09:00:00Z',
      endDate: '2024-12-29T17:00:00Z',
      sessions: [
        {
          day: '2024-12-25',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-25',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-26',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-26',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-27',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-27',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-28',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-28',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-29',
          time: '09:00-12:00',
          duration: 180
        },
        {
          day: '2024-12-29',
          time: '14:00-17:00',
          duration: 180
        }
      ]
    },
    location: {
      type: 'classroom',
      room: 'Salle 201'
    },
    maxParticipants: 25,
    currentParticipants: 22,
    prerequisites: ['Niveau Terminale', 'Bases solides en mathématiques'],
    objectives: [
      'Réviser tous les chapitres du programme',
      'S\'entraîner sur des exercices type bac',
      'Améliorer la méthodologie',
      'Gérer le stress de l\'examen'
    ],
    materials: [
      {
        name: 'Annales corrigées',
        type: 'document',
        url: '/materials/math-annales.pdf',
        description: 'Sujets et corrigés des années précédentes'
      },
      {
        name: 'Formulaire complet',
        type: 'document',
        url: '/materials/math-formulas.pdf',
        description: 'Toutes les formules à connaître'
      }
    ],
    status: 'upcoming',
    enrollmentStatus: 'open',
    certificate: false,
    price: 50,
    createdAt: '2024-11-10T14:00:00Z',
    updatedAt: '2024-11-10T14:00:00Z'
  },
  {
    id: 'train-3',
    title: 'Communication et Présentation',
    description: 'Développez vos compétences en communication orale et en présentation. Idéal pour les oraux et la vie professionnelle.',
    instructor: {
      id: 'teacher-3',
      name: 'Marie Laurent',
      department: 'Lettres'
    },
    category: 'soft-skills',
    level: 'beginner',
    duration: {
      hours: 8,
      minutes: 0
    },
    schedule: {
      startDate: '2024-12-15T14:00:00Z',
      endDate: '2024-12-16T17:00:00Z',
      sessions: [
        {
          day: '2024-12-15',
          time: '14:00-18:00',
          duration: 240
        },
        {
          day: '2024-12-16',
          time: '09:00-13:00',
          duration: 240
        }
      ]
    },
    location: {
      type: 'hybrid',
      room: 'Amphithéâtre B',
      platform: 'Zoom',
      link: 'https://zoom.us/j/123456789'
    },
    maxParticipants: 30,
    currentParticipants: 18,
    prerequisites: ['Aucun prérequis'],
    objectives: [
      'Améliorer la confiance en soi',
      'Maîtriser les techniques de présentation',
      'Gérer le stress de l\'oral',
      'Structurer un discours efficace'
    ],
    materials: [
      {
        name: 'Guide de la communication',
        type: 'document',
        url: '/materials/communication-guide.pdf',
        description: 'Manuel pratique de communication'
      },
      {
        name: 'Exercices pratiques',
        type: 'document',
        url: '/materials/communication-exercises.pdf',
        description: 'Exercices pour s\'entraîner'
      }
    ],
    status: 'upcoming',
    enrollmentStatus: 'open',
    certificate: true,
    price: 25,
    createdAt: '2024-11-20T09:00:00Z',
    updatedAt: '2024-11-20T09:00:00Z'
  },
  {
    id: 'train-4',
    title: 'Programmation Python - Débutant',
    description: 'Initiation à la programmation avec Python. Apprenez les bases de la programmation de manière ludique.',
    instructor: {
      id: 'teacher-4',
      name: 'Alexandre Moreau',
      department: 'Informatique'
    },
    category: 'technology',
    level: 'beginner',
    duration: {
      hours: 16,
      minutes: 0
    },
    schedule: {
      startDate: '2024-12-10T14:00:00Z',
      endDate: '2024-12-13T17:00:00Z',
      sessions: [
        {
          day: '2024-12-10',
          time: '14:00-18:00',
          duration: 240
        },
        {
          day: '2024-12-11',
          time: '14:00-18:00',
          duration: 240
        },
        {
          day: '2024-12-12',
          time: '14:00-18:00',
          duration: 240
        },
        {
          day: '2024-12-13',
          time: '14:00-18:00',
          duration: 240
        }
      ]
    },
    location: {
      type: 'online',
      platform: 'Teams',
      link: 'https://teams.microsoft.com/l/meetup-join/123456789'
    },
    maxParticipants: 35,
    currentParticipants: 35,
    prerequisites: ['Aucun prérequis'],
    objectives: [
      'Comprendre les concepts de base de la programmation',
      'Maîtriser la syntaxe Python',
      'Créer des programmes simples',
      'Résoudre des problèmes algorithmiques'
    ],
    materials: [
      {
        name: 'Tutoriel Python',
        type: 'document',
        url: '/materials/python-tutorial.pdf',
        description: 'Guide d\'apprentissage Python'
      },
      {
        name: 'Environnement de développement',
        type: 'tool',
        url: 'https://replit.com',
        description: 'Plateforme en ligne pour coder'
      }
    ],
    status: 'upcoming',
    enrollmentStatus: 'closed',
    certificate: true,
    price: 0,
    createdAt: '2024-11-05T16:00:00Z',
    updatedAt: '2024-11-05T16:00:00Z'
  },
  {
    id: 'train-5',
    title: 'Orientation Post-Bac',
    description: 'Formation pour vous aider à choisir votre orientation après le bac. Découvrez les différentes filières et métiers.',
    instructor: {
      id: 'counselor-1',
      name: 'Isabelle Rousseau',
      department: 'Orientation'
    },
    category: 'career',
    level: 'beginner',
    duration: {
      hours: 6,
      minutes: 0
    },
    schedule: {
      startDate: '2024-12-18T14:00:00Z',
      endDate: '2024-12-18T20:00:00Z',
      sessions: [
        {
          day: '2024-12-18',
          time: '14:00-17:00',
          duration: 180
        },
        {
          day: '2024-12-18',
          time: '18:00-21:00',
          duration: 180
        }
      ]
    },
    location: {
      type: 'classroom',
      room: 'Salle de conférence'
    },
    maxParticipants: 40,
    currentParticipants: 28,
    prerequisites: ['Niveau Terminale'],
    objectives: [
      'Découvrir les différentes filières d\'études',
      'Comprendre les débouchés professionnels',
      'Évaluer ses compétences et intérêts',
      'Préparer son projet d\'orientation'
    ],
    materials: [
      {
        name: 'Guide des formations',
        type: 'document',
        url: '/materials/formation-guide.pdf',
        description: 'Répertoire des formations post-bac'
      },
      {
        name: 'Test d\'orientation',
        type: 'link',
        url: '/orientation-test',
        description: 'Questionnaire d\'auto-évaluation'
      }
    ],
    status: 'upcoming',
    enrollmentStatus: 'open',
    certificate: false,
    price: 0,
    createdAt: '2024-11-25T11:00:00Z',
    updatedAt: '2024-11-25T11:00:00Z'
  }
];

export const mockEnrollments: TrainingEnrollment[] = [
  {
    id: 'enroll-1',
    trainingId: 'train-1',
    studentId: 'student-1',
    enrollmentDate: '2024-11-20T10:00:00Z',
    status: 'enrolled',
    progress: 0,
    lastAccessed: '2024-11-20T10:00:00Z'
  },
  {
    id: 'enroll-2',
    trainingId: 'train-3',
    studentId: 'student-1',
    enrollmentDate: '2024-11-22T14:30:00Z',
    status: 'enrolled',
    progress: 0,
    lastAccessed: '2024-11-22T14:30:00Z'
  },
  {
    id: 'enroll-3',
    trainingId: 'train-4',
    studentId: 'student-1',
    enrollmentDate: '2024-11-06T09:15:00Z',
    status: 'enrolled',
    progress: 0,
    lastAccessed: '2024-11-06T09:15:00Z'
  }
];

export const getTrainingsByCategory = (category: string): Training[] => {
  return mockTrainings.filter(training => training.category === category);
};

export const getTrainingsByLevel = (level: string): Training[] => {
  return mockTrainings.filter(training => training.level === level);
};

export const getStudentEnrollments = (studentId: string): TrainingEnrollment[] => {
  return mockEnrollments.filter(enrollment => enrollment.studentId === studentId);
};

export const enrollInTraining = (studentId: string, trainingId: string): TrainingEnrollment | null => {
  const training = mockTrainings.find(t => t.id === trainingId);
  if (!training || training.enrollmentStatus !== 'open' || training.currentParticipants >= training.maxParticipants) {
    return null;
  }

  const existingEnrollment = mockEnrollments.find(e => e.studentId === studentId && e.trainingId === trainingId);
  if (existingEnrollment) {
    return null;
  }

  const newEnrollment: TrainingEnrollment = {
    id: `enroll-${Date.now()}`,
    trainingId,
    studentId,
    enrollmentDate: new Date().toISOString(),
    status: 'enrolled',
    progress: 0,
    lastAccessed: new Date().toISOString()
  };

  mockEnrollments.push(newEnrollment);
  training.currentParticipants++;

  return newEnrollment;
}; 