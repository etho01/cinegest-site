import { CinemaRepository } from "@/src/application/repositories/CinemaRepository";
import { Cinema } from "@/src/domain/Cinema";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const CinemaRepositoryImpl : CinemaRepository = {
    getCinemas : async (): Promise<Cinema[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/cinemas`, {}, {});
        console.log(resp);
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Cinema[];
    }
}