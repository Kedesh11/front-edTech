// Types pour les agents IA
export interface AIAgent {
  id: string;
  name: string;
  description: string;
  subject: string; // Matière principale
  subjects: string[]; // Matières supportées
  avatar: string; // URL de l'avatar
  isActive: boolean;
  capabilities: {
    courseHelp: boolean; // Aide aux cours
    exerciseHelp: boolean; // Aide aux exercices
    homeworkHelp: boolean; // Aide aux devoirs (restreinte)
    examHelp: boolean; // Aide aux examens (restreinte)
    explanation: boolean; // Explications détaillées
    examples: boolean; // Exemples pratiques
    stepByStep: boolean; // Résolution étape par étape
  };
  personality: {
    tone: 'friendly' | 'professional' | 'encouraging' | 'strict';
    language: 'french' | 'english';
    detailLevel: 'basic' | 'intermediate' | 'advanced';
  };
  restrictions: {
    disabledDuringExams: boolean; // Désactivé pendant les examens
    disabledDuringHomework: boolean; // Désactivé pendant les devoirs
    timeRestrictions?: {
      startTime: string; // Format HH:MM
      endTime: string; // Format HH:MM
      timezone: string;
    };
    gradeRestrictions?: {
      minGrade: string; // Niveau minimum requis
      maxGrade: string; // Niveau maximum
    };
  };
  statistics: {
    totalConversations: number;
    averageRating: number;
    totalHelpProvided: number;
    lastActive: string;
  };
}

// Types pour les conversations avec les agents IA
export interface AIConversation {
  id: string;
  agentId: string;
  studentId: string;
  subject: string;
  topic: string; // Sujet de la conversation
  startedAt: string;
  lastMessageAt: string;
  isActive: boolean;
  context: {
    currentLesson?: string;
    currentExercise?: string;
    currentHomework?: string;
    examMode?: boolean;
    homeworkMode?: boolean;
  };
  messages: AIMessage[];
  rating?: number; // Note de 1 à 5
  feedback?: string;
}

export interface AIMessage {
  id: string;
  conversationId: string;
  sender: 'student' | 'ai';
  content: string;
  timestamp: string;
  messageType: 'text' | 'code' | 'image' | 'file' | 'link';
  attachments?: {
    name: string;
    url: string;
    type: 'image' | 'document' | 'code' | 'link';
  }[];
  metadata?: {
    subject?: string;
    topic?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
  };
}

// Types pour les sessions d'examen/devoir
export interface ExamSession {
  id: string;
  studentId: string;
  examId: string;
  examName: string;
  subject: string;
  startedAt: string;
  endTime: string;
  isActive: boolean;
  aiRestrictions: {
    agentsDisabled: boolean;
    disabledAt: string;
    enabledAt?: string;
    reason: 'exam' | 'homework' | 'manual';
  };
}

export interface HomeworkSession {
  id: string;
  studentId: string;
  homeworkId: string;
  homeworkName: string;
  subject: string;
  assignedAt: string;
  dueDate: string;
  submittedAt?: string;
  isActive: boolean;
  aiRestrictions: {
    agentsDisabled: boolean;
    disabledAt: string;
    enabledAt?: string;
    reason: 'homework' | 'manual';
  };
}

// Types pour les formulaires
export interface StartConversationForm {
  agentId: string;
  subject: string;
  topic: string;
  context?: {
    lesson?: string;
    exercise?: string;
    homework?: string;
  };
}

export interface SendMessageForm {
  conversationId: string;
  content: string;
  messageType: 'text' | 'code' | 'image' | 'file' | 'link';
  attachments?: File[];
}

// Types pour les filtres et recherche
export interface AIAgentFilter {
  subject?: string;
  capability?: keyof AIAgent['capabilities'];
  isActive?: boolean;
  grade?: string;
  availability?: 'available' | 'busy' | 'offline';
}

// Constantes
export const AI_AGENT_SUBJECTS = [
  'Mathématiques',
  'Français',
  'Histoire-Géographie',
  'Sciences',
  'Anglais',
  'Espagnol',
  'Philosophie',
  'Économie',
  'Physique-Chimie',
  'SVT',
] as const;

export const AI_AGENT_CAPABILITIES = [
  'courseHelp',
  'exerciseHelp',
  'homeworkHelp',
  'examHelp',
  'explanation',
  'examples',
  'stepByStep',
] as const;

export const AI_AGENT_TONES = [
  'friendly',
  'professional',
  'encouraging',
  'strict',
] as const;

export const AI_AGENT_DETAIL_LEVELS = [
  'basic',
  'intermediate',
  'advanced',
] as const;

// Helper functions
export const isAgentAvailable = (
  agent: AIAgent,
  currentTime: Date,
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): boolean => {
  // Vérifier si l'agent est actif
  if (!agent.isActive) return false;

  // Vérifier les restrictions temporelles
  if (agent.restrictions.timeRestrictions) {
    const { startTime, endTime, timezone } = agent.restrictions.timeRestrictions;
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startTimeMinutes = startHour * 60 + startMin;
    const endTimeMinutes = endHour * 60 + endMin;

    if (currentTimeMinutes < startTimeMinutes || currentTimeMinutes > endTimeMinutes) {
      return false;
    }
  }

  // Vérifier les restrictions d'examen
  if (agent.restrictions.disabledDuringExams) {
    const activeExam = examSessions.find(session => session.isActive);
    if (activeExam) return false;
  }

  // Vérifier les restrictions de devoir
  if (agent.restrictions.disabledDuringHomework) {
    const activeHomework = homeworkSessions.find(session => session.isActive);
    if (activeHomework) return false;
  }

  return true;
};

export const getAgentAvailabilityStatus = (
  agent: AIAgent,
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): 'available' | 'busy' | 'offline' | 'restricted' => {
  if (!agent.isActive) return 'offline';

  const currentTime = new Date();
  const isAvailable = isAgentAvailable(agent, currentTime, examSessions, homeworkSessions);

  if (!isAvailable) {
    if (examSessions.some(session => session.isActive)) return 'restricted';
    if (homeworkSessions.some(session => session.isActive)) return 'restricted';
    return 'offline';
  }

  // Simuler un statut "busy" basé sur les statistiques
  const lastActive = new Date(agent.statistics.lastActive);
  const timeSinceLastActive = currentTime.getTime() - lastActive.getTime();
  const fiveMinutes = 5 * 60 * 1000;

  if (timeSinceLastActive < fiveMinutes) {
    return 'busy';
  }

  return 'available';
};

export const formatAgentResponse = (
  agent: AIAgent,
  message: string
): string => {
  // Appliquer le ton de l'agent
  let formattedMessage = message;

  switch (agent.personality.tone) {
    case 'friendly':
      formattedMessage = `😊 ${formattedMessage}`;
      break;
    case 'professional':
      formattedMessage = `📚 ${formattedMessage}`;
      break;
    case 'encouraging':
      formattedMessage = `💪 ${formattedMessage}`;
      break;
    case 'strict':
      formattedMessage = `⚡ ${formattedMessage}`;
      break;
  }

  return formattedMessage;
};

export const getRestrictionMessage = (
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): string | null => {
  if (examSessions.some(session => session.isActive)) {
    return "Les agents IA sont temporairement désactivés pendant les examens pour assurer l'équité.";
  }

  if (homeworkSessions.some(session => session.isActive)) {
    return "Les agents IA sont temporairement désactivés pendant les devoirs pour encourager l'apprentissage autonome.";
  }

  return null;
}; 