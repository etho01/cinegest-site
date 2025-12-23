import { Cinema } from "@/src/domain/Cinema";

export interface CinemaRepository {
    getCinemas(): Promise<Cinema[]>;
}