// Ce fichier n'est plus utilisé côté frontend
// La gestion de Stripe est maintenant déléguée à l'API backend
// Si vous avez besoin d'utiliser Stripe côté serveur backend, utilisez ce code là-bas

/*
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
});
*/
