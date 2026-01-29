"use client";

import { motion } from "framer-motion";
import { Play, Check, ThumbsUp, ChevronDown } from "lucide-react";
import Image from "next/image";

interface ThumbnailCardProps {
    movie: {
        id: number;
        title: string;
        thumbnailUrl: string;
        genre: string;
        duration: string;
        match: string;
    };
    onClick: () => void;
}

export default function ThumbnailCard({ movie, onClick }: ThumbnailCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -10, zIndex: 50 }}
            transition={{ duration: 0.3 }}
            className="group relative h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] bg-zinc-800 rounded-md overflow-hidden mr-2"
            onClick={onClick}
        >
            <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                fill
                className="rounded-md object-cover transition duration-300 shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
            />

            {/* Expanded Card on Hover (simulated by simple overlay for now, usually a separate portal/layout animation) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-0 sm:group-hover:opacity-100 delay-300 transition duration-200 z-10 bg-zinc-800 p-2 flex flex-col justify-between">
                <div className="relative w-full h-1/2">
                    <Image
                        src={movie.thumbnailUrl}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-t-md"
                    />
                </div>

                <div className="flex flex-col gap-1 p-2">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full hover:bg-neutral-300 transition">
                            <Play className="w-3 h-3 text-black fill-black" />
                        </div>
                        <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full hover:border-white text-white">
                            <Check className="w-3 h-3" />
                        </div>
                        <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full hover:border-white text-white ml-auto">
                            <ChevronDown className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] items-center">
                        <span className="text-green-400 font-semibold">{movie.match} Match</span>
                        <span className="border border-gray-500 px-1 rounded text-gray-300 uppercase">{movie.genre}</span>
                    </div>
                    <p className="text-xs text-white  font-semibold truncate">{movie.title}</p>
                </div>
            </div>
        </motion.div>
    );
}
