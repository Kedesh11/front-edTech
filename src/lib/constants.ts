// Configuration de l'application
export const APP_CONFIG = {
  name: 'edTech',
  description: 'Plateforme éducative intelligente',
  version: '1.0.0',
  author: 'edTech Team',
} as const;

// Routes de l'application
export const ROUTES = {
  // Pages publiques
  home: '/',
  login: '/login',
  contact: '/contact',
  
  // Dashboards par rôle
  student: {
    dashboard: '/student/dashboard',
    courses: '/student/courses',
    grades: '/student/grades',
    assignments: '/student/assignments',
    schedule: '/student/schedule',
    resources: '/student/resources',
  },
  
  parent: {
    dashboard: '/parent/dashboard',
  },
  
  teacher: {
    dashboard: '/teacher/dashboard',
    courses: '/teacher/courses',
    grades: '/teacher/grades',
    assignments: '/teacher/assignments',
    communications: '/teacher/communications',
    schedule: '/teacher/schedule',
    resources: '/teacher/resources',
  },
  
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    classes: '/admin/classes',
    reports: '/admin/reports',
    planning: '/admin/planning',
    logs: '/admin/logs',
    settings: '/admin/settings',
  },
  
  technician: {
    dashboard: '/technician/dashboard',
    equipment: '/technician/equipment',
    inventory: '/technician/inventory',
    maintenance: '/technician/maintenance',
    tickets: '/technician/tickets',
  },
} as const;

// Rôles utilisateurs
export const USER_ROLES = {
  student: 'student',
  parent: 'parent',
  teacher: 'teacher',
  admin: 'admin',
  technician: 'technician',
} as const;

// Permissions système
export const PERMISSIONS = {
  // Gestion des utilisateurs
  user: {
    read: 'user:read',
    write: 'user:write',
    delete: 'user:delete',
  },
  
  // Gestion des classes
  class: {
    read: 'class:read',
    write: 'class:write',
    delete: 'class:delete',
  },
  
  // Gestion des notes
  grade: {
    read: 'grade:read',
    write: 'grade:write',
  },
  
  // Administration système
  system: {
    admin: 'system:admin',
  },
  
  // Rapports
  reports: {
    read: 'reports:read',
    write: 'reports:write',
  },
} as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  authentication: {
    invalidCredentials: 'Email ou mot de passe incorrect',
    unauthorized: 'Accès non autorisé',
    sessionExpired: 'Session expirée, veuillez vous reconnecter',
  },
  validation: {
    required: 'Ce champ est requis',
    email: 'Veuillez saisir une adresse email valide',
    password: 'Le mot de passe doit contenir au moins 8 caractères',
  },
  network: {
    connectionError: 'Erreur de connexion',
    serverError: 'Erreur serveur',
    timeout: 'Délai d\'attente dépassé',
  },
} as const;

// Messages de succès
export const SUCCESS_MESSAGES = {
  authentication: {
    loginSuccess: 'Connexion réussie',
    logoutSuccess: 'Déconnexion réussie',
  },
  data: {
    saveSuccess: 'Données sauvegardées avec succès',
    deleteSuccess: 'Suppression réussie',
    updateSuccess: 'Mise à jour réussie',
  },
} as const;

// Configuration des thèmes
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
    },
  },
} as const; 