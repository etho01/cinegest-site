'use client';

import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { TicketSelector, TicketSelection, SupplementSelection } from '@/src/components/molecules/TicketSelector';
import { TicketSummary } from '@/src/components/molecules/TicketSummary';
import { StripePaymentForm } from '@/src/components/molecules/StripePaymentForm';
import { MovieSession } from '@/src/domain/Movie';
import { Price, PriceOption } from '@/src/domain/Price';
import { createPaymentIntent, confirmBooking } from '@/src/controller/app/BookingController';
import Modal from '../atoms/Modal';

// Initialiser Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: MovieSession;
    prices: Price[];
    sessionOptions?: PriceOption[];
    movieId: number;
    movieTitle?: string;
}

export function BookingModal({ isOpen, onClose, session, prices, sessionOptions = [], movieId, movieTitle }: BookingModalProps) {
    const [tickets, setTickets] = useState<TicketSelection[]>([]);
    const [supplements, setSupplements] = useState<SupplementSelection[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

    const handleSelectionChange = (
        newTickets: TicketSelection[],
        newSupplements: SupplementSelection[],
        newTotal: number
    ) => {
        setTickets(newTickets);
        setSupplements(newSupplements);
        setTotal(newTotal);
    };

    const handleConfirm = async () => {
        if (tickets.length === 0) {
            alert('Veuillez sélectionner au moins un billet');
            return;
        }

        setIsLoading(true);

        try {
            for (let ticket of tickets) {
                ticket['priceAmount'] = parseFloat(ticket['priceAmount'] + '');
            }

            const result = await createPaymentIntent({
                sessionId: session.id,
                items: tickets,
                totalAmount: parseFloat(total.toString()),
            });

            if (result?.data?.clientSecret) {
                setClientSecret(result.data.clientSecret);
                setPaymentIntentId(result.data.paymentIntentId);
                setShowPayment(true);
            } else {
                throw new Error('Impossible de créer l\'intention de paiement');
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'intention de paiement:', error);
            alert('Une erreur est survenue lors de la création du paiement. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentSuccess = async () => {
        if (!paymentIntentId) return;

        setIsLoading(true);
        try {
            await confirmBooking({ paymentIntentId });
            
            // Rediriger vers la page de succès
            window.location.href = `/booking/success?payment_intent=${paymentIntentId}`;
        } catch (error) {
            console.error('Erreur lors de la confirmation de la réservation:', error);
            alert('Le paiement a été effectué mais une erreur est survenue. Veuillez contacter le support.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setShowPayment(false);
        setClientSecret(null);
        setPaymentIntentId(null);
    };

    const handleCloseModal = () => {
        setShowPayment(false);
        setClientSecret(null);
        setPaymentIntentId(null);
        setTickets([]);
        setSupplements([]);
        setTotal(0);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} size="full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {!showPayment && (
                    <>
                        {/* Sélection des tickets */}
                        <div>
                            <TicketSelector
                                prices={prices}
                                sessionOptions={sessionOptions}
                                session={session}
                                onSelectionChange={handleSelectionChange}
                            />
                        </div>

                        {/* Résumé et Paiement */}
                        <div className="lg:sticky lg:top-24 h-fit space-y-6">
                            {/* Résumé */}
                            <TicketSummary
                                tickets={tickets}
                                supplements={supplements}
                                total={total}
                                session={session}
                                onConfirm={!showPayment ? handleConfirm : undefined}
                                onCancel={showPayment ? handleCancel : handleCloseModal}
                                isLoading={isLoading}
                            />
                        </div>
                    </>
                )}

                {/* Formulaire de paiement Stripe */}
                {showPayment && clientSecret && (
                    <div className="bg-white border border-gray-700 rounded-lg p-6 col-span-2">
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripePaymentForm
                                onSuccess={handlePaymentSuccess}
                                onCancel={handleCancel}
                                amount={total}
                            />
                        </Elements>
                    </div>
                )}
            </div>
        </Modal>
    );
}
