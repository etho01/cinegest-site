"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { loginController } from "@/src/controller/app/AuthController";
import { useAction } from "next-safe-action/hooks";

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToRegister: () => void;
    onSwitchToReset: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister, onSwitchToReset }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeLogin, isExecuting: isLoggingIn } = useAction(loginController, {
        onSuccess: () => {
            setSuccess("Connexion réussie!");
            setError("");
            if (onSuccess) onSuccess();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de la connexion");
            setSuccess("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        executeLogin({ email, password });
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

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Input
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isLoggingIn}
                size="none"
            >
                {isLoggingIn ? "Chargement..." : "Se connecter"}
            </Button>

            <div className="text-center space-y-2 text-sm">
                <Button
                    type="button"
                    onClick={onSwitchToRegister}
                    variant="link"
                    size="none"
                    className="w-full"
                >
                    Pas encore de compte ? S'inscrire
                </Button>
                <Button
                    type="button"
                    onClick={onSwitchToReset}
                    variant="linkSecondary"
                    size="none"
                    className="w-full"
                >
                    Mot de passe oublié ?
                </Button>
            </div>
        </form>
    );
}
