import { Cinema } from '@/src/domain/Cinema';
import { MovieSession } from '@/src/domain/Movie';
import { SessionCard } from '../atoms/SessionCard';

interface CinemaSessionsProps {
    cinemas: Cinema[];
    sessions: MovieSession[];
    selectedDate: string;
}

export function CinemaSessions({ cinemas, sessions, selectedDate }: CinemaSessionsProps) {
    // Filtrer les séances par date sélectionnée
    const filteredSessions = sessions.filter(session => {
        console.log(session);
        const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
        return sessionDate === selectedDate;
    });

    // Grouper les séances par cinéma
    const sessionsByCinema = filteredSessions.reduce((acc, session) => {
        if (!acc[session.cinemaId]) acc[session.cinemaId] = [];
        acc[session.cinemaId].push(session);
        return acc;
    }, {} as Record<string, MovieSession[]>);


    if (cinemas.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">Aucune séance disponible pour cette date.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cinemas.map(cinema => {
                const cinemaSessions = sessionsByCinema[cinema.id.toString()];

                return (
                    <div key={cinema.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg p-6 border border-gray-800">
                        {/* En-tête cinéma */}
                        <div className="flex items-start gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white hover:text-red-500 transition cursor-pointer">
                                    {cinema.name} ›
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {cinema.city} {cinema.postal_code}
                                </p>
                            </div>
                        </div>

                        {cinemaSessions && cinemaSessions.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {cinemaSessions.map((session) => (
                                    <SessionCard key={session.id} session={session} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-400">Aucune séance disponible dans ce cinéma pour cette date.</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}