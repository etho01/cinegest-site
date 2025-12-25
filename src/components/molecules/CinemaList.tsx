import { Cinema } from '@/src/domain/Cinema';

interface CinemaListProps {
    cinemas: Cinema[];
    onCinemaSelect?: (cinema: Cinema) => void;
}

export function CinemaList({ cinemas, onCinemaSelect }: CinemaListProps) {
    // Grouper les cinémas par ville
    const cinemasByCity = cinemas.reduce((acc, cinema) => {
        if (!acc[cinema.city]) acc[cinema.city] = [];
        acc[cinema.city].push(cinema);
        return acc;
    }, {} as Record<string, Cinema[]>);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trouvez votre cinéma</h2>
            <p className="text-gray-600 mb-6">Choisissez un cinéma proche de chez vous !</p>

            <div className="space-y-6">
                {Object.entries(cinemasByCity).map(([city, cityCinemas]) => (
                    <div key={city} className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {cityCinemas.length > 1 ? `Cinémas à ${city}` : `Cinéma à ${city}`}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cityCinemas.map((cinema) => (
                                <div
                                    key={cinema.id}
                                    className="group border border-gray-200 rounded-lg p-4 hover:border-red-500 hover:bg-red-50 transition cursor-pointer"
                                    onClick={() => onCinemaSelect?.(cinema)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition">
                                            <span className="text-sm group-hover:text-white">🎬</span>
                                        </div>

                                        <div className="grow">
                                            <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition">
                                                {cinema.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {cinema.address}
                                                {cinema.address_complement && `, ${cinema.address_complement}`}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {cinema.postal_code} {cinema.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}