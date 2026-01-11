import { UserBooking } from "@/src/domain/Booking";
import { BookingCard } from "../atoms/BookingCard";

interface BookingListProps {
    bookings: UserBooking[];
}

export function BookingList({ bookings }: BookingListProps) {

    if (bookings.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
                <p className="text-gray-400 mb-6">
                    Vous n'avez pas encore effectué de réservation.
                </p>
                <a 
                    href="/"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                    Découvrir les films
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
}
