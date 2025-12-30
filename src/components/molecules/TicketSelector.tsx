'use client';

import { useState, useEffect } from 'react';
import { Price, PriceOption } from '@/src/domain/Price';
import { MovieSession } from '@/src/domain/Movie';

export interface TicketSelection {
    priceId: number;
    priceName: string;
    priceAmount: number;
    quantity: number;
}

export interface SupplementSelection {
    optionId: number;
    optionName: string;
    optionPrice: number;
    quantity: number;
}

interface TicketSelectorProps {
    prices: Price[];
    sessionOptions?: PriceOption[];
    session?: MovieSession;
    onSelectionChange?: (tickets: TicketSelection[], supplements: SupplementSelection[], total: number) => void;
}

export function TicketSelector({ prices, sessionOptions = [], session, onSelectionChange }: TicketSelectorProps) {
    const [ticketQuantities, setTicketQuantities] = useState<Record<number, number>>({});
    const [supplementQuantities, setSupplementQuantities] = useState<Record<number, number>>({});

    const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);

    // Calculer le coût total des options de séance (obligatoires pour tous les billets)
    const sessionOptionsTotal = sessionOptions.reduce((sum, option) => sum + option.price, 0);

    // Calculer le total
    const calculateTotal = () => {
        let total = 0;
        
        // Prix des tickets + options de séance obligatoires
        prices.forEach(price => {
            const quantity = ticketQuantities[price.id] || 0;
            // Le prix de base + les options de séance s'appliquent à chaque billet
            total += ( parseFloat(price.amount.toString()) + parseFloat(sessionOptionsTotal.toString())) * quantity;
        });

        return total;
    };

    const total = calculateTotal();

    // Notifier le parent du changement
    useEffect(() => {
        if (onSelectionChange) {
            const tickets: TicketSelection[] = prices
                .filter(price => ticketQuantities[price.id] > 0)
                .map(price => ({
                    priceId: price.id,
                    priceName: price.name,
                    priceAmount: price.amount + sessionOptionsTotal, // Prix incluant les options de séance
                    quantity: ticketQuantities[price.id]
                }));

            // Les options de séance ne sont plus des suppléments séparés
            const supplements: SupplementSelection[] = [];

            onSelectionChange(tickets, supplements, total);
        }
    }, [ticketQuantities, total, sessionOptionsTotal]);

    const handleTicketQuantityChange = (priceId: number, change: number) => {
        setTicketQuantities(prev => {
            const newQuantity = Math.max(0, (prev[priceId] || 0) + change);
            return { ...prev, [priceId]: newQuantity };
        });
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            {/* Section Tarifs */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Sélectionnez vos places</h3>
                <div className="space-y-3">
                    {prices.map(price => (
                        <div
                            key={price.id}
                            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white">{price.name}</h4>
                                    <p className="text-sm text-gray-400">{price.description}</p>
                                </div>
                                <div className="text-lg font-bold text-red-500">
                                    {formatPrice(parseFloat(price.amount.toString()) + parseFloat(sessionOptionsTotal.toString()))}
                                </div>
                            </div>
                            
                            {/* Contrôles de quantité */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleTicketQuantityChange(price.id, -1)}
                                    disabled={!ticketQuantities[price.id]}
                                    className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold transition flex items-center justify-center"
                                >
                                    −
                                </button>
                                <div className="w-16 text-center">
                                    <span className="text-2xl font-bold text-white">
                                        {ticketQuantities[price.id] || 0}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleTicketQuantityChange(price.id, 1)}
                                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Résumé total */}
            {totalTickets > 0 && (
                <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                {totalTickets} place{totalTickets > 1 ? 's' : ''}
                            </p>
                            <p className="text-2xl font-bold text-white">Total</p>
                        </div>
                        <div className="text-4xl font-bold text-red-500">
                            {formatPrice(total)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
