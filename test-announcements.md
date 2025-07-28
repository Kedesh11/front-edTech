# Test de la page des annonces - Scroll

## 🎯 Objectif
Vérifier que la liste des annonces est scrollable et que la partie détail reste fixe.

## 📋 Étapes de test

### 1. Accès à la page
1. Ouvrir http://localhost:3000
2. Se connecter avec : `eleve@gmail.com` / `eleve1234`
3. Naviguer vers "Annonces" dans la sidebar

### 2. Vérification du layout
- ✅ La page doit avoir une hauteur fixe (`h-[calc(100vh-400px)]`)
- ✅ La grille doit être en 3 colonnes (1 pour la liste, 2 pour le détail)
- ✅ Les deux cartes doivent avoir `h-full flex flex-col`

### 3. Test du scroll de la liste
- ✅ La liste des annonces doit être scrollable
- ✅ Le header "Liste des annonces" doit rester fixe
- ✅ Le contenu de la liste doit défiler avec `overflow-y-auto`
- ✅ Un padding right (`pr-2`) doit être visible pour la scrollbar

### 4. Test du scroll du détail
- ✅ La partie détail doit prendre tout l'espace restant
- ✅ Le header "Détail de l'annonce" doit rester fixe
- ✅ Le contenu du détail doit être scrollable si nécessaire
- ✅ Un padding right (`pr-2`) doit être visible pour la scrollbar

### 5. Test de la sélection
- ✅ Cliquer sur une annonce doit la sélectionner
- ✅ L'annonce sélectionnée doit avoir un ring bleu
- ✅ Le détail doit se mettre à jour dynamiquement
- ✅ Le scroll de la liste doit rester indépendant du détail

## 🔧 Modifications apportées

### Structure CSS
```css
/* Container principal */
.h-[calc(100vh-400px)] /* Hauteur fixe */

/* Cartes */
.h-full.flex.flex-col /* Layout flexbox */

/* Headers */
.flex-shrink-0 /* Headers fixes */

/* Contenu scrollable */
.flex-1.overflow-hidden /* Container du scroll */
.h-full.overflow-y-auto /* Contenu scrollable */
.pr-2 /* Padding pour la scrollbar */
```

### Comportement attendu
1. **Liste** : Scroll vertical indépendant, header fixe
2. **Détail** : Scroll vertical indépendant, header fixe
3. **Responsive** : Sur mobile, les sections s'empilent
4. **Performance** : Scroll fluide, pas de re-render inutiles

## 🐛 Problèmes potentiels
- [ ] Scroll qui ne fonctionne pas
- [ ] Headers qui bougent
- [ ] Hauteur incorrecte
- [ ] Responsive cassé
- [ ] Performance dégradée

## ✅ Critères de succès
- [ ] Liste scrollable avec header fixe
- [ ] Détail scrollable avec header fixe
- [ ] Sélection d'annonce fonctionnelle
- [ ] Interface responsive
- [ ] Performance fluide 