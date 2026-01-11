'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CinemaContextType {
    selectedCinemaId: number | undefined;
    setSelectedCinemaId: (cinemaId: number | undefined) => void;
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

const CINEMA_COOKIE_NAME = 'selected_cinema_id';
const COOKIE_EXPIRY_DAYS = 30;

// Helpers pour gérer les cookies côté client
function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function CinemaProvider({ children }: { children: ReactNode }) {
    const [selectedCinemaId, setSelectedCinemaIdState] = useState<number | undefined>(undefined);
    const [isInitialized, setIsInitialized] = useState(false);

    // Charger le cinéma sélectionné depuis le cookie au montage
    useEffect(() => {
        const savedCinemaId = getCookie(CINEMA_COOKIE_NAME);
        if (savedCinemaId) {
            setSelectedCinemaIdState(parseInt(savedCinemaId, 10));
        }
        setIsInitialized(true);
    }, []);

    const setSelectedCinemaId = (cinemaId: number | undefined) => {
        setSelectedCinemaIdState(cinemaId);
        
        if (cinemaId !== undefined) {
            setCookie(CINEMA_COOKIE_NAME, cinemaId.toString(), COOKIE_EXPIRY_DAYS);
        } else {
            deleteCookie(CINEMA_COOKIE_NAME);
        }
    };

    return (
        <CinemaContext.Provider value={{ selectedCinemaId, setSelectedCinemaId }}>
            {children}
        </CinemaContext.Provider>
    );
}

export function useCinema() {
    const context = useContext(CinemaContext);
    if (context === undefined) {
        throw new Error('useCinema must be used within a CinemaProvider');
    }
    return context;
}
