import { UserBooking } from "@/src/domain/Booking";
import { BookingList } from "../molecules/BookingList";
import { Header } from "../organisms/Header";

interface BookingsTemplateProps {
    bookings: UserBooking[];
}

export function BookingsTemplate({ bookings }: BookingsTemplateProps) {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Mes réservations</h1>
                    <p className="text-gray-400">
                        Retrouvez ici toutes vos réservations de billets de cinéma
                    </p>
                </div>

                <BookingList bookings={bookings} />
            </div>
        </div>
    );
}
