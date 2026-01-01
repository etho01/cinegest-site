import { UserBooking } from "@/src/domain/Booking";
import { BookingRepository } from "../../repositories/BookingRepository";

export const getUserBookings = async (
    repo: BookingRepository
): Promise<UserBooking[]> => {
    return repo.getUserBookings();
};
