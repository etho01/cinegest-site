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

export interface UserBooking {
    id: number;
    sessionId: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: BookingItem[];
    session: {
        id: number;
        date: string;
        time: string;
        cinema: {
            id: number;
            name: string;
            address: string;
        };
        movie: {
            id: number;
            title: string;
            posterUrl?: string;
        };
    };
}
