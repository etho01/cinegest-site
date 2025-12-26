import { PricesData } from "@/src/domain/Price";


export interface PriceRepository
{
    getPrices() : Promise<PricesData>;
}
