import ProfileTemplate from "@/src/components/templates/ProfileTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Profil",
  description: "Gérez votre compte et vos informations personnelles.",
};

export default function ProfilePage() {
    return <ProfileTemplate />;
}
