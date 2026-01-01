import { BookingRequest, PaymentIntentResponse, BookingConfirmation, UserBooking } from "@/src/domain/Booking";

export interface BookingRepository {
    createPaymentIntent(bookingData: BookingRequest): Promise<PaymentIntentResponse>;
    confirmBooking(paymentIntentId: string): Promise<BookingConfirmation>;
    getUserBookings(): Promise<UserBooking[]>;
}
