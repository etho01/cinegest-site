import { BookingRequest, PaymentIntentResponse, BookingConfirmation } from "@/src/domain/Booking";

export interface BookingRepository {
    createPaymentIntent(bookingData: BookingRequest): Promise<PaymentIntentResponse>;
    confirmBooking(paymentIntentId: string): Promise<BookingConfirmation>;
}
