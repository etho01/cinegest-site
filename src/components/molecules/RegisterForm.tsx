"use client"
import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
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
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded col-span-2">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded col-span-2">
                    {success}
                </div>
            )}

            <Input
                label="Prénom"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
            />

            <Input
                label="Nom"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
            />

            <Input
                label="Téléphone (optionnel)"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

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

            <Input
                label="Confirmer le mot de passe"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                minLength={8}
            />

            <Button
                type="submit"
                className="w-full col-span-2"
                size="none"
                disabled={isRegistering}
            >
                {isRegistering ? "Chargement..." : "S'inscrire"}
            </Button>

            <div className="text-center space-y-2 text-sm col-span-2">
                <Button
                    type="button"
                    onClick={onSwitchToLogin}
                    variant="link"
                    className="w-full"
                    size="none"
                >
                    Déjà un compte ? Se connecter
                </Button>
            </div>
        </form>
    );
}
