export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    releaseDate: string;
    genres?: string[];
    badge?: string; // "Nouveau", "Coup de Cœur", etc.
    // Nouvelles propriétés pour la page détail film
    director?: string;
    duration?: string; // ex: "3h17"
    ageRating?: string; // ex: "Tous publics", "12+", etc.
    description?: string;
    logoUrl?: string; // Logo du film si disponible
    trailerUrl?: string;
    rating?: number; // Note sur 10
    ratingCount?: number; // Nombre de votes
    cast?: string[]; // Acteurs principaux
    warning?: string; // Avertissement âge/contenu
}

export interface MovieSession {
    id: string;
    movieId: string;
    cinemaId: string;
    datetime: string; // ISO string
    price: number;
    technology?: 'IMAX' | '4DX' | 'Dolby' | 'ScreenX' | 'Standard';
    language: 'VF' | 'VOST' | 'VO';
    availableSeats: number;
    totalSeats: number;
}

export interface MovieWithSessions extends Movie {
    sessions: MovieSession[];
}
