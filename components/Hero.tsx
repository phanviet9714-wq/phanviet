"use client";

import { Info, Play } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/lib/data";

interface HeroProps {
    movie: Movie | null;
}

export default function Hero({ movie }: HeroProps) {
    // If no movie data (e.g. CSV empty), show a skeleton or nothing
    if (!movie) return <div className="h-[70vh] w-full bg-zinc-900 animate-pulse"></div>;

    return (
        <div className="relative h-[80vh] w-full bg-zinc-900">
            {/* Background Image/Video */}
            <div className="absolute top-0 left-0 w-full h-full">
                <Image
                    src={movie.thumbnailUrl} // Ideally should be a wider "backdrop" image
                    alt={movie.title}
                    fill
                    className="object-cover object-top opacity-60"
                    priority
                />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#141414] to-transparent" />

            <div className="absolute top-[20%] md:top-[25%] left-4 md:left-12 lg:left-16 w-full md:w-[45%] lg:w-[40%] space-y-6 z-30">
                {/* Title (Always Text) */}
                <h1 className="text-6xl md:text-8xl font-normal text-white drop-shadow-lg font-bebas tracking-wide uppercase leading-[0.9] text-shadow-lg">
                    {movie.title}
                </h1>

                {/* Metadata Row (IMDb, Streams, Season) */}
                <div className="flex items-center space-x-4 text-sm md:text-base font-semibold text-white/90">
                    <div className="flex items-center gap-1">
                        <span className="bg-[#F5C518] text-black px-1.5 py-0.5 rounded textxs font-bold">Conan School</span>
                        <span>{movie.imdbRating}</span>
                    </div>
                    {/* Hardcoded as requested */}
                    <span className="text-green-400">Social Content Mentor</span>

                    <span className="border border-gray-400 px-2 rounded text-xs">{movie.year}</span>
                    <span className="bg-red-600 px-2 rounded text-xs">HD</span>
                </div>

                <p className="text-white text-base md:text-lg drop-shadow-sm line-clamp-3 text-gray-200">
                    {movie.description}
                </p>

                <div className="flex items-center space-x-3 pt-2">
                    <button
                        onClick={() => window.open("https://www.facebook.com/cuoi.thu.5", "_blank")}
                        className="bg-netflix-red text-white px-8 py-3 rounded md:rounded-md font-bold flex items-center hover:bg-opacity-80 transition transform hover:scale-105"
                    >
                        <Play className="w-5 h-5 mr-3 fill-white" />
                        Liên hệ
                    </button>
                    <button
                        onClick={() => window.open("https://www.conan.school/", "_blank")}
                        className="bg-gray-500/40 backdrop-blur-sm text-white px-8 py-3 rounded md:rounded-md font-bold flex items-center hover:bg-gray-500/40 transition transform hover:scale-105"
                    >
                        Xem khóa học
                    </button>
                </div>
            </div>
        </div>
    );
}
