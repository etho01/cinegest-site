import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { ListCinema } from "../molecules/ListCinema";
import { Header } from "../organisms/Header";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";


export default async function HomeTemplate() {
    const cinemas = await getCinemas(CinemaRepositoryImpl);

    return (
        <>
            <Header page="home" />
            <ListCinema cinemas={cinemas} />
        </>
    );
}
