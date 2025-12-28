"use client"
import { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { updateMeController } from "@/src/controller/app/UserController";
import { useAction } from "next-safe-action/hooks";
import { User } from "@/src/domain/User";

interface UpdateProfileFormProps {
    user: User;
    onSuccess?: () => void;
}

export default function UpdateProfileForm({ user, onSuccess }: UpdateProfileFormProps) {
    const [email, setEmail] = useState(user.email);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeUpdate, isExecuting: isUpdating } = useAction(updateMeController, {
        onSuccess: () => {
            setSuccess("Vos informations ont été mises à jour avec succès!");
            setError("");
            if (onSuccess) onSuccess();
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de la mise à jour");
            setSuccess("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        executeUpdate({
            id: user.id,
            email,
            firstname,
            lastname,
            phone: phone || null,
        });
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

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Input
                label="Téléphone (optionnel)"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isUpdating}
            >
                {isUpdating ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
        </form>
    );
}
