'use client';

import { TicketSelection, SupplementSelection } from './TicketSelector';
import { MovieSession } from '@/src/domain/Movie';

interface TicketSummaryProps {
    tickets: TicketSelection[];
    supplements: SupplementSelection[];
    total: number;
    session?: MovieSession;
    onConfirm?: () => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function TicketSummary({ tickets, supplements, total, session, onConfirm, onCancel, isLoading = false }: TicketSummaryProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const formatDateTime = (datetime: string) => {
        const date = new Date(datetime);
        return {
            date: date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

    if (totalTickets === 0) {
        return null;
    }

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-6">
            {/* Informations de la séance */}
            {session && (
                <div className="pb-4 border-b border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-2">Votre séance</h3>
                    <div className="text-gray-400 space-y-1">
                        <p className="capitalize">{formatDateTime(session.startTime).date}</p>
                        <p className="text-2xl font-bold text-red-500">
                            {formatDateTime(session.startTime).time}
                        </p>
                        {session.options && session.options.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {session.options.map(option => (
                                    option.publicName && (
                                        <span
                                            key={option.id}
                                            className="px-2 py-1 rounded text-xs font-bold bg-white text-black"
                                        >
                                            {option.publicName}
                                        </span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Détail des billets */}
            <div>
                <h3 className="text-lg font-bold text-white mb-3">Vos billets</h3>
                {session && session.options && session.options.length > 0 && (
                    <div className="mb-3 text-xs text-blue-400">
                        Prix incluant les options de séance
                    </div>
                )}
                <div className="space-y-2">
                    {tickets.map(ticket => (
                        <div key={ticket.priceId} className="flex justify-between items-center text-gray-300">
                            <div>
                                <span className="font-medium">{ticket.quantity}x</span>
                                <span className="ml-2">{ticket.priceName}</span>
                            </div>
                            <div className="font-semibold">
                                {formatPrice(parseFloat(ticket.priceAmount.toString()) * ticket.quantity)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">
                            {totalTickets} place{totalTickets > 1 ? 's' : ''}
                        </p>
                        <p className="text-xl font-bold text-white">Total</p>
                    </div>
                    <div className="text-3xl font-bold text-red-500">
                        {formatPrice(total)}
                    </div>
                </div>
            </div>

            {/* Actions */}
            {(onConfirm || onCancel) && (
                <div className="flex gap-3 pt-2">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            {onConfirm ? 'Annuler' : 'Retour'}
                        </button>
                    )}
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            disabled={isLoading || tickets.length === 0}
                            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Préparation...
                                </>
                            ) : (
                                'Continuer'
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
