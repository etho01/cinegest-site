'use client';

import { useState } from 'react';
import { TicketSelector, TicketSelection, SupplementSelection } from '@/src/components/molecules/TicketSelector';
import { TicketSummary } from '@/src/components/molecules/TicketSummary';
import { MovieSession } from '@/src/domain/Movie';
import { Price, PriceOption } from '@/src/domain/Price';
import Modal from '../atoms/Modal';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: MovieSession;
    prices: Price[];
    sessionOptions?: PriceOption[];
}

export function BookingModal({ isOpen, onClose, session, prices, sessionOptions = [] }: BookingModalProps) {
    const [tickets, setTickets] = useState<TicketSelection[]>([]);
    const [supplements, setSupplements] = useState<SupplementSelection[]>([]);
    const [total, setTotal] = useState(0);

    const handleSelectionChange = (
        newTickets: TicketSelection[],
        newSupplements: SupplementSelection[],
        newTotal: number
    ) => {
        setTickets(newTickets);
        setSupplements(newSupplements);
        setTotal(newTotal);
    };

    const handleConfirm = () => {
        // TODO: Implémenter la logique de réservation
        console.log('Réservation confirmée:', {
            session,
            tickets,
            supplements,
            total
        });
        
        // Pour l'instant, on ferme simplement la modal
        alert(`Réservation confirmée pour un montant de ${total.toFixed(2)}€`);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sélection des tickets */}
                        <div>
                            <TicketSelector
                                prices={prices}
                                sessionOptions={sessionOptions}
                                session={session}
                                onSelectionChange={handleSelectionChange}
                            />
                        </div>

                        {/* Résumé */}
                        <div className="lg:sticky lg:top-24 h-fit">
                            <TicketSummary
                                tickets={tickets}
                                supplements={supplements}
                                total={total}
                                session={session}
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
        </Modal>
    );
}
