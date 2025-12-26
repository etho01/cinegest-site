

import { MovieSession } from '@/src/domain/Movie';

interface SessionCardProps {
    session: MovieSession;
}

export function SessionCard({ session }: SessionCardProps) {
    const formatTime = (datetime: string) => {
        return new Date(datetime).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        }).replace(':', '.');
    };

    const formatEndTime = (datetime: string, duration: number = 197) => {
        const start = new Date(datetime);
        const end = new Date(start.getTime() + duration * 60000);
        return '→ ' + end.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <button className="group relative bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg p-3 transition-all duration-200">
            {/* Badges technologie */}
            <div className="flex flex-wrap gap-1 mb-2 min-h-[20px]">
                {session.options?.map(option => (
                    <>
                        {option.publicName && (
                            <span key={option.id} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-black border border-gray-300">
                                {option.publicName || 'Option'}
                            </span>
                        )}
                    </>
                ))}
            </div>

            {/* Horaire principal */}
            <div className="text-center mb-1">
                <div className="text-2xl font-bold text-white group-hover:text-red-500 transition">
                    {formatTime(session.startTime)}
                </div>
            </div>

            {/* Langue et heure de fin */}
            <div className="text-center space-y-0.5">
                <div className="text-[11px] text-gray-500">
                    {formatEndTime(session.startTime)}
                </div>
            </div>
        </button>
    );
}