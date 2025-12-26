import { Price, PriceOption, PricesByCinema } from '@/src/domain/Price';
import { PriceCard } from '../atoms/PriceCard';
import { OptionCard } from '../atoms/SupplementCard';

interface PriceListProps {
    prices: Price[];
    options?: PriceOption[];
    title?: string;
}

export function PriceList({ prices, options, title = "Nos Tarifs" }: PriceListProps) {
    return (
        <div className="space-y-8">
            {/* Titre de la section */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                <div className="h-1 w-20 bg-red-600 rounded"></div>
            </div>

            {/* Prix de base */}
            {prices.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prices.map(price => (
                            <PriceCard key={price.id} price={price} />
                        ))}
                    </div>
                </div>
            )}

            {/* Options qui s'ajoutent */}
            {options && options.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Options (s&apos;ajoutent au tarif de base)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {options.map(option => (
                            <OptionCard key={option.id} option={option} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface CinemaPriceListProps {
    cinemaPrices: PricesByCinema;
}

export function CinemaPriceList({ cinemaPrices }: CinemaPriceListProps) {
    if (cinemaPrices.options.length === 0) {
        return null; // Ne rien afficher si aucune option n'est disponible
    }

    return (
        <div className="border border-[#bcbdbe] bg-[#1b1d23] rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{cinemaPrices.cinemaName}</h2>
                    <div className="h-1 w-20 bg-red-600 rounded"></div>
                </div>
                
                {cinemaPrices.options.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-500 mb-4">Options disponibles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cinemaPrices.options.map(option => (
                                <OptionCard key={option.id} option={option} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
