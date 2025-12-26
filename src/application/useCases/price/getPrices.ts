import { PricesData } from "@/src/domain/Price";
import { PriceRepository } from "../../repositories/PriceRepository";


export const getPrices = async(repo: PriceRepository) : Promise<PricesData> => {
    return repo.getPrices()
}
