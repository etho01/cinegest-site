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
                    {user && (
                        <LinkButton className={'text-lg ' + (page === 'reservations' ? 'font-bold' : '')} size="sm" variant="transparent" href="/reservations">
                            Mes réservations
                        </LinkButton>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    {!isLoading && (
                        <>
                            {user ? (
                                <>
                                    <LinkButton
                                        href="/profile"
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{user.firstname} {user.lastname}</span>
                                    </LinkButton>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
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