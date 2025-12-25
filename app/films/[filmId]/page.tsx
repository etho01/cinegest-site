'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/src/components/organisms/Header';
import { MovieDetailTemplate } from '@/src/components/templates/MovieDetailTemplate';
import { MovieWithSessions } from '@/src/domain/Movie';
import { Cinema } from '@/src/domain/Cinema';

interface MovieDetailPageProps {
  params: {
    filmId: string;
  };
}

// Données de démonstration - À remplacer par de vraies données d'API
const mockMovie: MovieWithSessions = {
  id: "1",
  title: "Avatar : de feu et de cendres",
  posterUrl: "https://media.pathe.fr/movie/alex/HO00001189/poster/md/19/movie&uuid=B26F57C5-9286-4479-A610-2B07C66A4B24",
  logoUrl: "https://media.pathe.fr/movie/11387/logo-title/fr/238567/lg/2/logo-titre-france-rvb-av3v2.png",
  releaseDate: "17 déc. 2025",
  duration: "3h17",
  genres: ["Science fiction"],
  director: "James Cameron",
  cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  rating: 9,
  ratingCount: 9,
  ageRating: "Tous publics",
  warning: "Le climat de guerre et de nombreuses scènes violentes peuvent heurter un jeune public.",
  sessions: [
    {
      id: "s1",
      movieId: "1",
      cinemaId: "1",
      datetime: "2025-12-25T14:30:00",
      price: 12.50,
      technology: "IMAX",
      language: "VF",
      availableSeats: 45,
      totalSeats: 200
    },
    {
      id: "s2",
      movieId: "1", 
      cinemaId: "1",
      datetime: "2025-12-25T18:00:00",
      price: 10.50,
      technology: "Standard",
      language: "VOST",
      availableSeats: 32,
      totalSeats: 150
    },
    {
      id: "s3",
      movieId: "1",
      cinemaId: "2", 
      datetime: "2025-12-25T20:30:00",
      price: 11.00,
      technology: "Dolby",
      language: "VF",
      availableSeats: 78,
      totalSeats: 180
    },
    {
      id: "s4",
      movieId: "1",
      cinemaId: "1",
      datetime: "2025-12-26T16:15:00",
      price: 12.50,
      technology: "IMAX",
      language: "VF", 
      availableSeats: 23,
      totalSeats: 200
    }
  ]
};

const mockCinemas: Cinema[] = [
  {
    id: 1,
    name: "Pathé Bellecour",
    address: "5 Rue de Brest",
    postal_code: "69002",
    city: "Lyon",
    country: "France"
  },
  {
    id: 2,
    name: "Pathé Vaise",
    address: "47 Avenue Rosa Parks",
    postal_code: "69009", 
    city: "Lyon",
    country: "France"
  },
  {
    id: 3,
    name: "Pathé Carré de Soie",
    address: "Rue des Frères Lumière",
    postal_code: "69120",
    city: "Vaulx-en-Velin",
    country: "France"
  }
];

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const [movie, setMovie] = useState<MovieWithSessions | null>(null);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    // TODO: Remplacer par de vraies calls API
    setTimeout(() => {
      setMovie(mockMovie);
      setCinemas(mockCinemas);
      setLoading(false);
    }, 500);
  }, [params.filmId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Film non trouvé</h1>
          <p className="text-gray-600">Le film que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <MovieDetailTemplate movie={movie} cinemas={cinemas} />
    </div>
  );
}