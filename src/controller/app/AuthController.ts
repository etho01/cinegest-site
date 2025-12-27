"use server";

import { connect } from "@/src/application/useCases/User/connect";
import { logout } from "@/src/application/useCases/User/logout";
import { me } from "@/src/application/useCases/User/me";
import { UserLogSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import { cookies } from "next/headers";

export const loginController = actionClient.schema(
    UserLogSchema
).action(async ({parsedInput: input}) => {
    const cookieStore = await cookies();
    const token = await connect(UserRepositoryImpl, input);
    cookieStore.set('login-token', token, {
        httpOnly : true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return { success: true };
});

export const logoutController = async() => {
    await logout(UserRepositoryImpl);
    const cookieStore = await cookies();
    cookieStore.delete('login-token');
    return { success: true };
};

export const getMeController = async() => {
    try {
        const user = await me(UserRepositoryImpl);
        return user;
    } catch (error) {
        return null;
    }
};