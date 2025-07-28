// Types pour les fonctionnalités enseignantes
export interface Course {
  id: string;
  name: string;
  subject: string;
  classId: string;
  className: string;
  teacherId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  };
  students: string[];
  description?: string;
  objectives?: string[];
  resources?: CourseResource[];
  isActive: boolean;
}

export interface CourseResource {
  id: string;
  name: string;
  type: 'document' | 'video' | 'link' | 'presentation';
  url: string;
  description?: string;
  uploadedAt: string;
  isPublic: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  classId: string;
  className: string;
  teacherId: string;
  assignedAt: string;
  dueDate: string;
  maxGrade: number;
  type: 'homework' | 'exam' | 'project' | 'quiz';
  status: 'draft' | 'published' | 'graded' | 'archived';
  submissions: AssignmentSubmission[];
  criteria?: GradingCriteria[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'late' | 'graded' | 'missing';
  files?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface GradingCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number; // Pourcentage du total
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  assignmentId?: string;
  assignmentName?: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  type: 'assignment' | 'exam' | 'participation' | 'bonus';
  recordedAt: string;
  recordedBy: string;
  comments?: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  academicYear: string;
  students: string[];
  teachers: string[];
  schedule: ClassSchedule[];
  statistics: {
    averageGrade: number;
    attendanceRate: number;
    assignmentCompletionRate: number;
  };
}

export interface ClassSchedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface Communication {
  id: string;
  title: string;
  content: string;
  senderId: string;
  senderName: string;
  recipients: {
    type: 'class' | 'student' | 'parent' | 'teacher';
    ids: string[];
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'read';
  sentAt?: string;
  readBy: string[];
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Discussion {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  classId?: string;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  participants: string[];
  messages: DiscussionMessage[];
  tags: string[];
}

export interface DiscussionMessage {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  isEdited: boolean;
  editedAt?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface TeacherStatistics {
  totalStudents: number;
  totalCourses: number;
  totalAssignments: number;
  averageGrade: number;
  attendanceRate: number;
  assignmentCompletionRate: number;
  recentActivity: {
    assignmentsGraded: number;
    communicationsSent: number;
    resourcesAdded: number;
  };
  classPerformance: {
    classId: string;
    className: string;
    averageGrade: number;
    attendanceRate: number;
  }[];
}

// Types pour les formulaires
export interface CreateAssignmentForm {
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxGrade: number;
  type: 'homework' | 'exam' | 'project' | 'quiz';
  criteria?: {
    name: string;
    description: string;
    maxPoints: number;
    weight: number;
  }[];
}

export interface GradeSubmissionForm {
  submissionId: string;
  grade: number;
  feedback?: string;
  criteriaGrades?: {
    criteriaId: string;
    points: number;
  }[];
}

export interface CreateCommunicationForm {
  title: string;
  content: string;
  recipients: {
    type: 'class' | 'student' | 'parent' | 'teacher';
    ids: string[];
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: File[];
}

// Types pour les filtres
export interface AssignmentFilter {
  courseId?: string;
  classId?: string;
  type?: 'homework' | 'exam' | 'project' | 'quiz';
  status?: 'draft' | 'published' | 'graded' | 'archived';
  dueDate?: {
    start: string;
    end: string;
  };
}

export interface GradeFilter {
  courseId?: string;
  classId?: string;
  studentId?: string;
  type?: 'assignment' | 'exam' | 'participation' | 'bonus';
  dateRange?: {
    start: string;
    end: string;
  };
}

// Constantes
export const ASSIGNMENT_TYPES = [
  'homework',
  'exam',
  'project',
  'quiz',
] as const;

export const ASSIGNMENT_STATUSES = [
  'draft',
  'published',
  'graded',
  'archived',
] as const;

export const COMMUNICATION_PRIORITIES = [
  'low',
  'medium',
  'high',
  'urgent',
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

// Helper functions
export const calculateGradePercentage = (grade: number, maxGrade: number): number => {
  return Math.round((grade / maxGrade) * 100);
};

export const getAssignmentStatusColor = (status: Assignment['status']): string => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'published':
      return 'bg-blue-100 text-blue-800';
    case 'graded':
      return 'bg-green-100 text-green-800';
    case 'archived':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: Communication['priority']): string => {
  switch (priority) {
    case 'low':
      return 'bg-gray-100 text-gray-800';
    case 'medium':
      return 'bg-blue-100 text-blue-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatScheduleTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}; 