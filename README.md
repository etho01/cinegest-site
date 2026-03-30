# 🎬 CineGest - Plateforme de Réservation de Billets de Cinéma

> Application web moderne de gestion et réservation de places de cinéma, développée avec Next.js 16 et une architecture Clean Architecture.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 À Propos du Projet

**CineGest** est une application full-stack de réservation de billets de cinéma conçue pour offrir une expérience utilisateur fluide et intuitive. Le projet met l'accent sur une architecture propre, maintenable et évolutive, en appliquant les principes du Domain-Driven Design (DDD) et de la Clean Architecture.

### ✨ Fonctionnalités Principales

- 🎥 **Catalogue de Films** : Consultation des films à l'affiche avec détails complets
- 🏢 **Sélection de Cinéma** : Choix du cinéma de préférence avec persistance de la sélection
- 📅 **Réservation de Séances** : Sélection de dates et horaires de projection
- 🎫 **Gestion des Billets** : Différents types de tarifs (adulte, enfant, étudiant, etc.)
- 💳 **Paiement Sécurisé** : Intégration complète de Stripe Payment
- 👤 **Gestion de Compte** : Authentification, profil utilisateur, historique des réservations
- 🔒 **Réinitialisation de Mot de Passe** : Système sécurisé de récupération de compte

### 🎯 Objectifs Techniques

Ce projet a été développé pour démontrer :
- La maîtrise de **Next.js 16** avec le nouveau App Router (Server Components, Server Actions)
- L'application rigoureuse des **principes SOLID** et de la **Clean Architecture**
- L'implémentation d'un **design system** avec Atomic Design
- L'intégration de **services tiers** (Stripe, APIs externes)
- La gestion d'un **état complexe** et de flux utilisateur multi-étapes

---

## 🛠️ Stack Technique

### Frontend
- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS 4
- **UI Components** : Atomic Design Pattern
- **Gestion d'État** : React Context API
- **Carousel** : Swiper.js

### Backend / Intégrations
- **API Client** : Fetch API avec abstraction personnalisée
- **Paiement** : Stripe API (react-stripe-js)
- **Server Actions** : next-safe-action
- **Validation** : Zod (avec i18n)

### Architecture & Patterns
- **Clean Architecture** : Séparation en couches Domain/Application/Infrastructure
- **Domain-Driven Design** : Entités métier, Use Cases, Repositories
- **Atomic Design** : Composants Atoms → Molecules → Organisms → Templates
- **Repository Pattern** : Abstraction de la couche de données

---

## 🏗️ Architecture du Projet

### Vue d'Ensemble de l'Architecture

L'application suit une architecture en couches stricte, garantissant la séparation des préoccupations et la testabilité :

```
┌─────────────────────────────────────────────────────────┐
│              UI Layer (Presentation)                     │
│     app/ (Routes) + components/ (React Components)      │
│     - Server Components & Client Components              │
│     - Atomic Design Pattern (atoms/molecules/...)        │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│           Controllers Layer                              │
│     controller/app/ (Entry Points)                       │
│     - Server Actions                                     │
│     - Orchestration des Use Cases                        │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│         Application Layer (Business Logic)               │
│     application/useCases/ + application/repositories/    │
│     - Cas d'utilisation métier                          │
│     - Interfaces des repositories                        │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│            Domain Layer (Core)                           │
│     domain/ (Entities & Types)                          │
│     - Entités métier pures                              │
│     - Règles de gestion                                 │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│        Infrastructure Layer                              │
│     infrastructure/repositories/ + lib/                  │
│     - Implémentations concrètes                         │
│     - Appels API, Services externes                     │
└─────────────────────────────────────────────────────────┘
```

### Structure des Dossiers

```
site-cinema/
├── app/                          # Next.js App Router (Routes & Pages)
│   ├── page.tsx                  # Page d'accueil
│   ├── layout.tsx                # Layout principal
│   ├── booking/                  # Routes de réservation
│   ├── cinema/                   # Sélection de cinéma
│   ├── films/                    # Détails des films
│   ├── prix/                     # Grille tarifaire
│   ├── profile/                  # Profil utilisateur
│   └── reservations/             # Historique des réservations
│
├── src/
│   ├── domain/                   # 🔵 Couche Domain (Entités Métier)
│   │   ├── Booking.ts            # Entité Réservation
│   │   ├── Cinema.ts             # Entité Cinéma
│   │   ├── Movie.ts              # Entité Film
│   │   ├── Price.ts              # Entité Prix
│   │   └── User.ts               # Entité Utilisateur
│   │
│   ├── application/              # 🟢 Couche Application (Logique Métier)
│   │   ├── useCases/             # Cas d'utilisation
│   │   │   ├── Booking/          # Gestion des réservations
│   │   │   ├── Cinema/           # Gestion des cinémas
│   │   │   ├── movie/            # Gestion des films
│   │   │   ├── price/            # Gestion des tarifs
│   │   │   └── User/             # Gestion des utilisateurs
│   │   │
│   │   └── repositories/         # Interfaces des repositories
│   │       ├── BookingRepository.ts
│   │       ├── CinemaRepository.ts
│   │       ├── MovieRepository.ts
│   │       ├── PriceRepository.ts
│   │       └── UserRepository.ts
│   │
│   ├── infrastructure/           # 🟡 Couche Infrastructure
│   │   └── repositories/         # Implémentations concrètes
│   │       ├── BookingRepositoryImpl.ts
│   │       ├── CinemaRepositoryImpl.ts
│   │       ├── MovieRepositoryImpl.ts
│   │       ├── PriceRepositoryImpl.ts
│   │       └── UserRepositoryImpl.ts
│   │
│   ├── controller/               # 🔴 Contrôleurs (Points d'Entrée)
│   │   └── app/
│   │       ├── AuthController.ts      # Authentification
│   │       ├── BookingController.ts   # Réservations
│   │       └── UserController.ts      # Utilisateurs
│   │
│   ├── components/               # Composants React (Atomic Design)
│   │   ├── atoms/                # Composants de base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Calendar.tsx
│   │   │   └── ...
│   │   ├── molecules/            # Composition de composants
│   │   │   ├── LoginForm.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   └── ...
│   │   ├── organisms/            # Sections complexes
│   │   │   ├── Header.tsx
│   │   │   └── MovieSwiper.tsx
│   │   └── templates/            # Layouts de pages
│   │       ├── HomeTemplate.tsx
│   │       ├── MovieDetailTemplate.tsx
│   │       └── ...
│   │
│   ├── context/                  # Contextes React
│   │   └── CinemaContext.tsx     # Gestion du cinéma sélectionné
│   │
│   └── lib/                      # Utilitaires & Configuration
│       ├── stripe.ts             # Configuration Stripe
│       ├── safe-action-client.ts # Server Actions sécurisées
│       ├── cinema-cookie.ts      # Gestion des cookies
│       └── request/              # Client API personnalisé
│
└── public/                       # Assets statiques
    └── assets/images/
```

---

## 🔑 Points Forts & Décisions Techniques

### Principes Architecturaux Appliqués

#### ✅ **Clean Architecture & SOLID**
- **Inversion de Dépendances** : Les couches internes ne dépendent jamais des couches externes
- **Single Responsibility** : Chaque module a une responsabilité unique et bien définie
- **Interface Segregation** : Repositories définis par des interfaces, facilitant le testing et l'évolution
- **Séparation des Préoccupations** : Domain, Application, Infrastructure strictement isolés

#### 🔒 **Sécurité**
- **Validation Stripe côté Backend** : Le montant total est systématiquement recalculé côté serveur pour empêcher toute manipulation frauduleuse
- **Never Trust the Client** : Principe appliqué rigoureusement pour les opérations financières
- **Server Actions sécurisées** : Utilisation de `next-safe-action` avec validation Zod pour tous les inputs utilisateur
- **Cookies HttpOnly** : Les informations sensibles (tokens d'authentification) sont protégées avec les mécanismes Next.js

#### 🎨 **Atomic Design Pattern**
- **Réutilisabilité maximale** : Composants granulaires et modulables
- **Maintenabilité** : Hiérarchie claire (atoms → molecules → organisms → templates)
- **Cohérence UI** : Design system unifié sur toute l'application
- **Testabilité** : Composants isolés et facilement testables

#### ⚡ **Performance & UX**
- **Server Components** : Réduction du JavaScript côté client avec le nouveau App Router de Next.js
- **Optimisation des requêtes** : Gestion intelligente du cache et des états
- **Sélection de cinéma persistante** : Cookies pour une expérience utilisateur fluide
- **Progressive Enhancement** : L'application fonctionne même si JavaScript est désactivé (pour les pages critiques)

#### 🏗️ **Évolutivité & Maintenabilité**
- **Use Cases comme abstraction** : Permet l'évolution vers des architectures plus complexes (Event Sourcing, CQRS, Event Brokers)
- **Repository Pattern** : Changement facile de source de données (API REST → GraphQL → Database directe)
- **Couplage faible** : Chaque couche peut évoluer indépendamment
- **TypeScript strict** : Typage fort pour éviter les régressions

---

## 💡 Compétences Mises en Œuvre

### Frontend
- Maîtrise de **Next.js 16** avec App Router (Server Components, Server Actions, Route Handlers)
- **TypeScript avancé** : types génériques, interfaces, type guards
- **Tailwind CSS 4** : design responsive et moderne
- **React Context API** : gestion d'état globale
- **Formulaires complexes** : validation, gestion d'erreurs, feedback utilisateur
- **Stripe Integration** : Paiements sécurisés avec `react-stripe-js`

### Backend / Architecture
- **Clean Architecture** : séparation en couches Domain/Application/Infrastructure
- **Domain-Driven Design** : modélisation métier avec Use Cases et Entities
- **Repository Pattern** : abstraction de la persistance des données
- **SOLID Principles** : code maintenable et évolutif
- **API Integration** : consommation d'API REST externe

### DevOps & Tooling
- **Git** : versioning et bonnes pratiques de commit
- **NPM/Yarn** : gestion de dépendances
- **ESLint** : qualité de code
- **Environnements** : configuration multi-environnement (dev/staging/prod)

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js 20+ 
- npm/yarn/pnpm
- Compte Stripe (clés API pour les paiements)

### Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd site-cinema

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API
```

### Variables d'Environnement

```env
# API Backend
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# URLs
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Lancement

```bash
# Mode développement
npm run dev
# Ouvrir http://localhost:3000

# Build production
npm run build
npm start

# Linting
npm run lint
```

---

## 🎓 Réflexions & Évolutions Futures

### Améliorations Possibles

#### Court Terme
- [ ] Tests unitaires et d'intégration (Jest, React Testing Library)
- [ ] Validation Zod des réponses API pour une robustesse accrue
- [ ] Storybook pour la documentation des composants
- [ ] Gestion d'erreurs centralisée avec Error Boundaries
- [ ] Optimisation des images avec next/image
- [ ] Analytics et tracking utilisateur

#### Long Terme
- [ ] PWA : mode offline et notifications push
- [ ] Internationalisation (i18n) multi-langues
- [ ] Migration vers un système de cache avancé (Redis)
- [ ] Implémentation de Event Sourcing pour l'historique des réservations
- [ ] Microservices : extraction du domaine Booking en service indépendant
- [ ] GraphQL pour l'API (Apollo Server/Client)
- [ ] CI/CD : GitHub Actions pour les déploiements automatisés

---

## 📞 Contact

**Nicolas** - Développeur Full-Stack JavaScript/TypeScript

Ce projet démontre ma maîtrise de :
- Architectures logicielles modernes et évolutives
- Next.js et l'écosystème React
- Principes de qualité logicielle (SOLID, Clean Architecture)
- Intégrations de services tiers (Stripe, APIs)
- Développement d'applications web complexes et professionnelles

---

## 📄 Licence

Ce projet est un projet personnel à des fins de démonstration de compétences techniques.

---

## � Conventions de Code

Le projet suit des conventions strictes pour assurer la qualité et la maintenabilité du code :

### TypeScript
- ✅ Types explicites pour toutes les interfaces publiques
- ✅ Pas de `any` sauf cas exceptionnel documenté
- ✅ Préférer `interface` pour les objets, `type` pour les unions
- ✅ Typage strict activé dans `tsconfig.json`

### Naming Conventions
- **Composants React** : PascalCase (`BookingCard.tsx`, `MovieHero.tsx`)
- **Fichiers utilitaires** : kebab-case (`cinema-cookie.ts`, `safe-action-client.ts`)
- **Interfaces & Types** : PascalCase sans préfixe `I` (`Movie`, `Cinema`, `Booking`)
- **Repositories** : Implémentations suffixées par `Impl` (`MovieRepositoryImpl`)
- **Use Cases** : camelCase descriptif (`confirmBooking`, `getCinemas`)

### Architecture & Organisation
- ✅ Un fichier = une responsabilité unique
- ✅ Pas de logique métier dans les composants UI
- ✅ Controllers = point d'entrée unique pour les Server Actions
- ✅ Composants organisés selon Atomic Design (atoms/molecules/organisms/templates)
- ✅ Dépendances vers les couches internes uniquement (Clean Architecture)

### Git & Versioning
- Commits sémantiques : `feat:`, `fix:`, `refactor:`, `docs:`
- Branches descriptives : `feature/nom-fonctionnalité`, `bugfix/description-bug`

---

<div align="center">

**⭐ Ce projet a été développé avec soin pour démontrer une maîtrise complète du développement web moderne ⭐**

*Merci de votre intérêt pour mon travail !*

</div>
