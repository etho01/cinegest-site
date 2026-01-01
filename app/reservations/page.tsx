import { redirect } from "next/navigation";
import { BookingsTemplate } from "@/src/components/templates/BookingsTemplate";
import { getUserBookings } from "@/src/controller/app/BookingController";
import { getMeController } from "@/src/controller/app/AuthController";

export default async function BookingsPage() {
    // Vérifier l'authentification
    const user = await getMeController();
    
    if (!user) {
        redirect('/');
    }

    // Récupérer les réservations
    const bookings = await getUserBookings();

    return <BookingsTemplate bookings={bookings} />;
}
