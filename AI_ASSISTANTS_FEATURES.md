# 🤖 Système d'Assistants IA

## 📋 Vue d'ensemble

Le système d'assistants IA permet aux étudiants de consulter des agents spécialisés pour obtenir de l'aide sur leurs cours et exercices. **Pendant les devoirs et examens, les agents IA sont automatiquement désactivés** pour assurer l'équité et encourager l'apprentissage autonome.

## 🚀 Fonctionnalités principales

### 1. **Agents IA spécialisés**
- **Mathéo** : Expert en mathématiques (algèbre, géométrie, calcul)
- **Sophie** : Professeure de français (littérature, grammaire)
- **Dr. Sciences** : Expert en sciences (SVT, Physique-Chimie)
- **Clio** : Historienne (histoire-géographie, culture générale)
- **Emma** : Native English speaker (anglais, conversation)
- **Socrate** : Philosophe (philosophie, réflexion critique)

### 2. **Capacités des agents**
- ✅ **Aide aux cours** : Explications de concepts
- ✅ **Aide aux exercices** : Résolution guidée
- ✅ **Aide aux devoirs** : Support restreint
- ❌ **Aide aux examens** : Désactivée
- ✅ **Explications détaillées** : Approfondissement
- ✅ **Exemples pratiques** : Cas concrets
- ✅ **Résolution étape par étape** : Méthodologie

### 3. **Personnalités des agents**
- **Mathéo** : Ton amical, niveau intermédiaire
- **Sophie** : Ton professionnel, niveau avancé
- **Dr. Sciences** : Ton encourageant, niveau intermédiaire
- **Clio** : Ton professionnel, niveau avancé
- **Emma** : Ton amical, anglais natif
- **Socrate** : Ton strict, niveau avancé

## 🛡️ Système de restrictions

### **Restrictions automatiques**

#### 📝 **Pendant les devoirs**
- **Désactivation** : Agents IA automatiquement désactivés
- **Message** : "Les agents IA sont temporairement désactivés pendant les devoirs pour encourager l'apprentissage autonome."
- **Réactivation** : Automatique à la soumission du devoir

#### 📋 **Pendant les examens**
- **Désactivation** : Agents IA automatiquement désactivés
- **Message** : "Les agents IA sont temporairement désactivés pendant les examens pour assurer l'équité."
- **Réactivation** : Automatique à la fin de l'examen

### **Restrictions configurables**
- **Restrictions temporelles** : Horaires d'activité
- **Restrictions de niveau** : Niveaux autorisés (2nde, 1ère, Tle)
- **Restrictions de matière** : Matières supportées par agent

## 🎯 Utilisation

### **Pour les étudiants**

1. **Accéder aux agents**
   - Navigation : "Assistants IA" dans le menu
   - Vue d'ensemble des agents disponibles
   - Filtrage par matière, capacité, disponibilité

2. **Démarrer une conversation**
   - Sélection d'un agent
   - Choix de la matière
   - Définition du sujet de conversation
   - Lancement de la session

3. **Interagir avec l'agent**
   - Messages en temps réel
   - Réponses personnalisées selon l'agent
   - Support de différents types de contenu (texte, code, images)

4. **Évaluer l'aide**
   - Notation de 1 à 5 étoiles
   - Feedback textuel
   - Amélioration continue des agents

### **Interface utilisateur**

#### **Page principale**
- **Liste des agents** : Vue d'ensemble avec statuts
- **Filtres** : Recherche, matière, capacité, disponibilité
- **Détail de l'agent** : Informations complètes et statistiques
- **Bouton de conversation** : Accès direct à l'agent

#### **Conversation**
- **Chat en temps réel** : Interface de messagerie
- **Historique** : Messages précédents
- **Métadonnées** : Sujet, difficulté, tags
- **Évaluation** : Système de notation

## 🔧 Configuration technique

### **Types de données**

```typescript
// Agent IA
interface AIAgent {
  id: string;
  name: string;
  description: string;
  subject: string;
  subjects: string[];
  capabilities: {
    courseHelp: boolean;
    exerciseHelp: boolean;
    homeworkHelp: boolean;
    examHelp: boolean;
    explanation: boolean;
    examples: boolean;
    stepByStep: boolean;
  };
  personality: {
    tone: 'friendly' | 'professional' | 'encouraging' | 'strict';
    language: 'french' | 'english';
    detailLevel: 'basic' | 'intermediate' | 'advanced';
  };
  restrictions: {
    disabledDuringExams: boolean;
    disabledDuringHomework: boolean;
    timeRestrictions?: TimeRestrictions;
    gradeRestrictions?: GradeRestrictions;
  };
}

// Session d'examen/devoir
interface ExamSession {
  id: string;
  studentId: string;
  examId: string;
  isActive: boolean;
  aiRestrictions: {
    agentsDisabled: boolean;
    disabledAt: string;
    enabledAt?: string;
    reason: 'exam' | 'homework' | 'manual';
  };
}
```

### **Fonctions utilitaires**

```typescript
// Vérifier la disponibilité d'un agent
const isAgentAvailable = (
  agent: AIAgent,
  currentTime: Date,
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): boolean

// Obtenir le statut de disponibilité
const getAgentAvailabilityStatus = (
  agent: AIAgent,
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): 'available' | 'busy' | 'offline' | 'restricted'

// Obtenir le message de restriction
const getRestrictionMessage = (
  examSessions: ExamSession[],
  homeworkSessions: HomeworkSession[]
): string | null
```

## 📊 Statistiques et analytics

### **Données collectées**
- **Conversations** : Nombre total par étudiant
- **Notes moyennes** : Évaluation des agents
- **Aides fournies** : Nombre d'assistances
- **Temps d'activité** : Fréquence d'utilisation
- **Matières populaires** : Préférences des étudiants

### **Métriques disponibles**
- **Efficacité** : Taux de satisfaction
- **Engagement** : Fréquence d'utilisation
- **Impact** : Amélioration des résultats
- **Préférences** : Agents les plus populaires

## 🎨 Design et UX

### **Principes de design**
- **Accessibilité** : Interface intuitive
- **Feedback** : Messages clairs sur les restrictions
- **Personnalisation** : Agents avec personnalités distinctes
- **Responsive** : Adaptation mobile

### **États visuels**
- **Disponible** : Badge vert "Disponible"
- **Occupé** : Badge jaune "Occupé"
- **Restreint** : Badge rouge "Restreint"
- **Hors ligne** : Badge gris "Hors ligne"

## 🛡️ Sécurité et éthique

### **Mesures de sécurité**
- **Authentification** : Accès réservé aux étudiants
- **Traçabilité** : Historique des conversations
- **Modération** : Contenu surveillé
- **Confidentialité** : Données protégées

### **Éthique**
- **Équité** : Restrictions pendant les évaluations
- **Apprentissage** : Encouragement de l'autonomie
- **Transparence** : Messages clairs sur les restrictions
- **Responsabilité** : Utilisation responsable de l'IA

## 🔄 Évolutions futures

### **Fonctionnalités prévues**
- **IA conversationnelle avancée** : Réponses plus sophistiquées
- **Support multilingue** : Plus de langues
- **Intégration vidéo** : Explications visuelles
- **Personnalisation** : Adaptation au profil de l'étudiant
- **Collaboration** : Sessions de groupe

### **Améliorations techniques**
- **IA générative** : Réponses plus naturelles
- **Apprentissage automatique** : Amélioration continue
- **API externes** : Intégration d'outils éducatifs
- **Analytics avancés** : Métriques détaillées

## 🧪 Tests et validation

### **Scénarios de test**
1. **Accès normal** : Consultation des agents en temps normal
2. **Restriction devoir** : Désactivation pendant un devoir
3. **Restriction examen** : Désactivation pendant un examen
4. **Réactivation** : Retour à la normale après évaluation
5. **Conversation** : Test des interactions avec les agents

### **Données de test**
- **Agents** : 6 agents avec différentes personnalités
- **Sessions** : Examens et devoirs actifs/inactifs
- **Conversations** : Historique d'interactions
- **Restrictions** : Différents types de limitations

## 📈 Impact pédagogique

### **Avantages pour les étudiants**
- **Aide personnalisée** : Support adapté aux besoins
- **Disponibilité 24/7** : Accès permanent
- **Approche différente** : Explications alternatives
- **Confiance** : Encouragement et motivation

### **Avantages pour les enseignants**
- **Support supplémentaire** : Aide aux étudiants en difficulté
- **Réduction de charge** : Questions basiques traitées
- **Visibilité** : Suivi des difficultés des étudiants
- **Complémentarité** : Outil d'apprentissage supplémentaire

### **Avantages pour l'institution**
- **Innovation** : Utilisation responsable de l'IA
- **Équité** : Accès égal à l'aide pour tous
- **Efficacité** : Optimisation des ressources
- **Modernité** : Outils éducatifs contemporains 