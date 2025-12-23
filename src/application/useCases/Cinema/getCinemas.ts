import { Cinema } from "@/src/domain/Cinema";
import { CinemaRepository } from "../../repositories/CinemaRepository";


export const getCinemas = async (repo : CinemaRepository): Promise<Cinema[]> => {
    return await repo.getCinemas();
}