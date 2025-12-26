export interface Price {
    id: number;
    name: string;
    description: string;
    amount: number;
}

export interface PriceOption {
    id: number;
    name: string;
    description?: string;
    price: number;
    cinemaId?: number; // Optionnel : si l'option est spécifique à un cinéma
}

export interface PricesByCinema {
    cinemaId: number;
    cinemaName: string;
    options: PriceOption[]; // Options spécifiques au cinéma
}

export interface PricesData {
    generalPrices: Price[]; // Prix de base généraux pour tous les cinémas
    cinemaSpecificPrices?: PricesByCinema[]; // Prix spécifiques par cinéma avec leurs options
}
