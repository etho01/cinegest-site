import { Movie } from "@/src/domain/Movie";
import { MovieRepository } from "../../repositories/MovieRepository";


export const getUpcomingMovies = async(repo: MovieRepository, cinemaId: number | undefined) : Promise<Movie[]> => {
    return repo.getUpcomingMovies(cinemaId)
}