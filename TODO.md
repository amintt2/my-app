# 🎮 Clicker Game - Next.js

## 📖 Base du projet

### Vue d'ensemble
Jeu de clicker moderne développé avec **Next.js 15**, **TypeScript**, et **Tailwind CSS**. Le joueur clique pour gagner de l'argent, achète des améliorations, investit en bourse, et débloque des succès dans une interface glassmorphisme élégante.


### Instructions de contribution IA
J'utilise bun pour installer les dépendances, et lancer ne me sugere pas de npm dev car le serveur est dejà lancé.
Pour ajouter des nouvelles fonctionnalités, veuillez suivre les étapes suivantes :
Voir si il y a des dépendances manquantes, ou des compsant a cree, les cree dans le dossier components/game en uitilsant les composants de components/ui. 

### Architecture technique
- **Frontend** : Next.js 15 + TypeScript + Tailwind CSS
- **UI Components** : shadcn/ui + Framer Motion
- **État du jeu** : Hook personnalisé `useGameState`
- **Sauvegarde** : Cookies avec expiration 1 an
- **Graphiques** : Recharts pour les données de bourse

### Dernières modifications réalisées

#### ✅ Système de sauvegarde intelligent
- **Page de sélection** : Interface au démarrage pour choisir entre continuer/nouvelle partie
- **Auto-détection** : Détection automatique de sauvegarde existante
- **Aperçu détaillé** : Statistiques complètes (argent, niveau, temps de jeu, succès)
- **Sauvegarde automatique** : Toutes les 10 secondes via cookies
- **Gestion robuste** : Protection contre suppression accidentelle

#### ✅ Interface utilisateur moderne
- **Design glassmorphisme** : Effets de transparence et dégradés
- **Animations fluides** : Framer Motion pour toutes les transitions
- **Responsive design** : Adaptation mobile et desktop
- **Composants modulaires** : Architecture basée sur shadcn/ui

#### ✅ Fonctionnalités de jeu complètes
- **Système de clic** : Gains avec multiplicateurs et power-ups
- **Améliorations** : 6 types d'upgrades avec coûts progressifs
- **Marché boursier** : 5 actions avec fluctuations réalistes
- **Système de succès** : 12 achievements avec récompenses
- **Revenus passifs** : Génération automatique d'argent

---

## ✅ Tâches à réaliser

### 🟢 COMPLEXITÉ SIMPLE

#### Interface et UX
- [ ] **Séparation boutons XP** : Séparer le bouton XP farming du curseur magique
  - [ ] Créer nouveau bouton dans l'interface
  - [ ] Ajouter état séparé pour XP farming
  - [ ] Mettre à jour le design pour 2 boutons distincts

- [ ] **Indicateurs visuels** : Améliorer le feedback utilisateur
  - [ ] Barre de progression pour XP passif
  - [ ] Compteur temps réel pour XP farming
  - [ ] Notifications pour gains d'XP

#### Équilibrage gameplay
- [ ] **XP passif lent** : Implémenter génération automatique d'expérience
  - [ ] Définir taux d'XP passif (ex: 1 XP/10 secondes)
  - [ ] Ajouter logique dans useGameState
  - [ ] Sauvegarder paramètres XP passif

- [ ] **Paramètres configurables** : Options pour XP farming
  - [ ] Vitesse d'XP farming ajustable
  - [ ] Montant d'XP passif configurable
  - [ ] Interface de paramètres dans settings

### 🟡 COMPLEXITÉ MOYENNE

#### Système de bonus Zubdoré avancé
- [ ] **Animation bourse volante** : Créer bourse qui traverse l'écran
  - [ ] Composant React pour bourse animée
  - [ ] Animation CSS/Framer Motion fluide
  - [ ] Vitesse optimale pour interaction
  - [ ] Gestion des collisions/clics

- [ ] **Système de capture** : Interaction avec la bourse
  - [ ] Détection de clic sur bourse en mouvement
  - [ ] Calcul richesse selon niveau XP
  - [ ] Effets visuels lors de capture
  - [ ] Son/feedback de réussite

- [ ] **Richesse progressive** : Bonus adaptatif selon niveau
  - [ ] Formule de calcul basée sur XP
  - [ ] Multiplicateurs selon achievements
  - [ ] Bonus aléatoires occasionnels
  - [ ] Équilibrage avec économie du jeu

#### Optimisations techniques
- [ ] **Performance animations** : Optimiser rendu des bourses
  - [ ] Utiliser requestAnimationFrame
  - [ ] Limiter nombre de bourses simultanées
  - [ ] Cleanup automatique des animations
  - [ ] Tests de performance mobile

- [ ] **Sauvegarde étendue** : Persistance nouvelles fonctionnalités
  - [ ] Sauvegarder état XP farming
  - [ ] Historique des bourses capturées
  - [ ] Paramètres utilisateur personnalisés
  - [ ] Migration données anciennes sauvegardes

### 🔴 COMPLEXITÉ ÉLEVÉE

#### Système de monétisation
- [ ] **Publicités pour bourses** : 1 bourse sur 2 demande une pub
  - [ ] Intégration SDK publicitaire (Google AdMob)
  - [ ] Logique alternance bourse gratuite/payante
  - [ ] Interface de choix "Regarder pub" ou "Passer"
  - [ ] Gestion erreurs si pub indisponible
  - [ ] Respect RGPD et consentement utilisateur

- [ ] **Système de récompenses pub** : Bonus après visionnage
  - [ ] Multiplicateur de richesse post-pub
  - [ ] Bonus temporaires exclusifs
  - [ ] Tracking des pubs regardées
  - [ ] Limites quotidiennes de pubs

#### Infrastructure base de données
- [ ] **Configuration Supabase** : Base de données auto-hébergée
  - [ ] Setup instance Supabase
  - [ ] Configuration tables de base
  - [ ] Authentification utilisateurs
  - [ ] Sécurité Row Level Security (RLS)

- [ ] **Synchronisation temps réel** : Real-time pour toutes les données
  - [ ] Profils utilisateurs synchronisés
  - [ ] États de jeu en temps réel
  - [ ] Notifications push entre joueurs
  - [ ] Gestion conflits de données

#### Système de classements multi-niveaux
- [ ] **Classements hiérarchiques** : Régional → National → Continental → International
  - [ ] Géolocalisation automatique des joueurs
  - [ ] Tables de classement par niveau géographique
  - [ ] Interface navigation entre classements
  - [ ] Calcul positions en temps réel
  - [ ] Récompenses spéciales par niveau

- [ ] **Infrastructure classements** : Backend pour millions d'utilisateurs
  - [ ] Optimisation requêtes pour gros volumes
  - [ ] Cache Redis pour classements fréquents
  - [ ] API endpoints performants
  - [ ] Monitoring et alertes système

#### Système de guildes communautaires
- [ ] **Création et gestion guildes** : Infrastructure complète
  - [ ] Coût création et maintenance guildes
  - [ ] Système grades et permissions
  - [ ] Interface administration guilde
  - [ ] Invitation et acceptation membres

- [ ] **Richesse communautaire** : Pool ressources partagées
  - [ ] Contributions individuelles trackées
  - [ ] Projets collaboratifs de guilde
  - [ ] Système de dons entre membres
  - [ ] Objectifs collectifs long terme

- [ ] **Fonctionnalités sociales** : Interaction entre membres
  - [ ] Chat guilde intégré temps réel
  - [ ] Événements collaboratifs
  - [ ] Classements inter-guildes
  - [ ] Défis de groupe avec récompenses partagées

#### Monitoring et maintenance
- [ ] **Backup automatique** : Sauvegarde régulière toutes données
  - [ ] Stratégie backup incrémental
  - [ ] Tests restauration réguliers
  - [ ] Archivage données anciennes
  - [ ] Plan de récupération après sinistre

- [ ] **Monitoring complet** : Surveillance performances et erreurs
  - [ ] Métriques temps réel application
  - [ ] Alertes automatiques problèmes critiques
  - [ ] Logs centralisés et analysés
  - [ ] Dashboard admin pour supervision

---

*Documentation mise à jour - Projet Next.js avec système de sauvegarde intelligent*