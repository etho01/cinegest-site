"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/atoms/Button";

export default function InvalidLinkMessage() {
    const router = useRouter();

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Lien invalide</h1>
            <p className="text-gray-300 mb-6">
                Le lien de réinitialisation est invalide ou a expiré.
            </p>
            <Button onClick={() => router.push("/")} variant="default">
                Retour à l'accueil
            </Button>
        </div>
    );
}
