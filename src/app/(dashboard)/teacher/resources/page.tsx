'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/mock/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout, SidebarItem } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  DashboardIcon,
  AnnouncementsIcon,
  DocumentsIcon,
  TrainingsIcon,
  CalendarIcon,
  RequestsIcon,
  ProjectsIcon,
} from '@/components/shared/dashboard/icons';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'exercise';
  subject: string;
  class: string;
  uploadDate: string;
  size: string;
  format: string;
  downloads: number;
  author: string;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Cours sur les fonctions exponentielles',
    description: 'Support de cours complet sur les fonctions exponentielles avec exercices corrigés',
    type: 'document',
    subject: 'Mathématiques',
    class: '1ère A',
    uploadDate: '2025-07-25',
    size: '2.5 MB',
    format: 'PDF',
    downloads: 45,
    author: 'Jean Dupont'
  },
  {
    id: '2',
    title: 'TP Forces et Mouvement - Guide',
    description: 'Guide détaillé pour le TP sur les forces et le mouvement en physique',
    type: 'document',
    subject: 'Physique',
    class: 'Terminale B',
    uploadDate: '2025-07-24',
    size: '1.8 MB',
    format: 'PDF',
    downloads: 32,
    author: 'Jean Dupont'
  },
  {
    id: '3',
    title: 'Vidéo : Introduction aux équations différentielles',
    description: 'Vidéo explicative de 15 minutes sur les équations différentielles',
    type: 'video',
    subject: 'Mathématiques',
    class: 'Terminale B',
    uploadDate: '2025-07-23',
    size: '45 MB',
    format: 'MP4',
    downloads: 28,
    author: 'Jean Dupont'
  },
  {
    id: '4',
    title: 'Exercices interactifs - Trigonométrie',
    description: 'Série d\'exercices interactifs sur la trigonométrie avec correction automatique',
    type: 'exercise',
    subject: 'Mathématiques',
    class: '2nde C',
    uploadDate: '2025-07-22',
    size: '500 KB',
    format: 'HTML',
    downloads: 67,
    author: 'Jean Dupont'
  },
  {
    id: '5',
    title: 'Ressources Khan Academy - Physique',
    description: 'Lien vers les ressources Khan Academy pour le programme de physique',
    type: 'link',
    subject: 'Physique',
    class: 'Toutes classes',
    uploadDate: '2025-07-21',
    size: 'N/A',
    format: 'Lien',
    downloads: 89,
    author: 'Jean Dupont'
  },
  {
    id: '6',
    title: 'Fiche de révision - Contrôle Chapitre 3',
    description: 'Fiche de révision pour le contrôle sur les fonctions exponentielles',
    type: 'document',
    subject: 'Mathématiques',
    class: '1ère A',
    uploadDate: '2025-07-20',
    size: '800 KB',
    format: 'PDF',
    downloads: 52,
    author: 'Jean Dupont'
  }
];

export default function TeacherResources() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Ici tu peux ajouter la logique d'upload réelle
    }, 2000);
  };

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return '📄';
      case 'video':
        return '🎥';
      case 'link':
        return '🔗';
      case 'exercise':
        return '📝';
      default:
        return '📁';
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'link':
        return 'bg-green-100 text-green-800';
      case 'exercise':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return 'Document';
      case 'video':
        return 'Vidéo';
      case 'link':
        return 'Lien';
      case 'exercise':
        return 'Exercice';
      default:
        return type;
    }
  };

  const filteredResources = resources.filter(resource => {
    if (selectedSubject && resource.subject !== selectedSubject) return false;
    if (selectedType && resource.type !== selectedType) return false;
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout
        user={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          role: user?.role || '',
        }}
      >
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ressources pédagogiques
              </h1>
              <p className="text-lg text-gray-600">
                Partagez et gérez vos ressources pédagogiques, supports de cours et exercices.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les matières</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique">Physique</option>
              <option value="Chimie">Chimie</option>
              <option value="Histoire">Histoire</option>
              <option value="Français">Français</option>
            </Select>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les types</option>
              <option value="document">Documents</option>
              <option value="video">Vidéos</option>
              <option value="link">Liens</option>
              <option value="exercise">Exercices</option>
            </Select>
            <button
              onClick={() => setIsUploading(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter une ressource
            </button>
          </div>

          {/* Upload Form */}
          {isUploading && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ajouter une ressource</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <Input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titre de la ressource"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Matière
                    </label>
                    <Select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Sélectionner une matière</option>
                      <option value="Mathématiques">Mathématiques</option>
                      <option value="Physique">Physique</option>
                      <option value="Chimie">Chimie</option>
                      <option value="Histoire">Histoire</option>
                      <option value="Français">Français</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description de la ressource"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Classe
                    </label>
                    <Select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Toutes les classes</option>
                      <option value="1ère A">1ère A</option>
                      <option value="1ère B">1ère B</option>
                      <option value="Term A">Terminale A</option>
                      <option value="Term B">Terminale B</option>
                      <option value="2nde C">2nde C</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <Select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="document">Document</option>
                      <option value="video">Vidéo</option>
                      <option value="link">Lien</option>
                      <option value="exercise">Exercice</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fichier ou URL
                  </label>
                  <Input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUploading(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{getTypeIcon(resource.type)}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                    {getTypeLabel(resource.type)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>📚 {resource.subject}</span>
                    <span>👥 {resource.class}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅 {new Date(resource.uploadDate).toLocaleDateString('fr-FR')}</span>
                    <span>📊 {resource.downloads} téléchargements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💾 {resource.size}</span>
                    <span>📄 {resource.format}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Télécharger
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    Partager
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
              <p className="text-gray-500">Aucune ressource trouvée.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
