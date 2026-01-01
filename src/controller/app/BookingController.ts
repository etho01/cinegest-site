'use server';

import { actionClient } from '@/src/lib/safe-action-client';
import { z } from 'zod';
import { BookingRepositoryImpl } from '@/src/infrastructure/repositories/BookingRepositoryImpl';
import { createPaymentIntent as createPaymentIntentUseCase } from '@/src/application/useCases/Booking/createPaymentIntent';
import { confirmBooking as confirmBookingUseCase } from '@/src/application/useCases/Booking/confirmBooking';
import { getUserBookings as getUserBookingsUseCase } from '@/src/application/useCases/Booking/getUserBookings';
import { getMeController } from './AuthController';

const bookingSchema = z.object({
    sessionId: z.number(),
    items: z.array(z.object({
        priceId: z.number(),
        priceName: z.string(),
        priceAmount: z.number(),
        quantity: z.number(),
    })),
    totalAmount: z.number(),
});

export const createPaymentIntent = actionClient
    .schema(bookingSchema)
    .action(async ({ parsedInput }) => {
        const { sessionId, items, totalAmount } = parsedInput;

        // Récupérer l'utilisateur connecté
        const user = await getMeController();
        if (!user) {
            throw new Error('Utilisateur non authentifié');
        }

        const bookingData = {
            sessionId,
            items,
            totalAmount,
            userId: user.id,
        };

        const result = await createPaymentIntentUseCase(BookingRepositoryImpl, bookingData);

        return {
            clientSecret: result.clientSecret,
            paymentIntentId: result.paymentIntentId,
        };
    });

// Action pour confirmer la réservation après paiement réussi
const confirmBookingSchema = z.object({
    paymentIntentId: z.string(),
});

export const confirmBooking = actionClient
    .schema(confirmBookingSchema)
    .action(async ({ parsedInput }) => {
        const { paymentIntentId } = parsedInput;

        const result = await confirmBookingUseCase(BookingRepositoryImpl, paymentIntentId);

        return {
            bookingId: result.bookingId,
            success: result.success,
        };
    });

// Action pour récupérer les réservations de l'utilisateur connecté
export const getUserBookings = async () => {
    // Vérifier que l'utilisateur est connecté
    const user = await getMeController();
    if (!user) {
        throw new Error('Utilisateur non authentifié');
    }

    const bookings = await getUserBookingsUseCase(BookingRepositoryImpl);
    return bookings;
};
