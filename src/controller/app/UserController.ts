"use server"
import { updateMe } from "@/src/application/useCases/User/updateMe";
import { updateMePassword } from "@/src/application/useCases/User/updateMePassword";
import { requestPasswordReset } from "@/src/application/useCases/User/requestPasswordReset";
import { resetPassword } from "@/src/application/useCases/User/resetPassword";
import { UserSchema, PasswordResetRequestSchema, PasswordResetSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";
import { registerUser } from "@/src/application/useCases/User/registerUser";


export const updateMeController = actionClient.schema(
    UserSchema
).action(async ({parsedInput: user}) => {
    const userUpdated = await updateMe(UserRepositoryImpl, { ...user });

    return userUpdated;
});

export const updateMePasswordController = actionClient.schema(
    z.object({
        actualPassword: z.string().min(1, { message: "Le mot de passe actuel est requis" }),
        newPassword: z.string().min(8, { message: "Le nouveau mot de passe doit contenir au moins 8 caractères" }),
        newPasswordConfirmation: z.string().min(1, { message: "La confirmation du nouveau mot de passe est requise" })
    })
).action(async ({parsedInput: props}) => {
    await updateMePassword(UserRepositoryImpl, props);
});


export const requestPasswordResetController = actionClient.schema(
    PasswordResetRequestSchema
).action(async ({parsedInput: request}) => {
    await requestPasswordReset(UserRepositoryImpl, request);
});

export const resetPasswordController = actionClient.schema(
    PasswordResetSchema
).action(async ({parsedInput: reset}) => {
    await resetPassword(UserRepositoryImpl, reset);
});

export const registerUserController = actionClient.schema(
    UserSchema.extend({
        password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
        passwordConfirmation: z.string().min(1, { message: "La confirmation du mot de passe est requise" })
    })
).action(async ({parsedInput: user}) => {
    const userRegistered = await registerUser(UserRepositoryImpl, { ...user });
    return userRegistered;
});