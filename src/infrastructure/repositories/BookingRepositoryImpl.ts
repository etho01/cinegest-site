import { BookingRepository } from "@/src/application/repositories/BookingRepository";
import { BookingRequest, PaymentIntentResponse, BookingConfirmation } from "@/src/domain/Booking";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";

export const BookingRepositoryImpl: BookingRepository = {
    createPaymentIntent: async (bookingData: BookingRequest): Promise<PaymentIntentResponse> => {
        const apiUrl = process.env.API_URL || 'http://localhost:8000/';
        const response = await ApiRequestServeur.POST(
            `${apiUrl}api/site/booking/payment-intent`,
            bookingData
        );
        console.log(response);
        await throwErrorResponse(response);

        const text = await response.text();
        const body = JSON.parse(text);
        
        return {
            clientSecret: body.clientSecret,
            paymentIntentId: body.paymentIntentId,
        };
    },

    confirmBooking: async (paymentIntentId: string): Promise<BookingConfirmation> => {
        const apiUrl = process.env.API_URL || 'http://localhost:8000/';
        const response = await ApiRequestServeur.POST(
            `${apiUrl}api/site/booking/confirm`,
            { paymentIntentId }
        );

        await throwErrorResponse(response);

        const text = await response.text();
        const body = JSON.parse(text);

        return {
            bookingId: body.bookingId,
            success: true,
        };
    }
};
