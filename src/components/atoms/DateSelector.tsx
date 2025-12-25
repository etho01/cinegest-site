'use client';

import { useRef, useState } from 'react';
import { Calendar } from './Calendar';

interface DateSelectorProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    // Générer les 14 prochains jours
    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayNames = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
            const monthNames = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
                'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

            dates.push({
                value: date.toISOString().split('T')[0],
                dayName: dayNames[date.getDay()],
                dayNumber: date.getDate(),
                month: monthNames[date.getMonth()],
                isToday: i === 0,
                isTomorrow: i === 1,
                fullDate: date
            });
        }

        return dates;
    };

    const dates = generateDates();

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className="mt-4 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                        Quand ?
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowCalendar(true)}
                            className="px-3 py-1.5 flex items-center gap-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                            aria-label="Ouvrir le calendrier"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Calendrier
                        </button>
                        <button
                            onClick={() => scroll('left')}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white transition"
                            aria-label="Précédent"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white transition"
                            aria-label="Suivant"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide gap-3 pb-2"
                >
                    {dates.map((date) => (
                        <button
                            key={date.value}
                            onClick={() => onDateChange(date.value)}
                            className={`shrink-0 min-w-[90px] px-4 py-3 rounded-lg border-2 transition-all duration-200 ${selectedDate === date.value
                                    ? 'bg-red-600 border-red-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-900 border-gray-700 text-gray-200 hover:border-red-500 hover:shadow-md'
                                }`}
                        >
                            <div className="text-center">
                                {date.isToday ? (
                                    <div className="font-bold text-sm mb-1">Aujourd&apos;hui</div>
                                ) : date.isTomorrow ? (
                                    <div className="font-bold text-sm mb-1">Demain</div>
                                ) : (
                                    <div className={`text-xs uppercase mb-1 ${selectedDate === date.value ? 'text-white/90' : 'text-gray-400'
                                        }`}>
                                        {date.dayName}
                                    </div>
                                )}
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-2xl font-bold">{date.dayNumber}</span>
                                    <span className={`text-xs ${selectedDate === date.value ? 'text-white/80' : 'text-gray-400'
                                        }`}>
                                        {date.month}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {showCalendar && (
                <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={onDateChange}
                    onClose={() => setShowCalendar(false)}
                />
            )}
        </>
    );
}