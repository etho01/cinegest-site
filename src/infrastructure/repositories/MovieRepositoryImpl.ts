import { MovieRepository } from "@/src/application/repositories/MovieRepository";
import { Movie } from "@/src/domain/Movie";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const MovieRepositoryImpl : MovieRepository = {
    getUpcomingMovies : async(cinemaId: number | undefined): Promise<Movie[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/movie/upcoming`, {cinemaId}, {});
        console.log(resp);
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
}