import z from "zod"
import { CustomError } from "./global";

export type User = {
    id: number,
    email : string,
    firstname : string,
    lastname: string,
    phone : string | null,
}

export interface RegisterUser extends User
{
    password : string,
    passwordConfirmation : string,
}

export const UserEmpty : User = {
    id: 0,
    email : "",
    firstname : "",
    lastname: "",
    phone : null,
}

export const UserSchema = z.object({
    id: z.number(),
    email : z.string().email(),
    firstname : z.string().max(100),
    lastname: z.string().max(100),
    phone : z.string().max(20).nullable(),
});

export type UserLog = {
    email : string,
    password : string
}

export const UserLogSchema = z.object({
    email : z.email(),
    password : z.string().max(255),
})

export type PasswordResetRequest = {
    email: string
}

export const PasswordResetRequestSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide" })
})

export type PasswordReset = {
    email: string,
    token: string,
    password: string,
    passwordConfirmation: string
}

export const PasswordResetSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
    token: z.string().min(1, { message: "Le token de réinitialisation est requis" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    passwordConfirmation: z.string().min(1, { message: "La confirmation du mot de passe est requise" })
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirmation"]
})

export class Unauthenticated extends Error
{
    constructor()
    {
        super("L'utilisateur n'est pas authentifier");
    }
}

export class Unauthorized extends CustomError
{
    constructor(message?: string)
    {
        const baseMessage = "L'utilisateur n'est pas autorisé";
        super(message || baseMessage);
    }
}