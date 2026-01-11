import HomeTemplate from "@/src/components/templates/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil - Films à l'affiche",
  description: "Découvrez les films actuellement à l'affiche et à venir dans nos cinémas.",
};

export default function Home() {
    return (
        <HomeTemplate />
    );
}
