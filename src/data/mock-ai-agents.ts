import { AIAgent, AIConversation, AIMessage, ExamSession, HomeworkSession } from '@/types/ai-agents';

// Mock data pour les agents IA
export const mockAIAgents: AIAgent[] = [
  {
    id: 'ai-math-1',
    name: 'Mathéo',
    description: 'Assistant spécialisé en mathématiques, expert en algèbre, géométrie et calcul.',
    subject: 'Mathématiques',
    subjects: ['Mathématiques', 'Physique'],
    avatar: '/avatars/matheo.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: true,
    },
    personality: {
      tone: 'friendly',
      language: 'french',
      detailLevel: 'intermediate',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '2nde',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 1247,
      averageRating: 4.8,
      totalHelpProvided: 3421,
      lastActive: '2024-01-20T15:30:00Z',
    },
  },
  {
    id: 'ai-french-1',
    name: 'Sophie',
    description: 'Professeure virtuelle de français, spécialisée en littérature et grammaire.',
    subject: 'Français',
    subjects: ['Français', 'Littérature'],
    avatar: '/avatars/sophie.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: true,
    },
    personality: {
      tone: 'professional',
      language: 'french',
      detailLevel: 'advanced',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '2nde',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 892,
      averageRating: 4.6,
      totalHelpProvided: 2156,
      lastActive: '2024-01-20T14:45:00Z',
    },
  },
  {
    id: 'ai-science-1',
    name: 'Dr. Sciences',
    description: 'Expert en sciences (SVT, Physique-Chimie) avec approche expérimentale.',
    subject: 'Sciences',
    subjects: ['SVT', 'Physique-Chimie', 'Sciences'],
    avatar: '/avatars/dr-sciences.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: true,
    },
    personality: {
      tone: 'encouraging',
      language: 'french',
      detailLevel: 'intermediate',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '2nde',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 756,
      averageRating: 4.7,
      totalHelpProvided: 1892,
      lastActive: '2024-01-20T15:15:00Z',
    },
  },
  {
    id: 'ai-history-1',
    name: 'Clio',
    description: 'Historienne virtuelle spécialisée en histoire-géographie et culture générale.',
    subject: 'Histoire-Géographie',
    subjects: ['Histoire', 'Géographie', 'Culture générale'],
    avatar: '/avatars/clio.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: false,
    },
    personality: {
      tone: 'professional',
      language: 'french',
      detailLevel: 'advanced',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '2nde',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 634,
      averageRating: 4.5,
      totalHelpProvided: 1456,
      lastActive: '2024-01-20T13:20:00Z',
    },
  },
  {
    id: 'ai-english-1',
    name: 'Emma',
    description: 'Native English speaker, spécialisée en anglais et conversation.',
    subject: 'Anglais',
    subjects: ['Anglais', 'Conversation'],
    avatar: '/avatars/emma.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: true,
    },
    personality: {
      tone: 'friendly',
      language: 'english',
      detailLevel: 'intermediate',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '2nde',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 445,
      averageRating: 4.9,
      totalHelpProvided: 1123,
      lastActive: '2024-01-20T15:00:00Z',
    },
  },
  {
    id: 'ai-philosophy-1',
    name: 'Socrate',
    description: 'Philosophe virtuel spécialisé en philosophie et réflexion critique.',
    subject: 'Philosophie',
    subjects: ['Philosophie', 'Réflexion critique'],
    avatar: '/avatars/socrate.png',
    isActive: true,
    capabilities: {
      courseHelp: true,
      exerciseHelp: true,
      homeworkHelp: true,
      examHelp: false,
      explanation: true,
      examples: true,
      stepByStep: false,
    },
    personality: {
      tone: 'strict',
      language: 'french',
      detailLevel: 'advanced',
    },
    restrictions: {
      disabledDuringExams: true,
      disabledDuringHomework: true,
      gradeRestrictions: {
        minGrade: '1ère',
        maxGrade: 'Tle',
      },
    },
    statistics: {
      totalConversations: 234,
      averageRating: 4.4,
      totalHelpProvided: 567,
      lastActive: '2024-01-20T12:30:00Z',
    },
  },
];

// Mock data pour les conversations
export const mockAIConversations: AIConversation[] = [
  {
    id: 'conv-1',
    agentId: 'ai-math-1',
    studentId: 'student-1',
    subject: 'Mathématiques',
    topic: 'Équations du second degré',
    startedAt: '2024-01-20T14:00:00Z',
    lastMessageAt: '2024-01-20T14:30:00Z',
    isActive: true,
    context: {
      currentLesson: 'Équations du second degré',
      currentExercise: 'Exercice 5 page 45',
    },
    messages: [
      {
        id: 'msg-1',
        conversationId: 'conv-1',
        sender: 'student',
        content: 'Bonjour Mathéo ! J\'ai du mal avec les équations du second degré, pouvez-vous m\'aider ?',
        timestamp: '2024-01-20T14:00:00Z',
        messageType: 'text',
      },
      {
        id: 'msg-2',
        conversationId: 'conv-1',
        sender: 'ai',
        content: '😊 Bonjour ! Bien sûr, je peux t\'aider avec les équations du second degré. Commençons par les bases. Une équation du second degré a la forme ax² + bx + c = 0. Quelle partie te pose problème ?',
        timestamp: '2024-01-20T14:01:00Z',
        messageType: 'text',
        metadata: {
          subject: 'Mathématiques',
          topic: 'Équations du second degré',
          difficulty: 'medium',
        },
      },
      {
        id: 'msg-3',
        conversationId: 'conv-1',
        sender: 'student',
        content: 'Je ne comprends pas comment calculer le discriminant.',
        timestamp: '2024-01-20T14:02:00Z',
        messageType: 'text',
      },
      {
        id: 'msg-4',
        conversationId: 'conv-1',
        sender: 'ai',
        content: '😊 Parfait ! Le discriminant se calcule avec la formule Δ = b² - 4ac. Prenons un exemple : pour l\'équation x² - 5x + 6 = 0, on a a=1, b=-5, c=6. Donc Δ = (-5)² - 4×1×6 = 25 - 24 = 1. Veux-tu qu\'on continue avec la résolution ?',
        timestamp: '2024-01-20T14:03:00Z',
        messageType: 'text',
        metadata: {
          subject: 'Mathématiques',
          topic: 'Discriminant',
          difficulty: 'medium',
        },
      },
    ],
    rating: 5,
    feedback: 'Très clair et patient !',
  },
  {
    id: 'conv-2',
    agentId: 'ai-french-1',
    studentId: 'student-1',
    subject: 'Français',
    topic: 'Analyse de texte',
    startedAt: '2024-01-19T16:00:00Z',
    lastMessageAt: '2024-01-19T16:45:00Z',
    isActive: false,
    context: {
      currentLesson: 'Analyse de texte',
      currentExercise: 'Commentaire composé',
    },
    messages: [
      {
        id: 'msg-5',
        conversationId: 'conv-2',
        sender: 'student',
        content: 'Bonjour Sophie, j\'ai besoin d\'aide pour structurer mon commentaire composé.',
        timestamp: '2024-01-19T16:00:00Z',
        messageType: 'text',
      },
      {
        id: 'msg-6',
        conversationId: 'conv-2',
        sender: 'ai',
        content: '📚 Bonjour ! Je vais t\'aider à structurer ton commentaire composé. La structure classique comprend : Introduction, Développement (2-3 axes) et Conclusion. Sur quel texte travailles-tu ?',
        timestamp: '2024-01-19T16:01:00Z',
        messageType: 'text',
        metadata: {
          subject: 'Français',
          topic: 'Commentaire composé',
          difficulty: 'hard',
        },
      },
    ],
    rating: 4,
    feedback: 'Explications très utiles',
  },
];

// Mock data pour les sessions d'examen
export const mockExamSessions: ExamSession[] = [
  {
    id: 'exam-1',
    studentId: 'student-1',
    examId: 'exam-math-2024-01',
    examName: 'Contrôle Mathématiques - Équations',
    subject: 'Mathématiques',
    startedAt: '2024-01-20T10:00:00Z',
    endTime: '2024-01-20T11:30:00Z',
    isActive: false,
    aiRestrictions: {
      agentsDisabled: true,
      disabledAt: '2024-01-20T10:00:00Z',
      enabledAt: '2024-01-20T11:30:00Z',
      reason: 'exam',
    },
  },
  {
    id: 'exam-2',
    studentId: 'student-2',
    examId: 'exam-french-2024-01',
    examName: 'Contrôle Français - Grammaire',
    subject: 'Français',
    startedAt: '2024-01-20T14:00:00Z',
    endTime: '2024-01-20T15:30:00Z',
    isActive: true,
    aiRestrictions: {
      agentsDisabled: true,
      disabledAt: '2024-01-20T14:00:00Z',
      reason: 'exam',
    },
  },
];

// Mock data pour les sessions de devoir
export const mockHomeworkSessions: HomeworkSession[] = [
  {
    id: 'homework-1',
    studentId: 'student-1',
    homeworkId: 'hw-math-2024-01',
    homeworkName: 'Devoir Mathématiques - Fonctions',
    subject: 'Mathématiques',
    assignedAt: '2024-01-18T08:00:00Z',
    dueDate: '2024-01-25T23:59:00Z',
    isActive: true,
    aiRestrictions: {
      agentsDisabled: true,
      disabledAt: '2024-01-18T08:00:00Z',
      reason: 'homework',
    },
  },
  {
    id: 'homework-2',
    studentId: 'student-3',
    homeworkId: 'hw-science-2024-01',
    homeworkName: 'Devoir Sciences - Photosynthèse',
    subject: 'Sciences',
    assignedAt: '2024-01-17T10:00:00Z',
    dueDate: '2024-01-24T23:59:00Z',
    submittedAt: '2024-01-23T15:30:00Z',
    isActive: false,
    aiRestrictions: {
      agentsDisabled: true,
      disabledAt: '2024-01-17T10:00:00Z',
      enabledAt: '2024-01-23T15:30:00Z',
      reason: 'homework',
    },
  },
];

// Fonctions utilitaires
export const getAIAgentsBySubject = (subject: string): AIAgent[] => {
  return mockAIAgents.filter(agent => 
    agent.subjects.includes(subject) && agent.isActive
  );
};

export const getAIAgentById = (id: string): AIAgent | undefined => {
  return mockAIAgents.find(agent => agent.id === id);
};

export const getStudentConversations = (studentId: string): AIConversation[] => {
  return mockAIConversations.filter(conversation => 
    conversation.studentId === studentId
  );
};

export const getActiveConversation = (studentId: string, agentId: string): AIConversation | undefined => {
  return mockAIConversations.find(conversation => 
    conversation.studentId === studentId && 
    conversation.agentId === agentId && 
    conversation.isActive
  );
};

export const getStudentExamSessions = (studentId: string): ExamSession[] => {
  return mockExamSessions.filter(session => session.studentId === studentId);
};

export const getStudentHomeworkSessions = (studentId: string): HomeworkSession[] => {
  return mockHomeworkSessions.filter(session => session.studentId === studentId);
};

export const getActiveExamSession = (studentId: string): ExamSession | undefined => {
  return mockExamSessions.find(session => 
    session.studentId === studentId && session.isActive
  );
};

export const getActiveHomeworkSession = (studentId: string): HomeworkSession | undefined => {
  return mockHomeworkSessions.find(session => 
    session.studentId === studentId && session.isActive
  );
};

export const createConversation = (
  agentId: string,
  studentId: string,
  subject: string,
  topic: string,
  context?: any
): AIConversation => {
  const newConversation: AIConversation = {
    id: `conv-${Date.now()}`,
    agentId,
    studentId,
    subject,
    topic,
    startedAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString(),
    isActive: true,
    context: context || {},
    messages: [],
  };
  
  mockAIConversations.push(newConversation);
  return newConversation;
};

export const addMessageToConversation = (
  conversationId: string,
  sender: 'student' | 'ai',
  content: string,
  messageType: 'text' | 'code' | 'image' | 'file' | 'link' = 'text',
  metadata?: any
): AIMessage => {
  const conversation = mockAIConversations.find(conv => conv.id === conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  const newMessage: AIMessage = {
    id: `msg-${Date.now()}`,
    conversationId,
    sender,
    content,
    timestamp: new Date().toISOString(),
    messageType,
    metadata,
  };
  
  conversation.messages.push(newMessage);
  conversation.lastMessageAt = newMessage.timestamp;
  
  return newMessage;
};

export const generateAIResponse = (
  agent: AIAgent,
  studentMessage: string,
  context: any
): string => {
  // Simulation d'une réponse IA basée sur l'agent et le contexte
  const responses = {
    'ai-math-1': [
      '😊 Parfait ! Laisse-moi t\'expliquer cela étape par étape.',
      '😊 Excellente question ! Voici comment procéder :',
      '😊 Je vais te guider pour résoudre ce problème.',
    ],
    'ai-french-1': [
      '📚 Très bonne question ! Analysons cela ensemble.',
      '📚 Voici une explication détaillée :',
      '📚 Laisse-moi t\'aider à comprendre ce concept.',
    ],
    'ai-science-1': [
      '💪 Super ! Approchons cela de manière scientifique.',
      '💪 Voici l\'explication étape par étape :',
      '💪 Laisse-moi t\'aider à comprendre ce phénomène.',
    ],
    'ai-history-1': [
      '📚 Intéressante question ! Plaçons cela dans son contexte historique.',
      '📚 Voici l\'analyse historique :',
      '📚 Laisse-moi t\'expliquer le contexte.',
    ],
    'ai-english-1': [
      '😊 Great question! Let me explain this to you.',
      '😊 Here\'s how to understand this :',
      '😊 Let me help you with this concept.',
    ],
    'ai-philosophy-1': [
      '⚡ Question philosophique intéressante ! Analysons cela ensemble.',
      '⚡ Voici une réflexion approfondie :',
      '⚡ Laisse-moi t\'aider à développer ta pensée critique.',
    ],
  };
  
  const agentResponses = responses[agent.id as keyof typeof responses] || responses['ai-math-1'];
  const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
  
  return `${randomResponse} ${studentMessage.includes('?') ? 'Voici ma réponse :' : 'Voici ce que je peux te dire :'} ${context.subject || 'Ce sujet'} est fascinant et voici comment l\'aborder...`;
}; 