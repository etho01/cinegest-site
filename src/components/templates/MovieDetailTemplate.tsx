'use client';

import { useState } from 'react';
import { MovieHero } from '@/src/components/molecules/MovieHero';
import { DateSelector } from '@/src/components/atoms/DateSelector';
import { CinemaSessions } from '@/src/components/molecules/CinemaSessions';
import { FAQ } from '@/src/components/molecules/FAQ';
import { BookingModal } from '@/src/components/molecules/BookingModal';
import { MovieWithSessions, MovieSession } from '@/src/domain/Movie';
import { Cinema } from '@/src/domain/Cinema';
import { Price, PriceOption } from '@/src/domain/Price';
import { ListCinema } from '../molecules/ListCinema';
import { Header } from '../organisms/Header';

interface MovieDetailTemplateProps {
    movie: MovieWithSessions;
    cinemas: Cinema[];
    prices: Price[];
}

export function MovieDetailTemplate({ movie, cinemas, prices }: MovieDetailTemplateProps) {
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [selectedSession, setSelectedSession] = useState<MovieSession | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const handleSessionClick = (session: MovieSession) => {
        setSelectedSession(session);
        setIsBookingModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedSession(null);
    };

    // Récupérer les options de la session sélectionnée
    const sessionOptions: PriceOption[] = selectedSession?.options?.map(opt => ({
        id: opt.id,
        name: opt.publicName || 'Option',
        price: opt.price,
        description: undefined
    })) || [];

    return (
        <>
            <Header />
            {/* Hero section avec détails du film */}
            <MovieHero movie={movie} />

            {/* Section principale */}
            <div className="container mx-auto px-4 py-8">

                <ListCinema cinemas={cinemas} />
                
                {/* Sélecteur de date */}
                <DateSelector
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />

                {/* Section séances */}
                <div className="mb-12" id="sessions">
                    <h2 className="text-2xl font-bold text-white mb-6">Trouvez des séances</h2>
                    
                    <CinemaSessions
                        cinemas={cinemas}
                        sessions={movie.sessions}
                        selectedDate={selectedDate}
                        onSessionClick={handleSessionClick}
                    />
                </div>

                {/* FAQ */}
                <FAQ />
            </div>

            {/* Modal de réservation */}
            {selectedSession && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={handleCloseBookingModal}
                    session={selectedSession}
                    prices={prices}
                    sessionOptions={sessionOptions}
                />
            )}
        </>
    );
}