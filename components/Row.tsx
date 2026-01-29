"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThumbnailCard from "./ThumbnailCard";

interface RowProps {
    title: string;
    movies: Array<{
        id: number;
        title: string;
        thumbnailUrl: string;
        genre: string;
        duration: string;
        match: string;
    }>;
    onMovieSelect: (movie: any) => void;
}

export default function Row({ title, movies, onMovieSelect }: RowProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: "left" | "right") => {
        setIsMoved(true);

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-0.5 md:space-y-2 px-4 md:px-16 my-8">
            <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>
            <div className="group relative md:-ml-2">
                <ChevronLeft
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 hidden md:block ${!isMoved && "hidden"
                        }`}
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 no-scrollbar"
                >
                    {movies.map((movie) => (
                        <ThumbnailCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => onMovieSelect(movie)}
                        />
                    ))}
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 hidden md:block"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}
