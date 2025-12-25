import { Movie } from "@/src/domain/Movie";


export interface MovieRepository
{
    getUpcomingMovies(cinemaId: number | undefined) : Promise<Movie[]>;
    getWeeklyMovies(cinemaId: number | undefined) : Promise<Movie[]>;
}