import { 
  DashboardIcon, 
  AnnouncementsIcon, 
  DocumentsIcon, 
  TrainingsIcon, 
  CalendarIcon, 
  RequestsIcon,
  ProjectsIcon,
  BotIcon
} from '@/components/shared/dashboard/icons';
import React from 'react';

export const iconMapping: { [key: string]: React.ComponentType } = {
  'Tableau de bord': DashboardIcon,
  'Cours': DocumentsIcon,
  'Cours et devoirs': DocumentsIcon,
  'Notes': RequestsIcon,
  'Notes & Évaluations': ProjectsIcon,
  'Devoirs': RequestsIcon,
  'Formations': TrainingsIcon,
  'Ressources pédagogiques': TrainingsIcon,
  'Emploi du temps': CalendarIcon,
  'Annonces': AnnouncementsIcon,
  'Communications': AnnouncementsIcon,
  'Discussion': AnnouncementsIcon,
  'Statistiques': DashboardIcon,
  'Suivi scolaire': DocumentsIcon,
  'Demandes': RequestsIcon,
  'Agenda': CalendarIcon,
  'Utilisateurs': DocumentsIcon,
  'Classes': TrainingsIcon,
  'Rapports': AnnouncementsIcon,
  'Planning': CalendarIcon,
  'Logs': RequestsIcon,
  'Équipements': DocumentsIcon,
  'Inventaire': TrainingsIcon,
  'Maintenance': AnnouncementsIcon,
  'Tickets': CalendarIcon,
  'Groupes de travail': ProjectsIcon,
  'Assistants IA': BotIcon,
};

export const getIconForLabel = (label: string): React.ReactNode => {
  const IconComponent = iconMapping[label] || DashboardIcon;
  return React.createElement(IconComponent);
}; 