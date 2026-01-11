# Architecture du Site Cinéma

## 📋 Vue d'ensemble

Application Next.js 16 de réservation de billets de cinéma, construite avec une architecture Clean Architecture inspirée du Domain-Driven Design (DDD).

**Stack Technique** :
- **Framework** : Next.js 16 (App Router)
- **Language** : TypeScript 5
- **Styling** : Tailwind CSS 4
- **Paiement** : Stripe
- **Architecture** : Clean Architecture / DDD

---

## 🏗️ Structure de l'Architecture

### Principes Architecturaux

L'application suit les principes de la **Clean Architecture** avec une séparation claire des responsabilités en couches :

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer (React)                      │
│         app/, components/, context/                      │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              Application Layer                           │
│         controllers/, useCases/                          │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│               Domain Layer                               │
│         Entities, Interfaces (domain/)                   │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│           Infrastructure Layer                           │
│    repositories/, lib/, API calls                        │
└─────────────────────────────────────────────────────────┘
```

### Organisation des Dossiers

```
src/
├── domain/                    # Couche Domain - Entités et interfaces
│   ├── Booking.ts            # Entité Réservation
│   ├── Cinema.ts             # Entité Cinéma
│   ├── Movie.ts              # Entité Film + Séances
│   ├── Price.ts              # Entité Prix
│   └── User.ts               # Entité Utilisateur
│
├── application/              # Couche Application - Logique métier
│   ├── repositories/         # Interfaces des repositories
│   │   ├── BookingRepository.ts
│   │   ├── CinemaRepository.ts
│   │   ├── MovieRepository.ts
│   │   ├── PriceRepository.ts
│   │   └── UserRepository.ts
│   │
│   └── useCases/            # Cas d'utilisation métier
│       ├── Booking/
│       ├── Cinema/
│       ├── movie/
│       ├── price/
│       └── User/
│
├── infrastructure/          # Couche Infrastructure - Implémentations
│   └── repositories/
│       ├── BookingRepositoryImpl.ts
│       ├── CinemaRepositoryImpl.ts
│       ├── MovieRepositoryImpl.ts
│       ├── PriceRepositoryImpl.ts
│       └── UserRepositoryImpl.ts
│
├── controller/              # Contrôleurs - Point d'entrée
│   └── app/
│       ├── AuthController.ts
│       ├── BookingController.ts
│       └── UserController.ts
│
├── components/              # Composants React (Atomic Design)
│   ├── atoms/              # Composants atomiques
│   ├── molecules/          # Composants moléculaires
│   ├── organisms/          # Composants organismes
│   └── templates/          # Templates de pages
│
├── context/                # Contextes React
│   └── CinemaContext.tsx   # Gestion du cinéma sélectionné
│
├── lib/                    # Utilitaires et configurations
│   ├── cinema-cookie.ts    # Gestion cookie côté serveur
│   ├── safe-action-client.ts
│   ├── stripe.ts           # Configuration Stripe
│   └── request/            # Gestion des requêtes API
│
└── app/                    # Routes Next.js (App Router)
    ├── page.tsx
    ├── layout.tsx
    ├── films/
    ├── reservations/
    ├── booking/
    └── profile/
```

---

## 🎯 Décisions Architecturales

### 1. **Cookie `selected_cinema_id` : Sécurité Proportionnée**

**Décision** : Le cookie de sélection du cinéma reste **accessible côté client** sans flags `HttpOnly`.

**Justification** :
- ✅ **Donnée non sensible** : Juste un numéro de cinéma (ex: `42`)
- ✅ **Impact sécurité minimal** : Modification frauduleuse → affiche juste un autre cinéma
- ✅ **UX fluide** : Pas besoin de Server Action pour changer de cinéma
- ✅ **Principe de proportionnalité** : Ne pas sur-ingénierer la sécurité d'une préférence UI

Les informations sensible comme le token d'autentification sont dans des coockie server only (utilise l'implementation des coockie de next)
---

### 2. **Validation des Paiements Stripe : Sécurité Critique**

**Décision** : Le montant total est **recalculé côté backend** avant création du PaymentIntent.

**Problème de sécurité** :
```typescript
// ❌ VULNÉRABLE : Le client envoie le total
const result = await createPaymentIntent({
    sessionId: session.id,
    items: tickets,
    totalAmount: 75, // ⚠️ Un attaquant peut modifier à 0.01€
});
```

**Attaque possible** :
```javascript
// Console Chrome DevTools
fetch('/api/payment-intent', {
    body: JSON.stringify({
        items: [{ priceId: 1, quantity: 5 }],
        totalAmount: 0.01 // 🔴 FRAUDE : 5 billets à 1 centime
    })
});
```

**Solution** : Validation côté backend (API externe)
Le prix est verifier au niveau de l'api back.

**Principe** : **Never trust the client** pour les données financières.

---

### 3. **Absence de Validation Zod sur les Réponses API**

**État actuel** : Les réponses API ne sont PAS validées.

```typescript
// infrastructure/repositories/MovieRepositoryImpl.ts
const body = JSON.parse(text);
return body as Movie[]; // ⚠️ Confiance aveugle
```

**Risques identifiés** :
1. **Changement API** : Backend modifie un champ → crash frontend
2. **Type incorrect** : `id: "123"` au lieu de `number` → bugs subtils
3. **Champ manquant** : `title: null` → crash runtime
4. **Debugging difficile** : Erreurs obscures loin de la source

**Statut** : 
Je sais que c'est mieux de verifier les erreurs mais etant donnée que j'ai la main sur l'api back je trouve que ce n'est pas neccesaire car cela ralentis les requette ce qui peux nuire a l'experance utilisateur.

---

### 4. **Use Cases : Couche d'Abstraction Simpliste**

**État actuel** : Les Use Cases sont de simples délégations.

Je suis bien conscient que les Use Cases sont de simple délégation. J'ai fait des uses case mais je trouve cela plus propre et evolutif. En effet nous pouvons imaginer une v2 ou certaines données sont stockés en local et mis a jours via des events broker. Dans ce cas la avoirs des use cases deja fait permet de ne pas modifier d'autres parti du projet.

---

## 📊 Points Forts de l'Architecture

### ✅ Ce qui Fonctionne Bien

1. **Séparation des Préoccupations**
   - Domaine, Application, Infrastructure bien séparés
   - Facile de changer l'implémentation d'un repository

2. **Typage TypeScript Strict**
   - Types cohérents (`number` pour les IDs)
   - Interfaces claires et bien définies

3. **Atomic Design pour les Composants**
   - Réutilisabilité maximale
   - Hiérarchie claire : atoms → molecules → organisms → templates

4. **Server Actions Next.js**
   - Sécurité intégrée avec `actionClient`
   - Validation Zod sur les inputs utilisateur

5. **Gestion d'État Contextualisée**
   - `CinemaContext` pour la préférence utilisateur
   - Synchronisation client/serveur via cookies

---

## 📚 Ressources et Références

- **Clean Architecture** : [Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- **Atomic Design** : [Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- **Next.js App Router** : [Documentation officielle](https://nextjs.org/docs)
- **Stripe Best Practices** : [Security Guide](https://stripe.com/docs/security)
- **Zod Validation** : [Documentation](https://zod.dev/)

---

## 👥 Conventions de Code

### TypeScript
- Types explicites pour toutes les interfaces publiques
- Pas de `any` sauf cas exceptionnel documenté
- Préférer `interface` pour les objets, `type` pour les unions

### Naming
- **Composants** : PascalCase (`BookingCard.tsx`)
- **Fichiers utilitaires** : kebab-case (`cinema-cookie.ts`)
- **Interfaces** : PascalCase sans préfixe `I` (`Movie`, `Cinema`)
- **Repositories** : Suffix `Impl` pour implémentations (`MovieRepositoryImpl`)

### Architecture
- Un fichier = une responsabilité
- Pas de logique métier dans les composants UI
- Controllers = point d'entrée unique pour les Server Actions

---

**Dernière mise à jour** : 11 janvier 2026  
**Version** : 1.0.0
