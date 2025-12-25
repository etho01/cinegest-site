import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { ListCinema } from "../molecules/ListCinema";
import { Header } from "../organisms/Header";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { MovieSwiper } from "../organisms/MovieSwiper";
import { Movie } from "@/src/domain/Movie";
import { getWeeklyMovies } from "@/src/application/useCases/movie/getWeeklyMovies";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/MovieRepositoryImpl";
import { getUpcomingMovies } from "@/src/application/useCases/movie/getUpcomingMovies";

// Données de démonstration - À remplacer par de vraies données d'API
const upcomingMovies: Movie[] = [
    {
        id: "1",
        title: "Avatar : de feu et de cendres",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00001189/poster/md/19/movie&uuid=B26F57C5-9286-4479-A610-2B07C66A4B24",
        releaseDate: "18 déc. 2024",
        genres: ["Science-Fiction", "Action"],
        badge: "Nouveau"
    },
    {
        id: "2",
        title: "Zootopie 2",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00007887/poster/md/19/1732108862.jpg",
        releaseDate: "25 nov. 2026",
        genres: ["Animation", "Aventure"],
        badge: "Coup de Cœur"
    },
    {
        id: "3",
        title: "L'âme idéale",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00008661/poster/md/11/1733821619.jpg",
        releaseDate: "25 déc. 2024",
        genres: ["Drame", "Romance"]
    },
    {
        id: "4",
        title: "Wicked : Partie II",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00006233/poster/md/7/1729244413.jpg",
        releaseDate: "26 nov. 2025",
        genres: ["Fantastique", "Comédie musicale"]
    },
    {
        id: "5",
        title: "Five Nights at Freddy's 2",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00008009/poster/md/35/1731509227.jpg",
        releaseDate: "5 déc. 2025",
        genres: ["Horreur", "Thriller"],
        badge: "Nouveau"
    },
    {
        id: "6",
        title: "Running Man",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00007929/poster/md/6/1733221627.jpg",
        releaseDate: "1er janv. 2025",
        genres: ["Action", "Thriller"]
    },
    {
        id: "7",
        title: "Insaisissables 3",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00007875/poster/md/38/1732108862.jpg",
        releaseDate: "14 nov. 2025",
        genres: ["Action", "Thriller"]
    },
    {
        id: "8",
        title: "Bob l'éponge : Un pour tous, tous pirates !",
        posterUrl: "https://media.pathe.fr/movie/alex/HO00007865/poster/md/25/1732108862.jpg",
        releaseDate: "8 janv. 2025",
        genres: ["Animation", "Comédie"]
    }
];

export default async function HomeTemplate() {
    const cinemas = await getCinemas(CinemaRepositoryImpl);
    const weeklyMovies = await getWeeklyMovies(MovieRepositoryImpl, undefined);
    const upcomingMovies = await getUpcomingMovies(MovieRepositoryImpl, undefined);
    console.log(weeklyMovies);

    return (
        <>
            <Header page="home" />
            <ListCinema cinemas={cinemas} />
            <MovieSwiper title="Films à l'affiche" movies={weeklyMovies} />
            <MovieSwiper title="Prochaines sorties au cinéma" movies={upcomingMovies} />
        </>
    );
}
