import { CinemaRepository } from "@/src/application/repositories/CinemaRepository";
import { Cinema } from "@/src/domain/Cinema";


export const CinemaRepositoryImpl : CinemaRepository {
    async getCinemas(): Promise<Cinema[]> {
        // Implementation to fetch cinemas from an API or database
        return [];
    }
}