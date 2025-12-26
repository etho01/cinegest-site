import { Movie } from '@/src/domain/Movie';
import Image from 'next/image';

interface MovieHeroProps {
    movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
    return (
        <div className="relative bg-black text-white">
            {/* Background poster avec overlay */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover blur-sm"
                />
            </div>

            <div className="relative container mx-auto px-4 py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Poster du film */}
                    <div className="shrink-0">
                        <div className="relative w-64 h-96 mx-auto lg:mx-0">
                            <Image
                                src={movie.posterUrl}
                                alt={movie.title}
                                fill
                                className="object-cover rounded-lg shadow-xl"
                            />
                        </div>
                    </div>

                    {/* Informations du film */}
                    <div className="grow space-y-6">
                        {/* Logo ou titre */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-bold">{movie.title}</h1>
                        </div>

                        {/* Informations techniques */}
                        <div className="flex flex-wrap gap-6 text-gray-300">
                            {movie.duration && (
                                <span className="flex items-center gap-1">
                                    🕒 {movie.duration}
                                </span>
                            )}
                            {movie.genres && movie.genres.length > 0 && (
                                <span>{movie.genres.join(', ')}</span>
                            )}
                            {movie.ageRating && (
                                <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                                    {movie.ageRating}
                                </span>
                            )}
                        </div>

                        {/* Date de sortie et équipe */}
                        <div className="space-y-2 text-gray-300">
                            <div>
                                <span className="font-semibold">Sortie :</span> {movie.releaseDate}
                            </div>
                            {movie.cast && movie.cast.length > 0 && (
                                <div>
                                    <span className="font-semibold">Avec :</span> {movie.cast.join(', ')}
                                </div>
                            )}
                            {movie.director && (
                                <div>
                                    <span className="font-semibold">de</span> {movie.director}
                                </div>
                            )}
                        </div>

                        {/* CTA principal */}
                        <div className="pt-4">
                            <a
                                href="#sessions"
                                className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
                            >
                                Infos, vidéos & détails ▼
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}