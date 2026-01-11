import { Header } from '@/src/components/organisms/Header';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réservation Confirmée',
  description: 'Votre réservation a été confirmée avec succès.',
};

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700 rounded-lg p-8 mb-6">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Réservation confirmée !
                        </h1>
                        <p className="text-gray-300 mb-6">
                            Votre paiement a été effectué avec succès. Vous allez recevoir un email de confirmation avec vos billets.
                        </p>
                        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-400">
                                Vos billets électroniques ont été envoyés à votre adresse email.
                                Présentez-les à l'entrée du cinéma ou sur votre smartphone.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/reservations"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Voir mes réservations
                        </Link>
                        <Link 
                            href="/"
                            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
