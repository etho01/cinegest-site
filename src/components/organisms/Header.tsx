"use client"
import { useState, useEffect } from "react";
import { LinkButton } from "../atoms/Button";
import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import AuthModal from "../molecules/AuthModal";
import { getMeController, logoutController } from "@/src/controller/app/AuthController";
import { User } from "@/src/domain/User";

interface HeaderProps {
    page?: string;
    pageTitle?: string;
}

export const Header = ({ pageTitle, page }: HeaderProps) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await getMeController();
            setUser(userData);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutController();
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    return (
        <>
            <header className="flex justify-between items-center py-3 px-10">
                <div className="flex gap-8">
                    <Logo />
                    <LinkButton className={'text-lg ' + (page === 'home' ? 'font-bold' : '')} size="sm" variant="transparent" href="/">
                        Films
                    </LinkButton>
                    <LinkButton className={'text-lg ' + (page === 'cinema' ? 'font-bold' : '')} size="sm" variant="transparent" href="/cinema">
                        Cinema
                    </LinkButton>
                    <LinkButton className={'text-lg ' + (page === 'prix' ? 'font-bold' : '')} size="sm" variant="transparent" href="/prix">
                        Prix
                    </LinkButton>
                </div>
                <div className="flex gap-4 items-center">
                    {!isLoading && (
                        <>
                            {user ? (
                                <>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        
                                        <span>{user.firstname} {user.lastname}</span>
                                    </div>
                                    <Button
                                        onClick={handleLogout}
                                        variant="default"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        
                                        Déconnexion
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    variant="default"
                                    size="sm"
                                >
                                    Connexion / Inscription
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </header>
            
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={checkAuth}
            />
        </>
    );
}