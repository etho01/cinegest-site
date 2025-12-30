import { PriceRepository } from "@/src/application/repositories/PriceRepository";
import { PricesData } from "@/src/domain/Price";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const PriceRepositoryImpl : PriceRepository = {
    getPrices : async(): Promise<PricesData> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/prices`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as PricesData;
    }
}
