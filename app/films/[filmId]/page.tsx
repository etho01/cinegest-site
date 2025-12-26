import { Header } from '@/src/components/organisms/Header';
import { MovieDetailTemplate } from '@/src/components/templates/MovieDetailTemplate';
import { MovieWithSessions } from '@/src/domain/Movie';
import { Cinema } from '@/src/domain/Cinema';
import { getMovieWithSessions } from '@/src/application/useCases/movie/getMovieWithSessions';
import { MovieRepositoryImpl } from '@/src/infrastructure/repositories/MovieRepositoryImpl';
import { CinemaRepositoryImpl } from '@/src/infrastructure/repositories/CinemaRepositoryImpl';
import { getCinemas } from '@/src/application/useCases/Cinema/getCinemas';

interface MovieDetailPageProps {
    params: {
        filmId: string;
    };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {

    try {
        const { filmId } = await params;
        const movie = await getMovieWithSessions(MovieRepositoryImpl, filmId, []);
        const cinemas = await getCinemas(CinemaRepositoryImpl);

        return (
            <div className="min-h-screen">
                <MovieDetailTemplate movie={movie} cinemas={cinemas} />
            </div>
        );
    }
    catch (error) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Film non trouvé</h1>
                    <p className="text-white">Le film que vous recherchez n'existe pas.</p>
                </div>
            </div>
        );
    }
}