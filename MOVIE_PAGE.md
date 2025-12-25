# Page Détail Film - Similar à Pathé

## Description

Cette page affiche les détails d'un film avec ses séances disponibles dans différents cinémas, inspirée de la page film de Pathé.fr.

## Structure de la page

La page `/films/[filmId]` comprend plusieurs sections :

### 1. Hero Section
- Affichage du poster du film avec effet de fond
- Logo ou titre du film
- Informations principales : durée, genres, classification
- Équipe : réalisateur, acteurs principaux
- Note et nombre de votes
- Avertissement de contenu si applicable
- Boutons d'action : ajouter à ma liste, noter

### 2. Sélecteur de Date
- Affichage des 14 prochains jours
- Navigation horizontale avec scroll
- Mise en évidence de la date sélectionnée
- Labels "Aujourd'hui" et "Demain"

### 3. Section Séances
- Liste des cinémas proposant le film
- Séances groupées par technologie (IMAX, 4DX, Dolby, ScreenX, Standard)
- Pour chaque séance :
  - Horaire
  - Langue (VF, VOST, VO)
  - Places disponibles
  - Prix
- Filtrage automatique selon la date sélectionnée

### 4. Liste des Cinémas
- Cinémas regroupés par ville
- Information de localisation complète
- Clic pour scroller vers les séances

### 5. FAQ
- Section accordéon avec questions fréquentes
- Questions sur les réservations, technologies, etc.

## Composants Créés

### Molecules
- **MovieHero** : Section hero avec toutes les infos du film
- **CinemaSessions** : Affichage des séances d'un cinéma
- **CinemaList** : Liste complète des cinémas disponibles
- **FAQ** : Section questions-réponses

### Atoms
- **DateSelector** : Sélecteur de date avec scroll horizontal

### Templates
- **MovieDetailTemplate** : Template complet de la page film

## Modèles de Données

### Movie (étendu)
```typescript
{
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  genres?: string[];
  badge?: string;
  director?: string;
  duration?: string;
  ageRating?: string;
  description?: string;
  logoUrl?: string;
  trailerUrl?: string;
  rating?: number;
  ratingCount?: number;
  cast?: string[];
  warning?: string;
}
```

### MovieSession
```typescript
{
  id: string;
  movieId: string;
  cinemaId: string;
  datetime: string;
  price: number;
  technology?: 'IMAX' | '4DX' | 'Dolby' | 'ScreenX' | 'Standard';
  language: 'VF' | 'VOST' | 'VO';
  availableSeats: number;
  totalSeats: number;
}
```

## Utilisation

### Navigation
Cliquer sur une carte de film depuis la page d'accueil redirige vers `/films/[filmId]`

### Données de Démonstration
Actuellement, la page utilise des données mockées. Pour intégrer de vraies données :

1. Créer un repository pour les films et séances
2. Créer des use cases pour récupérer :
   - Les détails d'un film
   - Les séances d'un film
   - Les cinémas proposant le film
3. Remplacer les données mockées dans la page

## Fonctionnalités à Ajouter

- [ ] Intégration avec une vraie API de films/séances
- [ ] Système de réservation de places
- [ ] Fonctionnalité "Ma liste" et notation
- [ ] Filtres supplémentaires (langue, technologie, horaire)
- [ ] Géolocalisation pour trier les cinémas par proximité
- [ ] Affichage de la bande-annonce
- [ ] Partage sur les réseaux sociaux
- [ ] Mode sombre

## Technologies Utilisées

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks (useState, useEffect)

## Styles

Les styles suivent la charte graphique inspirée de Pathé :
- Couleur principale : Rouge (#DC2626)
- Fond : Gris clair (#F9FAFB)
- Texte : Gris foncé (#111827)
- Composants en blanc avec ombre portée
