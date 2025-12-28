"use client"
import { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { updateMePasswordController } from "@/src/controller/app/UserController";
import { useAction } from "next-safe-action/hooks";

interface UpdatePasswordFormProps {
    onSuccess?: () => void;
}

export default function UpdatePasswordForm({ onSuccess }: UpdatePasswordFormProps) {
    const [actualPassword, setActualPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { execute: executeUpdate, isExecuting: isUpdating } = useAction(updateMePasswordController, {
        onSuccess: () => {
            setSuccess("Votre mot de passe a été modifié avec succès!");
            setError("");
            setActualPassword("");
            setNewPassword("");
            setNewPasswordConfirmation("");
            if (onSuccess) onSuccess();
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        },
        onError: ({ error }) => {
            setError(error.serverError || "Une erreur est survenue lors de la modification du mot de passe");
            setSuccess("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== newPasswordConfirmation) {
            setError("Les nouveaux mots de passe ne correspondent pas");
            return;
        }

        executeUpdate({
            actualPassword,
            newPassword,
            newPasswordConfirmation
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

            <Input
                label="Mot de passe actuel"
                type="password"
                value={actualPassword}
                onChange={(e) => setActualPassword(e.target.value)}
                required
            />

            <Input
                label="Nouveau mot de passe"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 caractères"
            />

            <Input
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                required
                minLength={8}
                placeholder="Confirmez votre nouveau mot de passe"
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isUpdating}
            >
                {isUpdating ? "Modification..." : "Modifier le mot de passe"}
            </Button>
        </form>
    );
}
