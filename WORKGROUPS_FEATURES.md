# 🎓 Système de Groupes de Travail

## 📋 Vue d'ensemble

Le système de groupes de travail permet aux étudiants de créer et rejoindre des groupes d'étude avec leurs camarades de classe. Les restrictions par classe garantissent que les étudiants ne peuvent interagir qu'avec leurs pairs du même niveau.

## 🔐 Restrictions par classe

### Classes autorisées
- **Seconde** (`2nde`) : Étudiants de seconde uniquement
- **Première** (`1ère`) : Étudiants de première uniquement  
- **Terminale** (`Tle`) : Étudiants de terminale uniquement

### Règles de sécurité
- ✅ Un étudiant ne peut créer/rejoindre que des groupes de sa classe
- ✅ Les groupes sont automatiquement filtrés selon la classe de l'étudiant
- ✅ Impossible de contourner les restrictions par classe
- ✅ Seuls les étudiants de la même classe peuvent voir les groupes

## 🚀 Fonctionnalités principales

### 1. **Création de groupes**
- Nom et description du groupe
- Nombre maximum de membres (3 à 10)
- Matière principale (optionnel)
- Tags pour catégoriser
- Planning des réunions (jour, heure, durée)
- Lieu de réunion

### 2. **Gestion des membres**
- Rejoindre un groupe (si de la place)
- Quitter un groupe (sauf créateur)
- Voir les membres actuels
- Statut du groupe (ouvert/complet/fermé)

### 3. **Filtrage et recherche**
- Par matière
- Par statut (actif/inactif)
- Groupes avec de la place
- Mes groupes
- Groupes créés par moi

### 4. **Interface utilisateur**
- Liste scrollable des groupes
- Détail fixe du groupe sélectionné
- Modal de création
- Badges de statut
- Actions contextuelles

## 📊 Types de données

### WorkGroup
```typescript
interface WorkGroup {
  id: string;
  name: string;
  description: string;
  class: string; // Classe autorisée
  grade: string; // Niveau autorisé
  createdBy: string; // ID de l'étudiant créateur
  createdAt: string;
  updatedAt: string;
  maxMembers: number;
  currentMembers: number;
  isActive: boolean;
  tags: string[];
  subject?: string;
  meetingSchedule?: {
    day: string;
    time: string;
    duration: number;
  };
  meetingLocation?: string;
}
```

### WorkGroupMember
```typescript
interface WorkGroupMember {
  id: string;
  workGroupId: string;
  studentId: string;
  joinedAt: string;
  role: 'creator' | 'member';
  isActive: boolean;
}
```

## 🎯 Utilisation

### Pour les étudiants

1. **Accéder aux groupes**
   - Dashboard étudiant → "Groupes de travail"
   - Voir les statistiques sur le dashboard

2. **Créer un groupe**
   - Cliquer sur "Créer un groupe"
   - Remplir le formulaire
   - Le groupe est automatiquement créé pour sa classe

3. **Rejoindre un groupe**
   - Parcourir la liste des groupes disponibles
   - Cliquer sur "Rejoindre" si de la place
   - Vérification automatique de la classe

4. **Gérer ses groupes**
   - Voir ses groupes dans "Mes groupes"
   - Quitter un groupe (sauf si créateur)
   - Voir les détails et planning

### Fonctions utilitaires

```typescript
// Vérifier si un étudiant peut rejoindre un groupe
canStudentJoinWorkGroup(studentClass, studentGrade, workGroupClass, workGroupGrade)

// Obtenir le statut d'un groupe
getWorkGroupStatus(workGroup) // 'open' | 'full' | 'closed'

// Formater le planning des réunions
formatMeetingSchedule(schedule)
```

## 🔧 Configuration

### Sidebar
- Ajout de "Groupes de travail" dans la navigation étudiant
- Icône : ProjectsIcon (groupe de personnes)

### Dashboard
- Composant `WorkGroupStats` intégré
- Affichage des statistiques des groupes
- Lien vers la page complète

## 📱 Interface utilisateur

### Page principale
- **En-tête fixe** : Titre, description, bouton création
- **Filtres** : Matière, statut, affichage
- **Liste scrollable** : Groupes disponibles
- **Détail fixe** : Informations du groupe sélectionné

### Modal de création
- Formulaire complet avec validation
- Champs obligatoires : nom, description, max membres
- Champs optionnels : matière, tags, planning, lieu

### Responsive design
- Desktop : 3 colonnes (liste + détail)
- Mobile : 1 colonne avec navigation

## 🛡️ Sécurité

### Vérifications côté client
- Filtrage automatique par classe
- Validation des formulaires
- Gestion des permissions

### Données mock
- 6 groupes de travail pré-créés
- Répartition par classe (2nde, 1ère, Tle)
- Membres et invitations de test

## 🎨 Design system

### Couleurs de statut
- **Ouvert** : Vert (disponible)
- **Complet** : Jaune (plein)
- **Fermé** : Rouge (inactif)

### Composants utilisés
- `Card`, `CardHeader`, `CardContent`, `CardTitle`
- `Button`, `Input`, `Select`, `Textarea`
- `Badge` pour les statuts et tags

## 📈 Statistiques

### Dashboard étudiant
- Nombre de groupes rejoints
- Nombre de groupes créés
- Groupes actifs
- Total de membres
- Groupes récents (3 premiers)

### Métriques disponibles
- Taux de participation par classe
- Popularité des matières
- Taille moyenne des groupes
- Activité des créateurs

## 🔄 Évolutions futures

### Fonctionnalités prévues
- Système d'invitations
- Chat intégré
- Partage de documents
- Calendrier des réunions
- Notifications

### Améliorations techniques
- Base de données réelle
- API REST
- Authentification JWT
- WebSockets pour le chat
- Upload de fichiers

## 🧪 Tests

### Scénarios de test
1. **Création de groupe** : Étudiant seconde crée un groupe
2. **Rejoindre un groupe** : Étudiant rejoint un groupe de sa classe
3. **Restriction de classe** : Tentative de rejoindre un groupe d'une autre classe
4. **Groupe complet** : Tentative de rejoindre un groupe plein
5. **Quitter un groupe** : Étudiant quitte un groupe (sauf créateur)

### Données de test
- Étudiants de différentes classes
- Groupes avec différents statuts
- Membres et invitations variés 