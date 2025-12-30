export interface BookingItem {
    priceId: number;
    priceName: string;
    priceAmount: number;
    quantity: number;
}

export interface BookingRequest {
    sessionId: number;
    items: BookingItem[];
    totalAmount: number;
    userId: number;
}

export interface PaymentIntentResponse {
    clientSecret: string;
    paymentIntentId: string;
}

export interface BookingConfirmation {
    bookingId: string;
    success: boolean;
}

export interface BookingResponse {
    bookingId: string;
    checkoutUrl: string;
}
