import PriceTemplate from "@/src/components/templates/PriceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Consultez nos tarifs pour les billets de cinéma et les suppléments.",
};

export default function PricePage() {
    return (
        <PriceTemplate />
    );
}
