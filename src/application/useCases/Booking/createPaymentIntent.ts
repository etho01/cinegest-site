import { BookingRequest, PaymentIntentResponse } from "@/src/domain/Booking";
import { BookingRepository } from "../../repositories/BookingRepository";

export const createPaymentIntent = async (
    repo: BookingRepository,
    bookingData: BookingRequest
): Promise<PaymentIntentResponse> => {
    return repo.createPaymentIntent(bookingData);
};
