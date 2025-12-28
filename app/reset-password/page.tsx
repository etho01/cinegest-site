"use client"
import { useSearchParams } from "next/navigation";
import ResetPasswordCard from "@/src/components/molecules/ResetPasswordCard";
import ResetPasswordHeader from "@/src/components/atoms/ResetPasswordHeader";
import ResetPasswordPageForm from "@/src/components/molecules/ResetPasswordPageForm";
import InvalidLinkMessage from "@/src/components/molecules/InvalidLinkMessage";
import { Header } from "@/src/components/organisms/Header";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    return (
        <>
            <Header />
            {!email || !token ? (
                <ResetPasswordCard>
                    <InvalidLinkMessage />
                </ResetPasswordCard>
            ) : (
                <ResetPasswordCard>
                    <ResetPasswordHeader 
                        title="Réinitialiser votre mot de passe"
                        description="Entrez votre nouveau mot de passe"
                    />
                    <ResetPasswordPageForm email={email} token={token} />
                </ResetPasswordCard>
            )}
        </>
    );
}
