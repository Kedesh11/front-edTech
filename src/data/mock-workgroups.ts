import { WorkGroup, WorkGroupMember, WorkGroupInvitation } from '@/types/workgroups';
import { Student } from '@/types/user';

// Mock data pour les groupes de travail
export const mockWorkGroups: WorkGroup[] = [
  {
    id: 'wg-1',
    name: 'Groupe de révision Mathématiques',
    description: 'Groupe de révision pour les mathématiques de seconde. Nous nous concentrons sur l\'algèbre et la géométrie.',
    class: 'Seconde',
    grade: '2nde',
    createdBy: 'student-1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    maxMembers: 6,
    currentMembers: 4,
    isActive: true,
    tags: ['mathématiques', 'révision', 'algèbre', 'géométrie'],
    subject: 'Mathématiques',
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-math-2nde-001',
    },
    meetingSchedule: {
      day: 'Mercredi',
      time: '14:00',
      duration: 90,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: true,
      documentSharing: true,
      screenSharing: true,
      recording: false,
    },
    sharedResources: [
      {
        id: 'doc-1',
        name: 'Formulaire algèbre',
        type: 'document',
        url: '/documents/formulaire-algebre.pdf',
        uploadedBy: 'student-1',
        uploadedAt: '2024-01-18T10:00:00Z',
        description: 'Formulaire complet des formules d\'algèbre',
      },
      {
        id: 'doc-2',
        name: 'Exercices géométrie',
        type: 'document',
        url: '/documents/exercices-geometrie.pdf',
        uploadedBy: 'student-2',
        uploadedAt: '2024-01-19T14:00:00Z',
        description: 'Série d\'exercices de géométrie',
      },
    ],
    messages: [
      {
        id: 'msg-1',
        authorId: 'student-1',
        authorName: 'Marie Dupont',
        content: 'Salut tout le monde ! Qui veut qu\'on révise les équations du second degré ?',
        timestamp: '2024-01-20T14:00:00Z',
        type: 'text',
      },
      {
        id: 'msg-2',
        authorId: 'student-2',
        authorName: 'Thomas Martin',
        content: 'Moi ! J\'ai des difficultés avec le discriminant.',
        timestamp: '2024-01-20T14:05:00Z',
        type: 'text',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Réviser les formules de factorisation',
        description: 'Apprendre par cœur les formules de factorisation pour le contrôle',
        assignedTo: ['student-1', 'student-2', 'student-3'],
        status: 'in_progress',
        dueDate: '2024-01-25T23:59:00Z',
        createdAt: '2024-01-20T10:00:00Z',
      },
    ],
    notes: [
      {
        id: 'note-1',
        title: 'Notes révision algèbre',
        content: 'Points importants à retenir :\n- Formule du discriminant\n- Méthode de factorisation\n- Résolution d\'équations',
        authorId: 'student-1',
        authorName: 'Marie Dupont',
        createdAt: '2024-01-18T15:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
        isPublic: true,
      },
    ],
  },
  {
    id: 'wg-2',
    name: 'Club de lecture Première',
    description: 'Club de lecture pour les élèves de première. Nous lisons et analysons des œuvres littéraires.',
    class: 'Première',
    grade: '1ère',
    createdBy: 'student-5',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
    maxMembers: 8,
    currentMembers: 6,
    isActive: true,
    tags: ['littérature', 'lecture', 'analyse', 'culture'],
    subject: 'Français',
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-francais-1ere-001',
    },
    meetingSchedule: {
      day: 'Vendredi',
      time: '17:00',
      duration: 60,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: false,
      documentSharing: true,
      screenSharing: false,
      recording: false,
    },
  },
  {
    id: 'wg-3',
    name: 'Préparation Bac Terminale',
    description: 'Groupe de préparation intensive pour le baccalauréat. Toutes matières confondues.',
    class: 'Terminale',
    grade: 'Tle',
    createdBy: 'student-8',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
    maxMembers: 10,
    currentMembers: 8,
    isActive: true,
    tags: ['bac', 'révision', 'intensif', 'toutes matières'],
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-bac-term-001',
    },
    meetingSchedule: {
      day: 'Samedi',
      time: '09:00',
      duration: 120,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: true,
      documentSharing: true,
      screenSharing: true,
      recording: true,
    },
  },
  {
    id: 'wg-4',
    name: 'Groupe Sciences Seconde',
    description: 'Groupe d\'étude pour les sciences (SVT, Physique-Chimie) en seconde.',
    class: 'Seconde',
    grade: '2nde',
    createdBy: 'student-2',
    createdAt: '2024-01-12T13:00:00Z',
    updatedAt: '2024-01-19T15:00:00Z',
    maxMembers: 5,
    currentMembers: 3,
    isActive: true,
    tags: ['sciences', 'SVT', 'physique', 'chimie'],
    subject: 'Sciences',
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-sciences-2nde-001',
    },
    meetingSchedule: {
      day: 'Mardi',
      time: '16:00',
      duration: 75,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: true,
      documentSharing: true,
      screenSharing: false,
      recording: false,
    },
  },
  {
    id: 'wg-5',
    name: 'Groupe Histoire-Géo Première',
    description: 'Groupe de travail pour l\'histoire-géographie en première.',
    class: 'Première',
    grade: '1ère',
    createdBy: 'student-6',
    createdAt: '2024-01-08T10:30:00Z',
    updatedAt: '2024-01-21T12:00:00Z',
    maxMembers: 7,
    currentMembers: 5,
    isActive: true,
    tags: ['histoire', 'géographie', 'culture générale'],
    subject: 'Histoire-Géographie',
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-histoire-1ere-001',
    },
    meetingSchedule: {
      day: 'Jeudi',
      time: '17:30',
      duration: 60,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: false,
      documentSharing: true,
      screenSharing: false,
      recording: false,
    },
  },
  {
    id: 'wg-6',
    name: 'Groupe Langues Terminale',
    description: 'Groupe de pratique des langues étrangères (Anglais, Espagnol).',
    class: 'Terminale',
    grade: 'Tle',
    createdBy: 'student-9',
    createdAt: '2024-01-03T14:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z',
    maxMembers: 6,
    currentMembers: 4,
    isActive: true,
    tags: ['langues', 'anglais', 'espagnol', 'conversation'],
    subject: 'Langues',
    onlineMeeting: {
      platform: 'internal',
      roomId: 'room-langues-term-001',
    },
    meetingSchedule: {
      day: 'Lundi',
      time: '18:00',
      duration: 60,
      timezone: 'Europe/Paris',
    },
    collaborationTools: {
      chat: true,
      whiteboard: false,
      documentSharing: true,
      screenSharing: true,
      recording: false,
    },
  },
];

// Mock data pour les membres des groupes
export const mockWorkGroupMembers: WorkGroupMember[] = [
  // Groupe 1 - Mathématiques Seconde
  { 
    id: 'wgm-1', 
    workGroupId: 'wg-1', 
    studentId: 'student-1', 
    joinedAt: '2024-01-15T10:00:00Z', 
    role: 'creator', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: true,
      canShareDocuments: true,
      canRecord: false,
      canModerate: true,
    },
  },
  { 
    id: 'wgm-2', 
    workGroupId: 'wg-1', 
    studentId: 'student-2', 
    joinedAt: '2024-01-16T11:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:25:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-3', 
    workGroupId: 'wg-1', 
    studentId: 'student-3', 
    joinedAt: '2024-01-17T14:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'away',
    lastSeen: '2024-01-20T14:45:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-4', 
    workGroupId: 'wg-1', 
    studentId: 'student-4', 
    joinedAt: '2024-01-18T09:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'offline',
    lastSeen: '2024-01-20T12:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  
  // Groupe 2 - Club de lecture Première
  { 
    id: 'wgm-5', 
    workGroupId: 'wg-2', 
    studentId: 'student-5', 
    joinedAt: '2024-01-10T09:00:00Z', 
    role: 'creator', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: true,
      canShareDocuments: true,
      canRecord: false,
      canModerate: true,
    },
  },
  { 
    id: 'wgm-6', 
    workGroupId: 'wg-2', 
    studentId: 'student-6', 
    joinedAt: '2024-01-11T10:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:20:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-7', 
    workGroupId: 'wg-2', 
    studentId: 'student-7', 
    joinedAt: '2024-01-12T13:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'busy',
    lastSeen: '2024-01-20T15:15:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-8', 
    workGroupId: 'wg-2', 
    studentId: 'student-8', 
    joinedAt: '2024-01-13T15:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:10:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-9', 
    workGroupId: 'wg-2', 
    studentId: 'student-9', 
    joinedAt: '2024-01-14T11:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'away',
    lastSeen: '2024-01-20T14:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-10', 
    workGroupId: 'wg-2', 
    studentId: 'student-10', 
    joinedAt: '2024-01-15T16:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'offline',
    lastSeen: '2024-01-20T11:00:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  
  // Groupe 3 - Préparation Bac Terminale
  { 
    id: 'wgm-11', 
    workGroupId: 'wg-3', 
    studentId: 'student-8', 
    joinedAt: '2024-01-05T08:00:00Z', 
    role: 'creator', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: true,
      canShareDocuments: true,
      canRecord: true,
      canModerate: true,
    },
  },
  { 
    id: 'wgm-12', 
    workGroupId: 'wg-3', 
    studentId: 'student-9', 
    joinedAt: '2024-01-06T09:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:25:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-13', 
    workGroupId: 'wg-3', 
    studentId: 'student-10', 
    joinedAt: '2024-01-07T10:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:20:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-14', 
    workGroupId: 'wg-3', 
    studentId: 'student-11', 
    joinedAt: '2024-01-08T11:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'away',
    lastSeen: '2024-01-20T14:45:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-15', 
    workGroupId: 'wg-3', 
    studentId: 'student-12', 
    joinedAt: '2024-01-09T12:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:15:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-16', 
    workGroupId: 'wg-3', 
    studentId: 'student-13', 
    joinedAt: '2024-01-10T13:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'busy',
    lastSeen: '2024-01-20T15:10:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-17', 
    workGroupId: 'wg-3', 
    studentId: 'student-14', 
    joinedAt: '2024-01-11T14:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'online',
    lastSeen: '2024-01-20T15:05:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
  { 
    id: 'wgm-18', 
    workGroupId: 'wg-3', 
    studentId: 'student-15', 
    joinedAt: '2024-01-12T15:00:00Z', 
    role: 'member', 
    isActive: true,
    onlineStatus: 'offline',
    lastSeen: '2024-01-20T10:30:00Z',
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  },
];

// Mock data pour les invitations
export const mockWorkGroupInvitations: WorkGroupInvitation[] = [
  {
    id: 'wgi-1',
    workGroupId: 'wg-1',
    invitedStudentId: 'student-5',
    invitedBy: 'student-1',
    status: 'pending',
    createdAt: '2024-01-20T10:00:00Z',
    expiresAt: '2024-01-27T10:00:00Z',
    message: 'Salut ! On a de la place dans notre groupe de maths, ça t\'intéresse ?',
  },
  {
    id: 'wgi-2',
    workGroupId: 'wg-2',
    invitedStudentId: 'student-1',
    invitedBy: 'student-5',
    status: 'accepted',
    createdAt: '2024-01-19T14:00:00Z',
    expiresAt: '2024-01-26T14:00:00Z',
    message: 'Tu veux rejoindre notre club de lecture ?',
  },
  {
    id: 'wgi-3',
    workGroupId: 'wg-3',
    invitedStudentId: 'student-16',
    invitedBy: 'student-8',
    status: 'pending',
    createdAt: '2024-01-22T09:00:00Z',
    expiresAt: '2024-01-29T09:00:00Z',
    message: 'On prépare le bac ensemble, ça t\'intéresse ?',
  },
];

// Fonctions utilitaires
export const getWorkGroupsByClass = (classLevel: string): WorkGroup[] => {
  return mockWorkGroups.filter(group => group.class === classLevel);
};

export const getWorkGroupsByGrade = (grade: string): WorkGroup[] => {
  return mockWorkGroups.filter(group => group.grade === grade);
};

export const getWorkGroupById = (id: string): WorkGroup | undefined => {
  return mockWorkGroups.find(group => group.id === id);
};

export const getWorkGroupMembers = (workGroupId: string): WorkGroupMember[] => {
  return mockWorkGroupMembers.filter(member => member.workGroupId === workGroupId);
};

export const getStudentWorkGroups = (studentId: string): WorkGroup[] => {
  const memberWorkGroupIds = mockWorkGroupMembers
    .filter(member => member.studentId === studentId && member.isActive)
    .map(member => member.workGroupId);
  
  return mockWorkGroups.filter(group => memberWorkGroupIds.includes(group.id));
};

export const getWorkGroupsCreatedByStudent = (studentId: string): WorkGroup[] => {
  return mockWorkGroups.filter(group => group.createdBy === studentId);
};

export const getStudentInvitations = (studentId: string): WorkGroupInvitation[] => {
  return mockWorkGroupInvitations.filter(invitation => 
    invitation.invitedStudentId === studentId && 
    invitation.status === 'pending'
  );
};

export const canStudentJoinWorkGroup = (
  studentClass: string,
  studentGrade: string,
  workGroup: WorkGroup
): boolean => {
  return studentClass === workGroup.class && 
         studentGrade === workGroup.grade && 
         workGroup.isActive && 
         workGroup.currentMembers < workGroup.maxMembers;
};

export const createWorkGroup = (
  workGroupData: Omit<WorkGroup, 'id' | 'createdAt' | 'updatedAt' | 'currentMembers'>
): WorkGroup => {
  const newWorkGroup: WorkGroup = {
    ...workGroupData,
    id: `wg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentMembers: 1, // Le créateur est automatiquement membre
  };
  
  mockWorkGroups.push(newWorkGroup);
  return newWorkGroup;
};

export const joinWorkGroup = (workGroupId: string, studentId: string): boolean => {
  const workGroup = getWorkGroupById(workGroupId);
  if (!workGroup || workGroup.currentMembers >= workGroup.maxMembers) {
    return false;
  }
  
  // Vérifier si l'étudiant n'est pas déjà membre
  const existingMember = mockWorkGroupMembers.find(
    member => member.workGroupId === workGroupId && member.studentId === studentId
  );
  
  if (existingMember) {
    return false;
  }
  
  // Ajouter le membre
  const newMember: WorkGroupMember = {
    id: `wgm-${Date.now()}`,
    workGroupId,
    studentId,
    joinedAt: new Date().toISOString(),
    role: 'member',
    isActive: true,
    onlineStatus: 'online',
    lastSeen: new Date().toISOString(),
    permissions: {
      canInvite: true,
      canManageTasks: false,
      canShareDocuments: true,
      canRecord: false,
      canModerate: false,
    },
  };
  
  mockWorkGroupMembers.push(newMember);
  
  // Mettre à jour le nombre de membres
  workGroup.currentMembers += 1;
  workGroup.updatedAt = new Date().toISOString();
  
  return true;
};

export const leaveWorkGroup = (workGroupId: string, studentId: string): boolean => {
  const member = mockWorkGroupMembers.find(
    member => member.workGroupId === workGroupId && member.studentId === studentId
  );
  
  if (!member || member.role === 'creator') {
    return false; // Le créateur ne peut pas quitter
  }
  
  member.isActive = false;
  
  const workGroup = getWorkGroupById(workGroupId);
  if (workGroup) {
    workGroup.currentMembers -= 1;
    workGroup.updatedAt = new Date().toISOString();
  }
  
  return true;
}; 