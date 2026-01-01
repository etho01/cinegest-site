# Système de Sélection de Cinéma

## Description
Ce système permet aux utilisateurs de sélectionner un cinéma préféré, qui sera stocké dans un cookie et utilisé pour filtrer les films et séances affichés.

## Architecture

### 1. Context React (`CinemaContext.tsx`)
- **Localisation** : `/src/context/CinemaContext.tsx`
- **Rôle** : Gère l'état du cinéma sélectionné côté client
- **Fonctionnalités** :
  - Stockage et récupération du cinéma sélectionné via cookies
  - Hook `useCinema()` pour accéder au cinéma sélectionné dans les composants client
  - Cookie nommé `selected_cinema_id` avec une expiration de 30 jours

### 2. Helper Serveur (`cinema-cookie.ts`)
- **Localisation** : `/src/lib/cinema-cookie.ts`
- **Rôle** : Récupère le cinéma sélectionné depuis les cookies côté serveur
- **Fonction** : `getSelectedCinemaId()` - retourne l'ID du cinéma ou `undefined`

### 3. Composant de Sélection (`ListCinema.tsx`)
- **Localisation** : `/src/components/molecules/ListCinema.tsx`
- **Modifications** :
  - Utilise le hook `useCinema()` pour gérer la sélection
  - Rafraîchit la page avec `router.refresh()` après changement
  - Affiche la valeur sélectionnée actuelle
  - Permet de réinitialiser la sélection (isClearable)

### 4. Layout Principal (`layout.tsx`)
- **Localisation** : `/app/layout.tsx`
- **Modification** : Enveloppe l'application avec `<CinemaProvider>`

## Flux de Données

### Sélection d'un Cinéma
1. L'utilisateur sélectionne un cinéma dans `ListCinema`
2. Le composant appelle `setSelectedCinemaId(cinemaId)`
3. Le cookie `selected_cinema_id` est mis à jour
4. La page est rafraîchie (`router.refresh()`)
5. Les composants serveur récupèrent le nouveau cinéma via `getSelectedCinemaId()`
6. Les données filtrées sont affichées

### Pages Impactées

#### Page d'Accueil (`HomeTemplate.tsx`)
- Récupère le cinéma sélectionné via `getSelectedCinemaId()`
- Filtre les **films à l'affiche** selon le cinéma
- Filtre les **prochaines sorties** selon le cinéma

#### Page de Film (`films/[filmId]/page.tsx`)
- Récupère le cinéma sélectionné via `getSelectedCinemaId()`
- Filtre les **séances du film** selon le cinéma sélectionné
- Si aucun cinéma n'est sélectionné, affiche toutes les séances

## API Backend
Les appels API ont été modifiés pour inclure le paramètre `cinemaId` :
- `getWeeklyMovies(repo, cinemaId)` - Films de la semaine
- `getUpcomingMovies(repo, cinemaId)` - Films à venir
- `getMovieWithSessions(repo, movieId, cinemaIds)` - Séances d'un film

Le backend gère le filtrage en fonction du `cinemaId` fourni.

## Utilisation

### Dans un Composant Client
```tsx
import { useCinema } from '@/src/context/CinemaContext';

function MyComponent() {
  const { selectedCinemaId, setSelectedCinemaId } = useCinema();
  
  // Utiliser selectedCinemaId...
}
```

### Dans un Composant Serveur
```tsx
import { getSelectedCinemaId } from '@/src/lib/cinema-cookie';

async function MyServerComponent() {
  const cinemaId = await getSelectedCinemaId();
  
  // Utiliser cinemaId pour filtrer les données...
}
```

## Persistance
- **Cookie** : `selected_cinema_id`
- **Durée** : 30 jours
- **Scope** : Tout le site (path: `/`)
- **SameSite** : `Lax` (sécurité CSRF)
