import { Movie } from "@/src/domain/Movie";
import { formatDate } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link href={`/films/${movie.id}`} className="block">
            <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="relative aspect-2/3 w-full bg-gray-200 overflow-hidden">
                    <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    
                    {/* Badge */}
                    {movie.badge && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                            {movie.badge}
                        </div>
                    )}
                    
                    {/* Overlay avec gradient au hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Informations au hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                        <p className="text-xs opacity-90">{formatDate(movie.releaseDate)}</p>
                        {movie.genres && movie.genres.length > 0 && (
                            <p className="text-xs opacity-75 mt-1">{movie.genres.join(', ')}</p>
                        )}
                    </div>
                </div>
                
                {/* Titre visible en permanence (version mobile-friendly) */}
                <div className="p-3 bg-white">
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{movie.title}</h3>
                </div>
            </div>
        </Link>
    );
}
