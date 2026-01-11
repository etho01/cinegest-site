import { UserBooking } from "@/src/domain/Booking";
import Image from "next/image";
import Link from "next/link";

interface BookingCardProps {
    booking: UserBooking;
}

export function BookingCard({ booking }: BookingCardProps) {
    const sessionDate = new Date(booking.session.date);
    const formattedDate = sessionDate.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const totalTickets = booking.items.reduce((sum, item) => sum + item.quantity, 0);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'confirmed': { label: 'Confirmé', color: 'bg-green-600' },
            'pending': { label: 'En attente', color: 'bg-yellow-600' },
            'cancelled': { label: 'Annulé', color: 'bg-red-600' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'bg-gray-600' };
        
        return (
            <span className={`${config.color} text-white text-xs px-3 py-1 rounded-full`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
                {/* Image du film */}
                <div className="md:w-1/3 relative h-64 md:h-auto">
                    {booking.session.movie.posterUrl ? (
                        <Image
                            src={booking.session.movie.posterUrl}
                            alt={booking.session.movie.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500">Pas d'affiche</span>
                        </div>
                    )}
                </div>

                {/* Informations de la réservation */}
                <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {booking.session.movie.title}
                            </h3>
                            {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">
                                {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    {/* Détails de la séance */}
                    <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="capitalize">{formattedDate}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{booking.session.time}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                                <p className="font-semibold">{booking.session.cinema.name}</p>
                                <p className="text-sm text-gray-400">{booking.session.cinema.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tickets */}
                    <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Billets ({totalTickets})</h4>
                        <div className="space-y-1">
                            {booking.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm text-gray-300">
                                    <span>{item.quantity}x {item.priceName}</span>
                                    <span>{(item.priceAmount * item.quantity).toFixed(2)}€</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold text-white mt-3 pt-3 border-t border-gray-700">
                            <span>Total</span>
                            <span>{booking.totalAmount.toFixed(2)}€</span>
                        </div>
                    </div>

                    {/* Actions */}
                    {booking.status === 'confirmed' && (
                        <div className="mt-4">
                            <Link 
                                href={`/films/${booking.session.movie.id}`}
                                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                            >
                                Voir le film
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
