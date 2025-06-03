# 🍆 Zeub Clicker - Documentation Complète

## 📋 Vue d'ensemble du projet

Zeub Clicker est un jeu de type "clicker" développé en HTML/CSS/JavaScript vanilla. Le joueur clique sur un bouton principal pour gagner de l'argent et peut acheter des améliorations pour automatiser et augmenter ses gains.

## 🎯 Fonctionnalités implémentées

### ✅ Système de base
- **Clic principal** : Bouton central pour gagner de l'argent
- **Affichage des statistiques** : Argent, gains par clic, gains par seconde
- **Sauvegarde automatique** : Via cookies avec expiration d'1 an
- **Formatage des nombres** : Affichage lisible (K, M, B, T, etc.)

### ✅ Système d'améliorations (10 types)
1. **Curseur Magique** - Coût initial: 15 💰 - Effet: +1 par seconde
2. **Grand-mère Zeub** - Coût initial: 100 💰 - Effet: +5 par seconde
3. **Ferme à Zeub** - Coût initial: 1,100 💰 - Effet: +25 par seconde
4. **Mine de Zeub** - Coût initial: 12,000 💰 - Effet: +100 par seconde
5. **Usine à Zeub** - Coût initial: 130,000 💰 - Effet: +400 par seconde
6. **Banque** - Coût initial: 1,400,000 💰 - Effet: +1,600 par seconde
7. **Temple** - Coût initial: 20,000,000 💰 - Effet: +6,500 par seconde
8. **Sorcier** - Coût initial: 330,000,000 💰 - Effet: +26,000 par seconde
9. **Vaisseau spatial** - Coût initial: 5,100,000,000 💰 - Effet: +100,000 par seconde
10. **Portail** - Coût initial: 75,000,000,000 💰 - Effet: +400,000 par seconde

### ✅ Système de niveaux et expérience
- **Gain d'expérience** : Basé sur l'argent gagné
- **Montée de niveau** : Augmente le multiplicateur (+0.1x par niveau)
- **Barre de progression** : Affichage visuel de l'XP avec animation
- **Badge de niveau** : Indicateur stylisé du niveau actuel

### ✅ Système de bourse (3 actions)
1. **ZeubCoin** - Prix initial: 10 💰
2. **AubergineCorp** - Prix initial: 50 💰
3. **VeggieIndex** - Prix initial: 100 💰
- **Fluctuations de prix** : Toutes les 5 secondes
- **Graphiques visuels** : Barres colorées (vert/rouge selon tendance)
- **Achat/Vente** : Boutons dédiés pour chaque action

### ✅ Système de power-ups
1. **Zeub Doré** : +500% gains pendant 10s (1% chance au clic)
2. **Frénésie** : +200% gains pendant 15s (événement aléatoire)
3. **Frénésie de clic** : +1000% gains par clic pendant 10s (événement aléatoire)
- **Timers visuels** : Affichage du temps restant
- **Animations** : Effet de pulsation

### ✅ Système de succès (4 succès)
1. **Premier clic** : Effectuer le premier clic
2. **Millionnaire** : Gagner 1M au total
3. **Niveau 10** : Atteindre le niveau 10
4. **Investisseur** : Faire son premier investissement
- **Effets visuels** : Succès débloqués en doré avec lueur
- **Notifications** : Popup lors du déblocage

### ✅ Interface utilisateur
- **Design glassmorphisme** : Effets de transparence et flou
- **Responsive** : Adaptation mobile et desktop
- **Animations fluides** : Transitions CSS et effets hover
- **Notifications** : Système de popup pour les événements

## 🎨 Style et design

### Palette de couleurs
- **Arrière-plan** : Dégradé violet/bleu (#667eea → #764ba2)
- **Cartes** : rgba(255, 255, 255, 0.1) avec bordures transparentes
- **Texte principal** : Blanc (#fff)
- **Texte secondaire** : Gris clair (#ccc)
- **Succès** : Doré (#FFD700, #FFA500)
- **Positif** : Vert (#4CAF50)
- **Négatif** : Rouge (#f44336)

### Typographie
- **Police** : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tailles** : 16px base, variations selon contexte
- **Poids** : Normal à bold selon importance

### Effets visuels
- **Glassmorphisme** : backdrop-filter: blur(10px)
- **Ombres** : box-shadow avec rgba pour profondeur
- **Transitions** : 0.3s ease pour interactions
- **Animations** : @keyframes pour effets spéciaux

### Layout
- **Grid/Flexbox** : Mise en page moderne
- **Responsive breakpoints** : 768px, 1200px
- **Espacement** : Système cohérent (10px, 15px, 20px)

## 🔧 Architecture technique

### État du jeu (gameState)
```javascript
{
  money: 0,                    // Argent actuel
  totalEarned: 0,             // Total gagné
  perClick: 1,                // Gains par clic
  perSecond: 0,               // Gains par seconde
  level: 1,                   // Niveau actuel
  experience: 0,              // XP actuelle
  experienceToNext: 100,      // XP requise pour niveau suivant
  multiplier: 1.0,            // Multiplicateur global
  upgrades: {...},            // État des améliorations
  stockMarket: {...},         // État de la bourse
  powerUps: {...},            // État des power-ups
  achievements: {...}         // État des succès
}
```

### Fonctions principales
- `updateDisplay()` : Met à jour l'affichage
- `buyUpgrade(upgradeId)` : Achat d'amélioration
- `gainExperience(amount)` : Gestion XP et niveaux
- `buyStock()/sellStock()` : Gestion bourse
- `saveGame()/loadGame()` : Persistance via cookies
- `formatNumber()` : Formatage des grands nombres

## 🚀 Suggestions pour refonte serveur

### Base de données recommandée
- **Utilisateurs** : ID, nom, email, mot de passe
- **Sauvegardes** : ID utilisateur, état du jeu (JSON), timestamp
- **Classements** : Scores globaux, niveaux, richesse
- **Événements** : Logs des actions importantes

### API endpoints suggérés
```
GET  /api/game/load          # Charger sauvegarde
POST /api/game/save          # Sauvegarder état
GET  /api/leaderboard        # Classements
GET  /api/stocks/prices      # Prix actions en temps réel
POST /api/achievements       # Débloquer succès
```

### Fonctionnalités serveur additionnelles
- **Multijoueur** : Classements en temps réel
- **Événements globaux** : Bonus communautaires
- **Marché dynamique** : Prix actions basés sur activité globale
- **Anti-triche** : Validation côté serveur
- **Sauvegarde cloud** : Synchronisation multi-appareils

### Technologies recommandées
- **Backend** : Node.js/Express, Python/Django, ou PHP/Laravel
- **Base de données** : PostgreSQL ou MongoDB
- **Temps réel** : WebSockets pour prix actions
- **Cache** : Redis pour performances
- **Auth** : JWT ou sessions

## 📱 Responsive design

### Breakpoints
- **Mobile** : < 768px (colonne unique)
- **Tablet** : 768px - 1200px (2 colonnes)
- **Desktop** : > 1200px (3+ colonnes)

### Adaptations mobiles
- Bouton clicker plus grand
- Navigation simplifiée
- Texte plus lisible
- Espacement optimisé

## 🎮 Gameplay et équilibrage

### Progression
- **Début** : Clic manuel, premières améliorations
- **Milieu** : Automatisation, investissements
- **Fin** : Power-ups, optimisation, prestige

### Économie
- **Coûts exponentiels** : Facteur 1.15 par achat
- **Gains équilibrés** : Progression satisfaisante
- **Variété** : Multiples stratégies viables

## 🔮 Fonctionnalités futures possibles

### Gameplay
- **Système de prestige** : Recommencer avec bonus
- **Quêtes/défis** : Objectifs spéciaux
- **Événements temporaires** : Bonus limités
- **Mini-jeux** : Diversification gameplay

### Social
- **Guildes/clans** : Coopération entre joueurs
- **Chat global** : Communication communauté
- **Partage** : Screenshots, succès

### Monétisation (si applicable)
- **Cosmétiques** : Skins, thèmes
- **Boost temporaires** : Accélération optionnelle
- **Pass premium** : Contenu exclusif

---

*Documentation créée le $(date) - Version actuelle du jeu entièrement fonctionnelle*