import { cookies } from 'next/headers';

const CINEMA_COOKIE_NAME = 'selected_cinema_id';

/**
 * Récupère l'ID du cinéma sélectionné depuis les cookies côté serveur
 * @returns L'ID du cinéma ou undefined si aucun cinéma n'est sélectionné
 */
export async function getSelectedCinemaId(): Promise<number | undefined> {
    const cookieStore = await cookies();
    const cinemaCookie = cookieStore.get(CINEMA_COOKIE_NAME);
    
    if (!cinemaCookie?.value) {
        return undefined;
    }
    
    const cinemaId = parseInt(cinemaCookie.value, 10);
    return isNaN(cinemaId) ? undefined : cinemaId;
}
