import { SidebarItem } from '@/components/layout/DashboardLayout';

export interface SidebarConfig {
  [role: string]: Omit<SidebarItem, 'icon'>[];
}

export const sidebarConfig: SidebarConfig = {
  teacher: [
    { label: 'Tableau de bord', href: '/teacher/dashboard' },
    { label: 'Cours', href: '/teacher/courses' },
    { label: 'Notes & Évaluations', href: '/teacher/grades' },
    { label: 'Devoirs', href: '/teacher/assignments' },
    { label: 'Emploi du temps', href: '/teacher/schedule' },
    { label: 'Communications', href: '/teacher/communications' },
    { label: 'Ressources pédagogiques', href: '/teacher/resources' },
    { label: 'Discussion', href: '/teacher/discussions' },
    { label: 'Statistiques', href: '/teacher/statistics' },
  ],
  parent: [
    { label: 'Tableau de bord', href: '/parent/dashboard' },
    { label: 'Suivi scolaire', href: '/parent/academic' },
    { label: 'Demandes', href: '/parent/requests' },
    { label: 'Agenda', href: '/parent/calendar' },
    { label: 'Communications', href: '/parent/communications' },
    { label: 'Discussion', href: '/parent/discussions' },
    { label: 'Statistiques', href: '/parent/statistics' },
  ],
  student: [
    { label: 'Tableau de bord', href: '/student/dashboard' },
    { label: 'Cours et devoirs', href: '/student/courses' },
    { label: 'Notes', href: '/student/grades' },
    { label: 'Formations', href: '/student/trainings' },
    { label: 'Annonces', href: '/student/announcements' },
    { label: 'Emploi du temps', href: '/student/schedule' },
    { label: 'Statistiques', href: '/student/statistics' },
  ],
  admin: [
    { label: 'Tableau de bord', href: '/admin/dashboard' },
    { label: 'Utilisateurs', href: '/admin/users' },
    { label: 'Classes', href: '/admin/classes' },
    { label: 'Rapports', href: '/admin/reports' },
    { label: 'Planning', href: '/admin/planning' },
    { label: 'Logs', href: '/admin/logs' },
    { label: 'Statistiques', href: '/admin/statistics' },
  ],
  technician: [
    { label: 'Tableau de bord', href: '/technician/dashboard' },
    { label: 'Équipements', href: '/technician/equipment' },
    { label: 'Inventaire', href: '/technician/inventory' },
    { label: 'Maintenance', href: '/technician/maintenance' },
    { label: 'Tickets', href: '/technician/tickets' },
    { label: 'Statistiques', href: '/technician/statistics' },
  ],
};

export const getSidebarItems = (role: string): Omit<SidebarItem, 'icon'>[] => {
  return sidebarConfig[role] || [];
}; 