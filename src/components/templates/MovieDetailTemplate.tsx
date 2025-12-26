'use client';

import { useState } from 'react';
import { MovieHero } from '@/src/components/molecules/MovieHero';
import { DateSelector } from '@/src/components/atoms/DateSelector';
import { CinemaSessions } from '@/src/components/molecules/CinemaSessions';
import { FAQ } from '@/src/components/molecules/FAQ';
import { MovieWithSessions } from '@/src/domain/Movie';
import { Cinema } from '@/src/domain/Cinema';
import { ListCinema } from '../molecules/ListCinema';
import { Header } from '../organisms/Header';

interface MovieDetailTemplateProps {
    movie: MovieWithSessions;
    cinemas: Cinema[];
}

export function MovieDetailTemplate({ movie, cinemas }: MovieDetailTemplateProps) {
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );


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
                    />
                </div>

                {/* FAQ */}
                <FAQ />
            </div>
        </>
    );
}