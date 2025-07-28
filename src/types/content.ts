export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  category: 'general' | 'academic' | 'event' | 'reminder' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: string[];
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  isRead: boolean;
  tags: string[];
}

export interface Training {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    department: string;
  };
  category: 'academic' | 'skill' | 'career' | 'technology' | 'soft-skills';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: {
    hours: number;
    minutes: number;
  };
  schedule: {
    startDate: string;
    endDate: string;
    sessions: {
      day: string;
      time: string;
      duration: number;
    }[];
  };
  location: {
    type: 'online' | 'classroom' | 'hybrid';
    room?: string;
    platform?: string;
    link?: string;
  };
  maxParticipants: number;
  currentParticipants: number;
  prerequisites: string[];
  objectives: string[];
  materials: {
    name: string;
    type: 'document' | 'video' | 'link' | 'tool';
    url: string;
    description: string;
  }[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  enrollmentStatus: 'open' | 'closed' | 'waitlist';
  certificate: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingEnrollment {
  id: string;
  trainingId: string;
  studentId: string;
  enrollmentDate: string;
  status: 'enrolled' | 'attending' | 'completed' | 'dropped';
  progress: number; // 0-100
  lastAccessed: string;
  certificateUrl?: string;
}

export interface AnnouncementFilter {
  category?: Announcement['category'];
  priority?: Announcement['priority'];
  isRead?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TrainingFilter {
  category?: Training['category'];
  level?: Training['level'];
  status?: Training['status'];
  enrollmentStatus?: Training['enrollmentStatus'];
  instructor?: string;
} 