import { PriceOption } from '@/src/domain/Price';

interface OptionCardProps {
    option: PriceOption;
}

export function OptionCard({ option }: OptionCardProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="bg-[#1b1d23] border border-[#bcbdbe] rounded-lg p-4 hover:bg-[#2c2f38] transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{option.name}</h4>
                    {option.description && (
                        <p className="text-sm text-gray-200">{option.description}</p>
                    )}
                </div>
                <div className="text-lg font-bold text-red-600 ml-4">
                    +{formatPrice(option.price)}
                </div>
            </div>
        </div>
    );
}
