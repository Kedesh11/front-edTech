export interface WorkGroup {
  id: string;
  name: string;
  description: string;
  class: string; // Classe autorisée (ex: "Seconde", "Première", "Terminale")
  grade: string; // Niveau autorisé (ex: "2nde", "1ère", "Tle")
  createdBy: string; // ID de l'étudiant créateur
  createdAt: string;
  updatedAt: string;
  maxMembers: number;
  currentMembers: number;
  isActive: boolean;
  tags: string[];
  subject?: string; // Matière principale (optionnel)
  
  // Collaboration en ligne sur la plateforme
  onlineMeeting?: {
    platform: 'internal' | 'external'; // 'internal' = sur la plateforme
    meetingUrl?: string; // URL de la réunion (pour réunions externes)
    roomId?: string; // ID de la salle virtuelle sur la plateforme
  };
  
  // Planning des réunions en ligne
  meetingSchedule?: {
    day: string;
    time: string;
    duration: number; // en minutes
    timezone: string; // fuseau horaire
  };
  
  // Outils de collaboration disponibles
  collaborationTools: {
    chat: boolean; // Chat en temps réel
    whiteboard: boolean; // Tableau blanc collaboratif
    documentSharing: boolean; // Partage de documents
    screenSharing: boolean; // Partage d'écran
    recording: boolean; // Enregistrement des sessions
  };
  
  // Documents et ressources partagés
  sharedResources?: {
    id: string;
    name: string;
    type: 'document' | 'presentation' | 'video' | 'link';
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    description?: string;
  }[];
  
  // Messages du chat
  messages?: {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    timestamp: string;
    type: 'text' | 'file' | 'link';
    attachments?: {
      name: string;
      url: string;
      size: number;
    }[];
  }[];
  
  // Tâches et objectifs du groupe
  tasks?: {
    id: string;
    title: string;
    description: string;
    assignedTo: string[];
    status: 'pending' | 'in_progress' | 'completed';
    dueDate?: string;
    createdAt: string;
    completedAt?: string;
  }[];
  
  // Notes collaboratives
  notes?: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean; // visible par tous les membres
  }[];
}

export interface WorkGroupMember {
  id: string;
  workGroupId: string;
  studentId: string;
  joinedAt: string;
  role: 'creator' | 'member';
  isActive: boolean;
  
  // Statut en ligne
  onlineStatus: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: string;
  
  // Permissions dans le groupe
  permissions: {
    canInvite: boolean;
    canManageTasks: boolean;
    canShareDocuments: boolean;
    canRecord: boolean;
    canModerate: boolean;
  };
}

export interface WorkGroupInvitation {
  id: string;
  workGroupId: string;
  invitedStudentId: string;
  invitedBy: string; // ID de l'étudiant qui invite
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
  expiresAt: string;
  message?: string;
}

export interface WorkGroupFilter {
  class?: string;
  grade?: string;
  subject?: string;
  isActive?: boolean;
  hasSpace?: boolean; // true = groupes avec de la place
  createdByMe?: boolean; // true = groupes créés par l'utilisateur connecté
  memberOf?: boolean; // true = groupes dont l'utilisateur est membre
  onlineOnly?: boolean; // true = groupes avec réunions en ligne uniquement
}

// Types pour les formulaires
export interface CreateWorkGroupForm {
  name: string;
  description: string;
  maxMembers: number;
  subject?: string;
  tags: string[];
  
  // Configuration de la collaboration en ligne
  onlineMeeting: {
    enabled: boolean;
    platform: 'internal' | 'external';
    meetingUrl?: string;
  };
  
  meetingSchedule?: {
    day: string;
    time: string;
    duration: number;
    timezone: string;
  };
  
  collaborationTools: {
    chat: boolean;
    whiteboard: boolean;
    documentSharing: boolean;
    screenSharing: boolean;
    recording: boolean;
  };
}

export interface UpdateWorkGroupForm {
  name?: string;
  description?: string;
  maxMembers?: number;
  subject?: string;
  tags?: string[];
  isActive?: boolean;
  
  onlineMeeting?: {
    enabled: boolean;
    platform: 'internal' | 'external';
    meetingUrl?: string;
  };
  
  meetingSchedule?: {
    day: string;
    time: string;
    duration: number;
    timezone: string;
  };
  
  collaborationTools?: {
    chat: boolean;
    whiteboard: boolean;
    documentSharing: boolean;
    screenSharing: boolean;
    recording: boolean;
  };
}

// Types pour les sessions de collaboration
export interface CollaborationSession {
  id: string;
  workGroupId: string;
  startedBy: string;
  startedAt: string;
  endedAt?: string;
  participants: string[];
  sessionType: 'meeting' | 'study' | 'review';
  tools: {
    chat: boolean;
    whiteboard: boolean;
    screenSharing: boolean;
    recording: boolean;
  };
  recordingUrl?: string;
  notes?: string;
}

// Types utilitaires
export const WORK_GROUP_ROLES = {
  CREATOR: 'creator',
  MEMBER: 'member',
} as const;

export const INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  EXPIRED: 'expired',
} as const;

// Classes et niveaux autorisés
export const ALLOWED_CLASSES = [
  'Seconde',
  'Première',
  'Terminale',
] as const;

export const ALLOWED_GRADES = [
  '2nde',
  '1ère',
  'Tle',
] as const;

export const DAYS_OF_WEEK = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
] as const;

export const TIMEZONES = [
  'Europe/Paris',
  'Europe/London',
  'America/New_York',
  'Asia/Tokyo',
] as const;

// Helper functions
export const canStudentJoinWorkGroup = (
  studentClass: string,
  studentGrade: string,
  workGroupClass: string,
  workGroupGrade: string
): boolean => {
  return studentClass === workGroupClass && studentGrade === workGroupGrade;
};

export const getWorkGroupStatus = (workGroup: WorkGroup): 'open' | 'full' | 'closed' => {
  if (!workGroup.isActive) return 'closed';
  if (workGroup.currentMembers >= workGroup.maxMembers) return 'full';
  return 'open';
};

export const formatMeetingSchedule = (schedule: WorkGroup['meetingSchedule']): string => {
  if (!schedule) return 'Non défini';
  return `${schedule.day} à ${schedule.time} (${schedule.duration} min) - ${schedule.timezone}`;
};

export const isOnlineMeeting = (workGroup: WorkGroup): boolean => {
  return workGroup.onlineMeeting?.platform === 'internal' || workGroup.onlineMeeting?.platform === 'external';
};

export const getCollaborationToolsCount = (workGroup: WorkGroup): number => {
  return Object.values(workGroup.collaborationTools).filter(Boolean).length;
}; 