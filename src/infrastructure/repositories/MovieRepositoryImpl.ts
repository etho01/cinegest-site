import { MovieRepository } from "@/src/application/repositories/MovieRepository";
import { Movie, MovieWithSessions } from "@/src/domain/Movie";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const MovieRepositoryImpl : MovieRepository = {
    getUpcomingMovies : async(cinemaId: number | undefined): Promise<Movie[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/movie/upcoming`, {cinemaId}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Movie[];
    },
    getWeeklyMovies : async(cinemaId: number | undefined): Promise<Movie[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/movie/weekly`, {cinemaId}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Movie[];
    },
    getMovieWithSessions : async(movieId: string, cinemaIds: string[]): Promise<MovieWithSessions> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/movie/${movieId}/sessions`, {cinemaIds: cinemaIds.join(',')}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        let movie = body["movie"];
        movie.sessions = body["sessions"];
        return movie as MovieWithSessions;
    }
}