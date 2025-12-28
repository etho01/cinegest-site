"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { resetPasswordController } from "@/src/controller/app/UserController";
import { useAction } from "next-safe-action/hooks";

interface ResetPasswordFormProps {
    email: string;
    token: string;
}

export default function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeReset, isExecuting: isResetting } = useAction(resetPasswordController, {
        onSuccess: () => {
            setSuccess("Votre mot de passe a été réinitialisé avec succès!");
            setError("");
            setTimeout(() => {
                router.push("/");
            }, 2000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de la réinitialisation du mot de passe");
            setSuccess("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== passwordConfirmation) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        executeReset({
            email,
            token,
            password,
            passwordConfirmation
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            <Input
                label="Email"
                type="email"
                value={email}
                disabled
                className="bg-gray-700/50 text-gray-400"
            />

            <Input
                label="Nouveau mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700/50 text-white focus:ring-red-600 focus:border-transparent"
                required
                minLength={8}
                placeholder="Minimum 8 caractères"
            />

            <Input
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="bg-gray-700/50 text-white focus:ring-red-600 focus:border-transparent"
                required
                minLength={8}
                placeholder="Confirmez votre mot de passe"
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isResetting}
                    size="none"
            >
                {isResetting ? "Réinitialisation..." : "Réinitialiser mon mot de passe"}
            </Button>

            <div className="text-center">
                <Button
                    type="button"
                    onClick={() => router.push("/")}
                    variant="linkSecondary"
                    className="text-sm"
                    size="none"
                >
                    Retour à l'accueil
                </Button>
            </div>
        </form>
    );
}
