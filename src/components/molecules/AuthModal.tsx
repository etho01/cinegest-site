"use client"
import { useState } from "react";
import Modal from "../atoms/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

type AuthMode = "login" | "register" | "reset";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
    onSuccess?: () => void;
    onAuthSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, initialMode = "login", onSuccess, onAuthSuccess }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);

    const getTitle = () => {
        switch (mode) {
            case "login":
                return "Connexion";
            case "register":
                return "Inscription";
            case "reset":
                return "Réinitialisation du mot de passe";
        }
    };

    const handleSuccess = () => {
        if (onSuccess) onSuccess();
        if (onAuthSuccess) onAuthSuccess();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
            {mode === "login" && (
                <LoginForm
                    onSuccess={handleSuccess}
                    onSwitchToRegister={() => setMode("register")}
                    onSwitchToReset={() => setMode("reset")}
                />
            )}
            
            {mode === "register" && (
                <RegisterForm
                    onSuccess={onSuccess}
                    onSwitchToLogin={() => setMode("login")}
                />
            )}
            
            {mode === "reset" && (
                <ResetPasswordForm
                    onSuccess={onSuccess}
                    onSwitchToLogin={() => setMode("login")}
                />
            )}
        </Modal>
    );
}
