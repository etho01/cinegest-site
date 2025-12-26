import { MovieWithSessions } from "@/src/domain/Movie";
import { MovieRepository } from "../../repositories/MovieRepository";


export const getMovieWithSessions = async (repo: MovieRepository, movieId: string, cinemaIds: string[]) : Promise<MovieWithSessions> => {
    return await repo.getMovieWithSessions(movieId, cinemaIds);
}