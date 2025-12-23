export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    releaseDate: string;
    genres?: string[];
    badge?: string; // "Nouveau", "Coup de Cœur", etc.
}
