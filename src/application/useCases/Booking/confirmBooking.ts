import { BookingConfirmation } from "@/src/domain/Booking";
import { BookingRepository } from "../../repositories/BookingRepository";

export const confirmBooking = async (
    repo: BookingRepository,
    paymentIntentId: string
): Promise<BookingConfirmation> => {
    return repo.confirmBooking(paymentIntentId);
};
