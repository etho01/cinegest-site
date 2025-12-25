import { Movie } from "@/src/domain/Movie";
import { MovieRepository } from "../../repositories/MovieRepository";


export const getWeeklyMovies = async(repo: MovieRepository, cinemaId: number | undefined) : Promise<Movie[]> => {
    return repo.getWeeklyMovies(cinemaId)
}