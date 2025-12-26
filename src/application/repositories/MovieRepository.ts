import { Movie, MovieWithSessions } from "@/src/domain/Movie";


export interface MovieRepository
{
    getUpcomingMovies(cinemaId: number | undefined) : Promise<Movie[]>;
    getWeeklyMovies(cinemaId: number | undefined) : Promise<Movie[]>;
    getMovieWithSessions(movieId: string, cinemaIds: string[]) : Promise<MovieWithSessions>;
}