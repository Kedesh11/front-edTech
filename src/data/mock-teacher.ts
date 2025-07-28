import { 
  Course, 
  Assignment, 
  Grade, 
  Class, 
  Communication, 
  Discussion,
  TeacherStatistics 
} from '@/types/teacher';

// Mock data pour les cours
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    name: 'Mathématiques - 1ère A',
    subject: 'Mathématiques',
    classId: 'class-1',
    className: '1ère A',
    teacherId: 'teacher-1',
    schedule: {
      day: 'Lundi',
      startTime: '09:00',
      endTime: '11:00',
      room: 'Salle 201',
    },
    students: ['student-1', 'student-2', 'student-3', 'student-4'],
    description: 'Cours de mathématiques pour la classe de 1ère A',
    objectives: [
      'Maîtriser les fonctions du second degré',
      'Comprendre les dérivées',
      'Résoudre des équations complexes',
    ],
    resources: [
      {
        id: 'resource-1',
        name: 'Support cours fonctions',
        type: 'document',
        url: '/resources/fonctions-cours.pdf',
        description: 'Support de cours sur les fonctions',
        uploadedAt: '2024-01-15T10:00:00Z',
        isPublic: true,
      },
      {
        id: 'resource-2',
        name: 'Exercices dérivées',
        type: 'document',
        url: '/resources/exercices-derivees.pdf',
        description: 'Série d\'exercices sur les dérivées',
        uploadedAt: '2024-01-16T14:00:00Z',
        isPublic: true,
      },
    ],
    isActive: true,
  },
  {
    id: 'course-2',
    name: 'Physique - Terminale B',
    subject: 'Physique',
    classId: 'class-2',
    className: 'Terminale B',
    teacherId: 'teacher-1',
    schedule: {
      day: 'Mardi',
      startTime: '14:00',
      endTime: '16:00',
      room: 'Labo Physique',
    },
    students: ['student-5', 'student-6', 'student-7', 'student-8'],
    description: 'Cours de physique pour la classe de Terminale B',
    objectives: [
      'Comprendre les circuits électriques',
      'Maîtriser les lois de Newton',
      'Analyser les ondes',
    ],
    resources: [
      {
        id: 'resource-3',
        name: 'TP Circuits électriques',
        type: 'document',
        url: '/resources/tp-circuits.pdf',
        description: 'Travaux pratiques sur les circuits',
        uploadedAt: '2024-01-17T09:00:00Z',
        isPublic: true,
      },
    ],
    isActive: true,
  },
];

// Mock data pour les devoirs
export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Contrôle sur les intégrales',
    description: 'Contrôle portant sur le calcul intégral et les primitives',
    courseId: 'course-1',
    courseName: 'Mathématiques - 1ère A',
    classId: 'class-1',
    className: '1ère A',
    teacherId: 'teacher-1',
    assignedAt: '2024-01-18T08:00:00Z',
    dueDate: '2024-01-25T23:59:00Z',
    maxGrade: 20,
    type: 'exam',
    status: 'published',
    submissions: [
      {
        id: 'submission-1',
        assignmentId: 'assignment-1',
        studentId: 'student-1',
        studentName: 'Marie Dupont',
        submittedAt: '2024-01-25T15:30:00Z',
        grade: 16,
        feedback: 'Très bon travail, quelques erreurs de calcul',
        status: 'graded',
        files: [
          {
            name: 'controle-marie.pdf',
            url: '/submissions/controle-marie.pdf',
            type: 'application/pdf',
          },
        ],
      },
      {
        id: 'submission-2',
        assignmentId: 'assignment-1',
        studentId: 'student-2',
        studentName: 'Thomas Martin',
        submittedAt: '2024-01-25T16:45:00Z',
        grade: 14,
        feedback: 'Bon travail, attention aux signes',
        status: 'graded',
        files: [
          {
            name: 'controle-thomas.pdf',
            url: '/submissions/controle-thomas.pdf',
            type: 'application/pdf',
          },
        ],
      },
    ],
    criteria: [
      {
        id: 'criteria-1',
        name: 'Calculs',
        description: 'Exactitude des calculs',
        maxPoints: 10,
        weight: 50,
      },
      {
        id: 'criteria-2',
        name: 'Méthode',
        description: 'Rigueur de la méthode',
        maxPoints: 6,
        weight: 30,
      },
      {
        id: 'criteria-3',
        name: 'Présentation',
        description: 'Clarté de la présentation',
        maxPoints: 4,
        weight: 20,
      },
    ],
  },
  {
    id: 'assignment-2',
    title: 'TP Circuits électriques',
    description: 'Travaux pratiques sur les circuits en série et parallèle',
    courseId: 'course-2',
    courseName: 'Physique - Terminale B',
    classId: 'class-2',
    className: 'Terminale B',
    teacherId: 'teacher-1',
    assignedAt: '2024-01-20T10:00:00Z',
    dueDate: '2024-01-27T23:59:00Z',
    maxGrade: 20,
    type: 'project',
    status: 'published',
    submissions: [
      {
        id: 'submission-3',
        assignmentId: 'assignment-2',
        studentId: 'student-5',
        studentName: 'Sophie Bernard',
        submittedAt: '2024-01-26T12:00:00Z',
        status: 'submitted',
        files: [
          {
            name: 'rapport-sophie.pdf',
            url: '/submissions/rapport-sophie.pdf',
            type: 'application/pdf',
          },
        ],
      },
    ],
  },
];

// Mock data pour les notes
export const mockGrades: Grade[] = [
  {
    id: 'grade-1',
    studentId: 'student-1',
    studentName: 'Marie Dupont',
    courseId: 'course-1',
    courseName: 'Mathématiques - 1ère A',
    assignmentId: 'assignment-1',
    assignmentName: 'Contrôle sur les intégrales',
    grade: 16,
    maxGrade: 20,
    percentage: 80,
    type: 'assignment',
    recordedAt: '2024-01-26T10:00:00Z',
    recordedBy: 'teacher-1',
    comments: 'Très bon travail, quelques erreurs de calcul',
  },
  {
    id: 'grade-2',
    studentId: 'student-2',
    studentName: 'Thomas Martin',
    courseId: 'course-1',
    courseName: 'Mathématiques - 1ère A',
    assignmentId: 'assignment-1',
    assignmentName: 'Contrôle sur les intégrales',
    grade: 14,
    maxGrade: 20,
    percentage: 70,
    type: 'assignment',
    recordedAt: '2024-01-26T10:30:00Z',
    recordedBy: 'teacher-1',
    comments: 'Bon travail, attention aux signes',
  },
  {
    id: 'grade-3',
    studentId: 'student-1',
    studentName: 'Marie Dupont',
    courseId: 'course-1',
    courseName: 'Mathématiques - 1ère A',
    grade: 18,
    maxGrade: 20,
    percentage: 90,
    type: 'participation',
    recordedAt: '2024-01-20T14:00:00Z',
    recordedBy: 'teacher-1',
    comments: 'Participation active en cours',
  },
];

// Mock data pour les classes
export const mockClasses: Class[] = [
  {
    id: 'class-1',
    name: '1ère A',
    grade: '1ère',
    academicYear: '2023-2024',
    students: ['student-1', 'student-2', 'student-3', 'student-4'],
    teachers: ['teacher-1', 'teacher-2'],
    schedule: [
      {
        id: 'schedule-1',
        day: 'Lundi',
        startTime: '09:00',
        endTime: '11:00',
        subject: 'Mathématiques',
        teacherId: 'teacher-1',
        teacherName: 'Prof. Martin',
        room: 'Salle 201',
      },
      {
        id: 'schedule-2',
        day: 'Mardi',
        startTime: '14:00',
        endTime: '16:00',
        subject: 'Français',
        teacherId: 'teacher-2',
        teacherName: 'Prof. Dubois',
        room: 'Salle 105',
      },
    ],
    statistics: {
      averageGrade: 15.2,
      attendanceRate: 94,
      assignmentCompletionRate: 85,
    },
  },
  {
    id: 'class-2',
    name: 'Terminale B',
    grade: 'Terminale',
    academicYear: '2023-2024',
    students: ['student-5', 'student-6', 'student-7', 'student-8'],
    teachers: ['teacher-1', 'teacher-3'],
    schedule: [
      {
        id: 'schedule-3',
        day: 'Mardi',
        startTime: '14:00',
        endTime: '16:00',
        subject: 'Physique',
        teacherId: 'teacher-1',
        teacherName: 'Prof. Martin',
        room: 'Labo Physique',
      },
    ],
    statistics: {
      averageGrade: 14.8,
      attendanceRate: 92,
      assignmentCompletionRate: 78,
    },
  },
];

// Mock data pour les communications
export const mockCommunications: Communication[] = [
  {
    id: 'comm-1',
    title: 'Rappel : Contrôle de mathématiques',
    content: 'Rappel : Le contrôle sur les intégrales aura lieu lundi prochain. N\'oubliez pas vos calculatrices !',
    senderId: 'teacher-1',
    senderName: 'Prof. Martin',
    recipients: {
      type: 'class',
      ids: ['class-1'],
    },
    priority: 'medium',
    status: 'sent',
    sentAt: '2024-01-22T10:00:00Z',
    readBy: ['student-1', 'student-2', 'student-3'],
  },
  {
    id: 'comm-2',
    title: 'Réunion parents-professeurs',
    content: 'La réunion parents-professeurs aura lieu vendredi à 18h00. Merci de confirmer votre présence.',
    senderId: 'teacher-1',
    senderName: 'Prof. Martin',
    recipients: {
      type: 'parent',
      ids: ['parent-1', 'parent-2'],
    },
    priority: 'high',
    status: 'sent',
    sentAt: '2024-01-23T14:00:00Z',
    readBy: ['parent-1'],
  },
];

// Mock data pour les discussions
export const mockDiscussions: Discussion[] = [
  {
    id: 'discussion-1',
    title: 'Questions sur les intégrales',
    description: 'Forum pour poser des questions sur le chapitre des intégrales',
    courseId: 'course-1',
    classId: 'class-1',
    createdBy: 'teacher-1',
    createdAt: '2024-01-20T09:00:00Z',
    isActive: true,
    participants: ['teacher-1', 'student-1', 'student-2', 'student-3'],
    messages: [
      {
        id: 'msg-1',
        discussionId: 'discussion-1',
        authorId: 'student-1',
        authorName: 'Marie Dupont',
        content: 'Bonjour, j\'ai une question sur l\'intégration par parties. Pouvez-vous m\'expliquer ?',
        timestamp: '2024-01-20T10:00:00Z',
        isEdited: false,
      },
      {
        id: 'msg-2',
        discussionId: 'discussion-1',
        authorId: 'teacher-1',
        authorName: 'Prof. Martin',
        content: 'Bien sûr Marie ! L\'intégration par parties utilise la formule ∫u dv = uv - ∫v du. Voulez-vous un exemple concret ?',
        timestamp: '2024-01-20T10:15:00Z',
        isEdited: false,
      },
    ],
    tags: ['mathématiques', 'intégrales', 'aide'],
  },
];

// Mock data pour les statistiques enseignantes
export const mockTeacherStatistics: TeacherStatistics = {
  totalStudents: 32,
  totalCourses: 4,
  totalAssignments: 8,
  averageGrade: 15.2,
  attendanceRate: 93,
  assignmentCompletionRate: 82,
  recentActivity: {
    assignmentsGraded: 15,
    communicationsSent: 8,
    resourcesAdded: 12,
  },
  classPerformance: [
    {
      classId: 'class-1',
      className: '1ère A',
      averageGrade: 15.2,
      attendanceRate: 94,
    },
    {
      classId: 'class-2',
      className: 'Terminale B',
      averageGrade: 14.8,
      attendanceRate: 92,
    },
  ],
};

// Fonctions utilitaires
export const getTeacherCourses = (teacherId: string): Course[] => {
  return mockCourses.filter(course => course.teacherId === teacherId);
};

export const getTeacherAssignments = (teacherId: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.teacherId === teacherId);
};

export const getTeacherGrades = (teacherId: string): Grade[] => {
  return mockGrades.filter(grade => grade.recordedBy === teacherId);
};

export const getTeacherCommunications = (teacherId: string): Communication[] => {
  return mockCommunications.filter(comm => comm.senderId === teacherId);
};

export const getClassAssignments = (classId: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.classId === classId);
};

export const getStudentGrades = (studentId: string): Grade[] => {
  return mockGrades.filter(grade => grade.studentId === studentId);
};

export const getAssignmentSubmissions = (assignmentId: string) => {
  const assignment = mockAssignments.find(a => a.id === assignmentId);
  return assignment?.submissions || [];
};

export const getPendingAssignments = (teacherId: string): Assignment[] => {
  return mockAssignments.filter(assignment => 
    assignment.teacherId === teacherId && 
    assignment.status === 'published' &&
    assignment.submissions.some(sub => sub.status === 'submitted')
  );
};

export const getTodayClasses = (teacherId: string): Course[] => {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  return mockCourses.filter(course => 
    course.teacherId === teacherId && 
    course.schedule.day === today
  );
}; 