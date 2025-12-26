import { getPrices } from "@/src/application/useCases/price/getPrices";
import { PriceRepositoryImpl } from "@/src/infrastructure/repositories/PriceRepositoryImpl";
import { Header } from "../organisms/Header";
import { PriceList, CinemaPriceList } from "../molecules/PriceList";

export default async function PriceTemplate() {
    const pricesData = await getPrices(PriceRepositoryImpl);

    return (
        <>
            <Header page="prix" />
            
            <main className="min-h-screen bg-linear-to-b ">
                <div className="container mx-auto px-4 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Nos Tarifs</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Découvrez nos tarifs de base et les options disponibles
                        </p>
                    </div>

                    {/* Tarifs généraux */}
                    <div className="mb-16">
                        <PriceList
                            title="Tarifs Généraux"
                            prices={pricesData.generalPrices}
                        />
                    </div>

                    {/* Tarifs spécifiques par cinéma */}
                    {pricesData.cinemaSpecificPrices && pricesData.cinemaSpecificPrices.length > 0 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Tarifs par Cinéma</h2>
                                <div className="h-1 w-20 bg-red-600 rounded"></div>
                                <p className="text-gray-300 mt-4 mb-8">
                                    Certains cinémas proposent des tarifs spécifiques
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8">
                                {pricesData.cinemaSpecificPrices.map(cinemaPrices => (
                                    <CinemaPriceList key={cinemaPrices.cinemaId} cinemaPrices={cinemaPrices} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer info */}
                    <div className="mt-16 text-center">
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 max-w-3xl mx-auto">
                            <p className="text-sm text-gray-300">
                                * Les prix sont indiqués en euros TTC. 
                                Les tarifs peuvent varier selon les séances et les options choisies.
                                Pour plus d&apos;informations, n&apos;hésitez pas à nous contacter.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
