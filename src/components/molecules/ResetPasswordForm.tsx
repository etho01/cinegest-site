"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { requestPasswordResetController } from "@/src/controller/app/UserController";
import { useAction } from "next-safe-action/hooks";

interface ResetPasswordFormProps {
    onSuccess?: () => void;
    onSwitchToLogin: () => void;
}

export default function ResetPasswordForm({ onSuccess, onSwitchToLogin }: ResetPasswordFormProps) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeReset, isExecuting: isResetting } = useAction(requestPasswordResetController, {
        onSuccess: () => {
            setSuccess("Un email de réinitialisation a été envoyé à votre adresse.");
            setError("");
            if (onSuccess) onSuccess();
            setTimeout(() => {
                onSwitchToLogin();
            }, 3000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de la demande de réinitialisation");
            setSuccess("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        executeReset({ email });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            <p className="text-sm text-gray-300">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isResetting}
                size="none"
            >
                {isResetting ? "Chargement..." : "Envoyer le lien"}
            </Button>

            <div className="text-center space-y-2 text-sm">
                <Button
                    type="button"
                    onClick={onSwitchToLogin}
                    variant="link"
                    className="w-full"
                    size="none"
                >
                    Retour à la connexion
                </Button>
            </div>
        </form>
    );
}
