"use client"
import { useState, useEffect } from "react";
import { Header } from "@/src/components/organisms/Header";
import UpdateProfileForm from "@/src/components/molecules/UpdateProfileForm";
import UpdatePasswordForm from "@/src/components/molecules/UpdatePasswordForm";
import { getMeController } from "@/src/controller/app/AuthController";
import { User } from "@/src/domain/User";
import { useRouter } from "next/navigation";

export default function ProfileTemplate() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await getMeController();
            setUser(userData);
        } catch (error) {
            router.push("/");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSuccess = async () => {
        await checkAuth();
    };

    if (isLoading) {
        return (
            <>
                <Header page="profile" />
                <main className="min-h-screen">
                    <div className="container mx-auto px-4 py-12">
                        <div className="text-center text-gray-300">Chargement...</div>
                    </div>
                </main>
            </>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <Header page="profile" />
            
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Mon Profil</h1>
                        <div className="h-1 w-20 bg-red-600 rounded mx-auto mb-4"></div>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Gérez vos informations personnelles et votre mot de passe
                        </p>
                    </div>

                    {/* Profile Sections */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Informations personnelles */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Informations personnelles
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Modifiez vos informations de profil
                                </p>
                            </div>
                            <UpdateProfileForm user={user} onSuccess={handleUpdateSuccess} />
                        </div>

                        {/* Sécurité */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Sécurité
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Modifiez votre mot de passe pour sécuriser votre compte
                                </p>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        {/* Info Box */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <div className="text-blue-400 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">
                                        Protection de vos données
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Vos informations personnelles sont sécurisées et ne seront jamais partagées avec des tiers. 
                                        Pour toute question concernant vos données, n'hésitez pas à nous contacter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
