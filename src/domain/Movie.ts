export interface Movie {
    id: number;
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

export interface Option {
    id: number;
    price: number;
    publicName ?: string;
}


export interface MovieSession {
    id: number;
    movieId: number;
    cinemaId: number;
    startTime: string; // ISO string
    options?: Option[]; // ex: ["Sous-titré", "Audio Description"]
}

export interface MovieWithSessions extends Movie {
    sessions: MovieSession[];
}
