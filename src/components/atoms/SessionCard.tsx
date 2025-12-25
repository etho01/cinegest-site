

import { MovieSession } from '@/src/domain/Movie';

interface SessionCardProps {
    session: MovieSession;
}

export function SessionCard({ session }: SessionCardProps) {
    const getTechBadge = (tech: string) => {
        switch (tech) {
            case 'IMAX': return { label: 'IMAX', className: 'bg-blue-600 text-white' };
            case '4DX': return { label: '4DX', className: 'bg-purple-600 text-white' };
            case 'Dolby': return { label: 'Dolby', className: 'bg-black text-white border border-white' };
            case 'ScreenX': return { label: 'ScreenX', className: 'bg-red-600 text-white' };
            default: return null;
        }
    };

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

    const techBadge = getTechBadge(session.technology || 'Standard');
    const is3D = session.technology === 'IMAX' || session.technology === '4DX';

    return (
        <button className="group relative bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg p-3 transition-all duration-200">
            {/* Badges technologie */}
            <div className="flex flex-wrap gap-1 mb-2 min-h-[20px]">
                {techBadge && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${techBadge.className}`}>
                        {techBadge.label}
                    </span>
                )}
                {is3D && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-black">
                        3D
                    </span>
                )}
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-black border border-gray-300">
                    HFR
                </span>
            </div>

            {/* Horaire principal */}
            <div className="text-center mb-1">
                <div className="text-2xl font-bold text-white group-hover:text-red-500 transition">
                    {formatTime(session.datetime)}
                </div>
            </div>

            {/* Langue et heure de fin */}
            <div className="text-center space-y-0.5">
                <div className="text-xs text-gray-400 font-medium">
                    {session.language}
                </div>
                <div className="text-[11px] text-gray-500">
                    {formatEndTime(session.datetime)}
                </div>
            </div>

            {/* Icônes accessibilité */}
            <div className="flex justify-center gap-1.5 mt-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
            </div>
        </button>
    );
}