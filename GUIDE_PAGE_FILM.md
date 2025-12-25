# Guide d'utilisation - Page Film

## Accès à la page

La page détail d'un film est accessible via l'URL :
```
http://localhost:3000/films/[filmId]
```

## Exemples d'URL

Pour tester la page avec les données de démonstration :
- http://localhost:3000/films/1 - Avatar : de feu et de cendres

## Navigation depuis la page d'accueil

1. Ouvrez http://localhost:3000
2. Cliquez sur n'importe quelle carte de film
3. Vous serez redirigé vers la page détail du film

## Fonctionnalités disponibles

### Affichage des informations du film
- Poster avec effet de fond flou
- Logo du film (si disponible)
- Titre, durée, genres
- Réalisateur et acteurs principaux
- Note et nombre de votes
- Avertissement de contenu
- Classification d'âge

### Sélection de la date
- Utilisez le carrousel horizontal pour choisir parmi les 14 prochains jours
- La date du jour est marquée "Aujourd'hui"
- Le lendemain est marqué "Demain"
- Les autres jours affichent le jour de la semaine et la date

### Consultation des séances
- Les séances sont regroupées par cinéma
- Chaque séance affiche :
  - L'horaire
  - La langue (VF, VOST, VO)
  - Le nombre de places disponibles
  - Le prix
- Les séances sont filtrées selon la date sélectionnée
- Les technologies spéciales (IMAX, 4DX, Dolby) sont mises en évidence avec des badges colorés

### Choix du cinéma
- Liste complète des cinémas disponibles
- Regroupement par ville
- Clic sur un cinéma pour scroller vers ses séances

### FAQ
- Section accordéon avec questions fréquentes
- Cliquez sur une question pour afficher/masquer la réponse

## Structure des données de test

Les données actuelles sont mockées dans le fichier :
```
app/films/[filmId]/page.tsx
```

Pour ajouter de vraies données :
1. Créer un service API pour récupérer les films et séances
2. Remplacer `mockMovie` et `mockCinemas` par des appels API
3. Gérer le chargement et les erreurs

## Personnalisation

### Modifier les couleurs
Les couleurs principales sont dans Tailwind CSS :
- Rouge principal : `bg-red-600`, `text-red-600`
- Gris de fond : `bg-gray-50`

### Ajouter plus de séances
Modifiez le tableau `sessions` dans `mockMovie` :
```typescript
sessions: [
  {
    id: "s1",
    movieId: "1",
    cinemaId: "1",
    datetime: "2025-12-25T14:30:00",
    price: 12.50,
    technology: "IMAX",
    language: "VF",
    availableSeats: 45,
    totalSeats: 200
  },
  // Ajoutez plus de séances ici
]
```

### Ajouter plus de cinémas
Modifiez le tableau `mockCinemas` :
```typescript
const mockCinemas: Cinema[] = [
  {
    id: 1,
    name: "Nom du cinéma",
    address: "Adresse",
    postal_code: "Code postal",
    city: "Ville",
    country: "France"
  },
  // Ajoutez plus de cinémas ici
];
```

## Technologies utilisées

### Composants
- **MovieHero** : Section principale avec détails du film
- **DateSelector** : Sélecteur de date horizontal
- **CinemaSessions** : Affichage des séances par cinéma
- **CinemaList** : Liste des cinémas disponibles
- **FAQ** : Section questions-réponses

### Hooks React
- `useState` : Gestion de l'état local (date sélectionnée, données)
- `useEffect` : Chargement des données au montage du composant

### Next.js
- Routes dynamiques avec `[filmId]`
- `'use client'` pour les composants interactifs
- Composant `Link` pour la navigation
- Composant `Image` pour l'optimisation des images

## Prochaines étapes

Pour faire évoluer la page :
1. Intégrer une vraie API de films/séances
2. Ajouter un système de réservation
3. Implémenter la fonctionnalité "Ma liste"
4. Ajouter un système de notation
5. Intégrer la géolocalisation pour trier les cinémas
6. Afficher la bande-annonce du film
7. Ajouter le partage sur réseaux sociaux
