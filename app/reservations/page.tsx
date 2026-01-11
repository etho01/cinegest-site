import { redirect } from "next/navigation";
import { BookingsTemplate } from "@/src/components/templates/BookingsTemplate";
import { getUserBookings } from "@/src/controller/app/BookingController";
import { getMeController } from "@/src/controller/app/AuthController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Réservations",
  description: "Consultez toutes vos réservations de billets de cinéma.",
};

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
