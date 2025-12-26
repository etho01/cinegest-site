import { UserRepository } from "@/src/application/repositories/UserRepository";
import { UpdateMePasswordProps } from "@/src/application/useCases/User/updateMePassword";
import { User, UserLog, PasswordResetRequest, PasswordReset, RegisterUser } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const UserRepositoryImpl: UserRepository = {
    connect: async (userLog: UserLog) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/site/auth/login`, userLog, {});
        await throwErrorResponse(resp);

        const text = await resp.text()
        const body = JSON.parse(text);
        return body['token'];
    },
    logout: async () => {
        await ApiRequestServeur.POST(`${process.env.API_URL}api/site/auth/logout`, {}, {});
    },
    me: async (): Promise<User> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/site/me`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateMe : async (user : User) : Promise<User> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/site/me`, user, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateMePassword : async (props: UpdateMePasswordProps) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/site/me/password`, props, {});
        await throwErrorResponse(resp);
    },
    requestPasswordReset : async (request: PasswordResetRequest) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/site/auth/forgot-password`, request, {});
        await throwErrorResponse(resp);
    },
    resetPassword : async (reset: PasswordReset) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/site/auth/reset-password`, reset, {});
        await throwErrorResponse(resp);
    },
    registerUser : async (user: RegisterUser) : Promise<User> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/site/auth/register`, user, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    }
}