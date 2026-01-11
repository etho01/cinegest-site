import { Header } from "@/src/components/organisms/Header";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { CinemaSelectionTemplate } from "@/src/components/templates/CinemaSelectionTemplate";

export default async function CinemaPage() {
    const cinemas = await getCinemas(CinemaRepositoryImpl);

    return (
        <>
            <Header page="cinema" />
            <CinemaSelectionTemplate cinemas={cinemas} />
        </>
    );
}
