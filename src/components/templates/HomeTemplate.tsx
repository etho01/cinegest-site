import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { ListCinema } from "../molecules/ListCinema";
import { Header } from "../organisms/Header";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { MovieSwiper } from "../organisms/MovieSwiper";
import { getWeeklyMovies } from "@/src/application/useCases/movie/getWeeklyMovies";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/MovieRepositoryImpl";
import { getUpcomingMovies } from "@/src/application/useCases/movie/getUpcomingMovies";
import { getSelectedCinemaId } from "@/src/lib/cinema-cookie";

export default async function HomeTemplate() {
    const selectedCinemaId = await getSelectedCinemaId();
    const cinemas = await getCinemas(CinemaRepositoryImpl);
    const weeklyMovies = await getWeeklyMovies(MovieRepositoryImpl, selectedCinemaId);
    const upcomingMovies = await getUpcomingMovies(MovieRepositoryImpl, selectedCinemaId);

    return (
        <>
            <Header page="home" />
            <ListCinema cinemas={cinemas} />
            <MovieSwiper title="Films à l'affiche" movies={weeklyMovies} />
            <MovieSwiper title="Prochaines sorties au cinéma" movies={upcomingMovies} />
        </>
    );
}
