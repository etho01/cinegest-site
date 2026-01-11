import { Header } from '@/src/components/organisms/Header';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réservation Annulée',
  description: 'Votre réservation a été annulée.',
};

export default function BookingCancelledPage() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-700 rounded-lg p-8 mb-6">
                        <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Réservation annulée
                        </h1>
                        <p className="text-gray-300 mb-6">
                            Votre réservation a été annulée. Aucun paiement n'a été effectué.
                        </p>
                        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-400">
                                Vous pouvez retourner à la page du film pour sélectionner une autre séance ou modifier votre réservation.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
