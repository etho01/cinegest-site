"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
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
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

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

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={8}
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isLoggingIn}
            >
                {isLoggingIn ? "Chargement..." : "Se connecter"}
            </Button>

            <div className="text-center space-y-2 text-sm">
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-blue-600 hover:text-blue-800 block w-full"
                >
                    Pas encore de compte ? S'inscrire
                </button>
                <button
                    type="button"
                    onClick={onSwitchToReset}
                    className="text-gray-600 hover:text-gray-800 block w-full"
                >
                    Mot de passe oublié ?
                </button>
            </div>
        </form>
    );
}
