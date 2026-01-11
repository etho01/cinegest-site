"use client";
import { Cinema } from "@/src/domain/Cinema";
import { Select } from "../atoms/Select";
import { useCinema } from "@/src/context/CinemaContext";
import { useRouter } from "next/navigation";

interface ListCinemaProps {
    cinemas: Cinema[];
}

export const ListCinema = ({ cinemas }: ListCinemaProps) => {
    const { selectedCinemaId, setSelectedCinemaId } = useCinema();
    const router = useRouter();

    if (cinemas.length === 1) 
    {
        return null;
    }

    const handleCinemaChange = (cinemaId : number | undefined) => {
        setSelectedCinemaId(cinemaId);
        // Rafraîchir la page pour recharger les données avec le nouveau cinéma
        router.refresh();
    };

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            minHeight: 40,
            cursor: "pointer",
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: 0,
        }),
        singleValue: (base: any) => ({
            ...base,
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: "#1f1f1f",
            borderRadius: 12,
            overflow: "hidden",
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused ? "#2b2b2b" : "transparent",
            color: "#fff",
            cursor: "pointer",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: (base: any) => ({
            ...base,
            paddingLeft: 10,
            paddingRight: 0,
            color: "#a3a3a3",
        }),
    };

    const selectedCinema = selectedCinemaId ? cinemas.find(c => c.id === selectedCinemaId) : null;
    const selectedValue = selectedCinema ? selectedCinema.id : null;


    return (
        <div 
            className="max-w-7xl mx-auto bg-[#1b1d23] rounded-lg mt-5 border-[#bcbdbe] group border border-opacity-10 py-2">
            
            <Select
                styles={selectStyles}
                placeholder="Selectionner un cinéma"
                value={selectedValue}
                onChange={handleCinemaChange}
                isClearable
                options={
                    cinemas.map(cinema => ({
                        value: cinema.id,
                        label: cinema.name + ' - ' + cinema.city,
                    }))
                }
                className="text-white px-2"
            />
        </div>
    );
}