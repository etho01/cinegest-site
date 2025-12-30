# Configuration du Paiement Stripe

## Installation

Les packages Stripe ont été installés :
- `stripe` : SDK serveur
- `@stripe/stripe-js` : SDK client

## Configuration des Variables d'Environnement

1. Créez un fichier `.env.local` à la racine du projet (copier depuis `.env.local.example`)

2. Ajoutez vos clés Stripe (disponibles sur [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)) :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# URL de base de l'application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

⚠️ **Important** : 
- En développement, utilisez les clés de test (`sk_test_...` et `pk_test_...`)
- En production, utilisez les clés live (`sk_live_...` et `pk_live_...`)
- Ne commitez JAMAIS le fichier `.env.local`

## Flux de Paiement

1. **Sélection des billets** : L'utilisateur choisit ses billets et options dans `BookingModal`
2. **Création de la session** : Appel à `createCheckoutSession` qui crée une session Stripe
3. **Redirection** : L'utilisateur est redirigé vers Stripe Checkout
4. **Paiement** : L'utilisateur effectue le paiement sur Stripe
5. **Retour** :
   - **Succès** : Redirection vers `/booking/success`
   - **Annulation** : Redirection vers `/booking/cancelled`

## Pages de Retour

- `/booking/success` : Confirmation de réservation
- `/booking/cancelled` : Annulation de la réservation

## Test en Mode Test

Pour tester les paiements en mode test, utilisez ces numéros de carte :

**Carte valide** :
- Numéro : `4242 4242 4242 4242`
- Date : n'importe quelle date future
- CVC : n'importe quel 3 chiffres
- Code postal : n'importe lequel

**Carte refusée** :
- Numéro : `4000 0000 0000 0002`

Plus de cartes de test : [Documentation Stripe](https://stripe.com/docs/testing)

## Webhooks (À implémenter)

Pour finaliser l'intégration, il faudra mettre en place des webhooks Stripe pour :
- Enregistrer la réservation en base de données après paiement réussi
- Envoyer les billets par email
- Gérer les remboursements

Endpoint suggéré : `/api/webhooks/stripe`

## Structure des Fichiers

```
src/
├── lib/
│   └── stripe.ts                    # Configuration Stripe
├── domain/
│   └── Booking.ts                   # Types de réservation
├── controller/app/
│   └── BookingController.ts         # Action serveur pour Stripe
└── components/
    └── molecules/
        ├── BookingModal.tsx         # Modal de réservation
        └── TicketSummary.tsx        # Récapitulatif

app/
└── booking/
    ├── success/page.tsx             # Page de succès
    └── cancelled/page.tsx           # Page d'annulation
```
