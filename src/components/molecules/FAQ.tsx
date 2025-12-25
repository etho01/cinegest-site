import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Quels sont les nouveaux films à l'affiche au cinéma ?",
        answer: "Retrouvez toutes les nouveautés de la semaine depuis la rubrique \"Tous les films à l'affiche\", un bandeau \"Nouveau\" s'affiche sur les affiches des sorties de la semaine."
    },
    {
        question: "Comment savoir si un film est disponible IMAX, 4DX et Dolby dans mon cinéma ?",
        answer: "Pour connaître la liste des films disponibles dans votre cinéma pour chacune des technologies disponibles, rendez-vous sur la page dédiée à l'IMAX, 4DX et Dolby Cinema."
    },
    {
        question: "Pourquoi réserver en ligne ?",
        answer: "En réservant gratuitement un billet sur notre site ou application mobile, vous avez la garantie : de réserver votre fauteuil préféré pour la séance de votre choix, d'accéder rapidement à votre séance en vous rendant directement au point de contrôle muni de votre e-billet et évitez ainsi les files d'attente, de pouvoir annuler gratuitement jusqu'à 15 minutes avant le début de la séance."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vous avez une question ?
            </h2>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                        >
                            <span className="font-semibold text-gray-900 pr-4">
                                {faq.question}
                            </span>
                            <span className="shrink-0 text-gray-500">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>

                        {openIndex === index && (
                            <div className="px-4 pb-4">
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}