"use client";

import { X, Play, Plus, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface ModalProps {
    movie: any;
    onClose: () => void;
}

export default function Modal({ movie, onClose }: ModalProps) {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 !mt-0 grid place-items-center overflow-y-scroll overflow-x-hidden bg-black/70 p-4 scrollbar-hide">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative w-full max-w-4xl rounded-md bg-[#181818] shadow-2xl overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[#181818] hover:bg-neutral-700 text-white"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="relative aspect-video w-full">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.thumbnailUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

                    <div className="absolute bottom-10 left-10 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-white shadow-md">{movie.title}</h2>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => window.open(movie.videoUrl, '_blank')}
                                className="flex items-center rounded bg-white px-6 py-2 font-bold text-black transition hover:bg-[#e6e6e6]"
                            >
                                <Play className="mr-2 h-6 w-6 fill-black" />
                                Đọc thêm
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition hover:bg-[#181818]/50 hover:border-white">
                                <Plus className="h-6 w-6 text-white" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition hover:bg-[#181818]/50 hover:border-white">
                                <ThumbsUp className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-8 gap-y-4 px-4 py-4 md:px-10 md:py-8">
                    <div className="space-y-4 text-white order-2 md:order-1">
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="font-semibold text-green-460 text-green-500">{movie.match} Match</span>
                            <span className="border border-gray-500 px-1 text-gray-400">HD</span>
                        </div>

                        <p className="text-sm md:text-lg leading-relaxed text-gray-300">
                            {movie.description}
                        </p>
                    </div>

                    <div className="space-y-2 md:space-y-4 text-xs md:text-sm text-gray-400 order-1 md:order-2">
                        <div>
                            <span className="text-gray-500">Genre:</span> {movie.genre}, Social Media, Science
                        </div>
                        <div>
                            <span className="text-gray-500">Language:</span> Vietnamese
                        </div>
                        <div>
                            <span className="text-gray-500">Maturity:</span> Suitable for all audiences
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
