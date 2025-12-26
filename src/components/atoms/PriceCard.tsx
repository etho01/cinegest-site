import { Price } from '@/src/domain/Price';

interface PriceCardProps {
    price: Price;
}

export function PriceCard({ price }: PriceCardProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="border border-[#bcbdbe] bg-[#1b1d23] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="border-b border-[#bcbdbe] pb-4 mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{price.name}</h3>
                <p className="text-sm text-gray-500">{price.description}</p>
            </div>

            {/* Prix principal */}
            <div className="mb-4">
                <div className="text-3xl font-bold text-red-600">
                    {formatPrice(price.amount)}
                </div>
            </div>
        </div>
    );
}
