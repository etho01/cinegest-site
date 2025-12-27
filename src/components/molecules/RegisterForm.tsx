"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
import { registerUserController } from "@/src/controller/app/UserController";
import { useAction } from "next-safe-action/hooks";

interface RegisterFormProps {
    onSuccess?: () => void;
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeRegister, isExecuting: isRegistering } = useAction(registerUserController, {
        onSuccess: () => {
            setSuccess("Inscription réussie! Vous pouvez maintenant vous connecter.");
            setError("");
            setTimeout(() => {
                onSwitchToLogin();
                setSuccess("");
            }, 2000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de l'inscription");
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

        executeRegister({
            id: 0,
            email,
            firstname,
            lastname,
            phone: phone || null,
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

            <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                </label>
                <input
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                </label>
                <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone (optionnel)
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

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

            <div>
                <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                </label>
                <input
                    type="password"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={8}
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isRegistering}
            >
                {isRegistering ? "Chargement..." : "S'inscrire"}
            </Button>

            <div className="text-center space-y-2 text-sm">
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:text-blue-800 block w-full"
                >
                    Déjà un compte ? Se connecter
                </button>
            </div>
        </form>
    );
}
