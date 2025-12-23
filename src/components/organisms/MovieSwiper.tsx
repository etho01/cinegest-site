'use client';

import { Movie } from "@/src/domain/Movie";
import { MovieCard } from "../atoms/MovieCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MovieSwiperProps {
    title: string;
    movies: Movie[];
}

export function MovieSwiper({ title, movies }: MovieSwiperProps) {
    return (
        <section className="py-8 px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{title}</h2>
            
            <div className="relative movie-swiper-container">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={2}
                    navigation
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true 
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 24,
                        },
                    }}
                    className="pb-12"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .movie-swiper-container .swiper-button-next,
                .movie-swiper-container .swiper-button-prev {
                    color: #dc2626;
                    background: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }

                .movie-swiper-container .swiper-button-next:after,
                .movie-swiper-container .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }

                .movie-swiper-container .swiper-button-next:hover,
                .movie-swiper-container .swiper-button-prev:hover {
                    background: #dc2626;
                    color: white;
                }

                .movie-swiper-container .swiper-pagination-bullet {
                    background: #dc2626;
                    opacity: 0.5;
                }

                .movie-swiper-container .swiper-pagination-bullet-active {
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .movie-swiper-container .swiper-button-next,
                    .movie-swiper-container .swiper-button-prev {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
}
