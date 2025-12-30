'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    amount: number;
}

export function StripePaymentForm({ onSuccess, onCancel, amount }: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/booking/success`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'Une erreur est survenue lors du paiement');
                setIsProcessing(false);
            } else {
                // Paiement réussi
                onSuccess();
            }
        } catch (err) {
            setErrorMessage('Une erreur inattendue est survenue');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">💳 Informations de paiement</h3>
                <div className="bg-white p-4 rounded-lg">
                    <PaymentElement />
                </div>
            </div>

            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    ⚠️ {errorMessage}
                </div>
            )}

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                    Retour
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Paiement en cours...
                        </>
                    ) : (
                        `🔒 Payer ${amount.toFixed(2)} €`
                    )}
                </button>
            </div>
        </form>
    );
}
