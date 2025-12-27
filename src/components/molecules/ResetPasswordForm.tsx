"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
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
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            <p className="text-sm text-gray-600">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isResetting}
            >
                {isResetting ? "Chargement..." : "Envoyer le lien"}
            </Button>

            <div className="text-center space-y-2 text-sm">
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:text-blue-800 block w-full"
                >
                    Retour à la connexion
                </button>
            </div>
        </form>
    );
}
