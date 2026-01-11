"use client";
import { Cinema } from "@/src/domain/Cinema";
import { useCinema } from "@/src/context/CinemaContext";
import { useRouter } from "next/navigation";

interface CinemaSelectionTemplateProps {
    cinemas: Cinema[];
}

export function CinemaSelectionTemplate({ cinemas }: CinemaSelectionTemplateProps) {
    const { selectedCinemaId, setSelectedCinemaId } = useCinema();
    const router = useRouter();

    const handleCinemaSelect = (cinemaId: number) => {
        setSelectedCinemaId(cinemaId);
        router.push('/');
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="container mx-auto px-4">
                {/* En-tête */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        🎬 Choisissez votre cinéma
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Sélectionnez le cinéma de votre choix pour voir les films et séances disponibles
                    </p>
                </div>

                {/* Grille de cinémas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {cinemas.map((cinema) => (
                        <div
                            key={cinema.id}
                            onClick={() => handleCinemaSelect(cinema.id)}
                            className={`
                                relative p-6 rounded-xl cursor-pointer transition-all duration-300
                                ${selectedCinemaId === cinema.id
                                    ? 'bg-gradient-to-br from-red-600 to-red-800 shadow-2xl shadow-red-500/50 scale-105'
                                    : 'bg-gray-800 hover:bg-gray-700 hover:shadow-xl'
                                }
                            `}
                        >
                            {/* Badge sélectionné */}
                            {selectedCinemaId === cinema.id && (
                                <div className="absolute top-4 right-4">
                                    <div className="bg-white text-red-600 rounded-full p-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Icône cinéma */}
                            <div className="mb-4">
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center text-3xl
                                    ${selectedCinemaId === cinema.id ? 'bg-white text-red-600' : 'bg-gray-700 text-gray-300'}
                                `}>
                                    🏛️
                                </div>
                            </div>

                            {/* Informations */}
                            <h3 className="text-2xl font-bold mb-2">
                                {cinema.name}
                            </h3>
                            
                            <div className="space-y-2 text-gray-300">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">{cinema.address}</p>
                                        {cinema.address_complement && (
                                            <p className="text-sm">{cinema.address_complement}</p>
                                        )}
                                        <p className="font-medium">
                                            {cinema.postal_code} {cinema.city}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bouton */}
                            <div className="mt-6">
                                <button
                                    className={`
                                        w-full py-3 px-4 rounded-lg font-semibold transition-all
                                        ${selectedCinemaId === cinema.id
                                            ? 'bg-white text-red-600 hover:bg-gray-100'
                                            : 'bg-red-600 text-white hover:bg-red-700'
                                        }
                                    `}
                                >
                                    {selectedCinemaId === cinema.id ? '✓ Sélectionné' : 'Sélectionner'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cinéma sélectionné - Info */}
                {selectedCinemaId && (
                    <div className="mt-12 max-w-2xl mx-auto text-center">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 shadow-2xl">
                            <p className="text-lg mb-4">
                                ✨ Vous avez sélectionné le cinema <span className="font-bold">
                                    {cinemas.find(c => c.id === selectedCinemaId)?.name}
                                </span>
                            </p>
                            <button
                                onClick={() => router.push('/')}
                                className="bg-white cursor-pointer text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                            >
                                Voir les films disponibles →
                            </button>
                        </div>
                    </div>
                )}

                {/* Aucun cinéma sélectionné */}
                {!selectedCinemaId && (
                    <div className="mt-12 max-w-2xl mx-auto text-center">
                        <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl p-6">
                            <p className="text-gray-400 text-lg">
                                👆 Sélectionnez un cinéma ci-dessus pour commencer
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
