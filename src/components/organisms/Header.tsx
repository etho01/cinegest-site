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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <header className="bg-gray-900 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Logo />

                        {/* Navigation Desktop */}
                        <nav className="hidden md:flex items-center gap-8">
                            <LinkButton 
                                className={'text-base hover:text-red-500 transition-colors ' + (page === 'home' ? 'text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/"
                            >
                                🎬 Films
                            </LinkButton>
                            <LinkButton 
                                className={'text-base hover:text-red-500 transition-colors ' + (page === 'cinema' ? 'text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/cinema"
                            >
                                🏛️ Cinémas
                            </LinkButton>
                            <LinkButton 
                                className={'text-base hover:text-red-500 transition-colors ' + (page === 'prix' ? 'text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/prix"
                            >
                                💰 Tarifs
                            </LinkButton>
                            {user && (
                                <LinkButton 
                                    className={'text-base hover:text-red-500 transition-colors ' + (page === 'reservations' ? 'text-red-500 font-bold' : '')} 
                                    size="sm" 
                                    variant="transparent" 
                                    href="/reservations"
                                >
                                    🎟️ Mes Réservations
                                </LinkButton>
                            )}
                        </nav>

                        {/* Actions Desktop */}
                        <div className="hidden md:flex gap-3 items-center">
                            {!isLoading && (
                                <>
                                    {user ? (
                                        <>
                                            <LinkButton
                                                href="/profile"
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 hover:bg-gray-800"
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
                                                className="flex items-center gap-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
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
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Connexion / Inscription
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Burger Menu Mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Menu Mobile */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-800 py-4 space-y-2">
                            <LinkButton 
                                className={'block text-base hover:bg-gray-800 rounded px-4 py-2 ' + (page === 'home' ? 'bg-gray-800 text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                🎬 Films
                            </LinkButton>
                            <LinkButton 
                                className={'block text-base hover:bg-gray-800 rounded px-4 py-2 ' + (page === 'cinema' ? 'bg-gray-800 text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/cinema"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                🏛️ Cinémas
                            </LinkButton>
                            <LinkButton 
                                className={'block text-base hover:bg-gray-800 rounded px-4 py-2 ' + (page === 'prix' ? 'bg-gray-800 text-red-500 font-bold' : '')} 
                                size="sm" 
                                variant="transparent" 
                                href="/prix"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                💰 Tarifs
                            </LinkButton>
                            {user && (
                                <LinkButton 
                                    className={'block text-base hover:bg-gray-800 rounded px-4 py-2 ' + (page === 'reservations' ? 'bg-gray-800 text-red-500 font-bold' : '')} 
                                    size="sm" 
                                    variant="transparent" 
                                    href="/reservations"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    🎟️ Mes Réservations
                                </LinkButton>
                            )}
                            
                            <div className="pt-4 border-t border-gray-800 space-y-2">
                                {!isLoading && (
                                    <>
                                        {user ? (
                                            <>
                                                <LinkButton
                                                    href="/profile"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="flex items-center gap-2 hover:bg-gray-800 w-full px-4 py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span>{user.firstname} {user.lastname}</span>
                                                </LinkButton>
                                                <Button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white w-full"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Déconnexion
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    setIsAuthModalOpen(true);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                variant="default"
                                                size="sm"
                                                className="bg-red-600 hover:bg-red-700 w-full"
                                            >
                                                Connexion / Inscription
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
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