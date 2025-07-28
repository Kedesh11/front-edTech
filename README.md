# edTech - Plateforme éducative intelligente

Une plateforme éducative moderne qui réunit élèves, parents, enseignants et administrateurs pour une expérience d'apprentissage optimale.

## 🚀 Technologies

- **Framework** : Next.js 15.4.4 avec App Router
- **Langage** : TypeScript 5
- **Styling** : TailwindCSS 4
- **React** : Version 19.1.0
- **Visualisation** : Plotly.js
- **Linting** : ESLint avec configuration Next.js

## 📁 Architecture

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── (auth)/            # Pages d'authentification
│   ├── (dashboard)/       # Dashboards par rôle
│   ├── (marketing)/       # Pages publiques
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── layout/           # Composants de layout
│   └── shared/           # Composants partagés
├── contexts/             # Contextes React
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et services
├── types/                # Types TypeScript
└── data/                 # Données mock
```

## 🏗️ Fonctionnalités

### 🔐 Authentification
- Système d'authentification centralisé
- Gestion des rôles utilisateurs
- Protection des routes par rôle
- Contexte d'authentification React

### 👥 Rôles utilisateurs
- **Élèves** : Parcours personnalisé, suivi IA, support 24/7
- **Parents** : Suivi en temps réel, communication directe
- **Enseignants** : Outils IA, analytics avancés
- **Administrateurs** : Pilotage complet, sécurité renforcée
- **Techniciens** : Gestion équipements, maintenance

### 🎨 Design System
- Composants UI réutilisables
- Système de thème cohérent
- Responsive design
- Accessibilité intégrée

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd edtech
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🔑 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Élève | eleve@gmail.com | eleve1234 |
| Parent | parent@gmail.com | parent1234 |
| Enseignant | enseignant@gmail.com | enseignant1234 |
| Admin | admin@gmail.com | admin1234 |
| Technicien | technicien@gmail.com | technicien1234 |

## 📋 Scripts disponibles

```bash
npm run dev          # Développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification du code
```

## 🏛️ Architecture technique

### Principes SOLID
- **S** : Responsabilité unique pour chaque composant
- **O** : Extension ouverte, modification fermée
- **L** : Substitution de Liskov pour les types
- **I** : Interfaces ségrégées
- **D** : Inversion de dépendance

### Patterns utilisés
- **Singleton** : Service d'authentification
- **Factory** : Création de composants UI
- **Observer** : Contexte React pour l'état global
- **Strategy** : Différentes stratégies d'authentification
- **Decorator** : Composants avec props étendues

### Séparation des responsabilités
- **Présentation** : Composants React
- **Logique métier** : Services et hooks
- **Données** : Types et interfaces
- **Configuration** : Constantes et configuration

## 🔧 Configuration

### Variables d'environnement
```env
NEXT_PUBLIC_APP_NAME=edTech
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### TypeScript
- Configuration stricte activée
- Path mapping configuré
- Types génériques pour la flexibilité

### ESLint
- Règles Next.js
- Configuration TypeScript
- Règles de qualité du code

## 📊 Performance

### Optimisations Next.js
- App Router pour le rendu côté serveur
- Turbopack pour le développement rapide
- Optimisation automatique des images
- Code splitting automatique

### Optimisations React
- Memoization des composants
- Hooks optimisés
- État local vs global approprié

## 🔒 Sécurité

### Authentification
- Validation côté client et serveur
- Protection des routes sensibles
- Gestion des sessions sécurisée

### Données
- Validation TypeScript stricte
- Sanitisation des entrées utilisateur
- Protection contre les injections

## 🧪 Tests

```bash
# Tests unitaires (à implémenter)
npm run test

# Tests d'intégration (à implémenter)
npm run test:integration

# Couverture de code (à implémenter)
npm run test:coverage
```

## 📈 Monitoring

### Métriques
- Performance des pages
- Temps de chargement
- Erreurs utilisateur
- Utilisation des fonctionnalités

### Logs
- Logs d'authentification
- Logs d'erreur
- Logs de performance

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐳 Dockerisation (production)

### Build de l'image

```bash
docker build -t edtech-frontend ./edtech
```

### Lancer le conteneur

```bash
docker run -p 3000:3000 edtech-frontend
```

- L'application sera disponible sur http://localhost:3000
- Utilise un utilisateur non-root pour la sécurité
- Multi-stage build pour une image légère et sécurisée

**Bonnes pratiques suivies :**
- Multi-stage build (build + prod)
- Utilisateur non-root
- .dockerignore optimisé
- Copie minimale des fichiers nécessaires
- Scripts npm adaptés (build, start)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@edtech.com
- 📱 Téléphone : +241 77 15 79 04
- 🌐 Site web : https://edtech.com/support

---

**edTech** - L'éducation de demain, aujourd'hui.