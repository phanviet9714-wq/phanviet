"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

const profiles = [
    { id: 1, name: "Người tò mò", color: "bg-cyan-500", image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" }, // Classic Blue
    { id: 2, name: "Content Creator", color: "bg-zinc-500", image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png" }, // Dark/Gray
    { id: 3, name: "Chuyên gia", color: "bg-red-600", image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png" }, // Red
    { id: 4, name: "Học viên", color: "bg-yellow-500", image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png" }, // Yellow
];

export default function Profiles() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[#141414] text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-normal text-netflix-red font-bebas tracking-wide transition-all duration-300">
                Ai đang xem?
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
                {profiles.map((profile) => (
                    <Link key={profile.id} href="/browse" className="group flex flex-col items-center gap-2 w-24 md:w-32">
                        <div className={`relative h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-md border-2 border-transparent transition-all duration-200 group-hover:border-white group-hover:scale-105`}>
                            {/* Using styles for placeholder colors if images fail to load or as base */}
                            <div
                                className={`h-full w-full ${profile.color} bg-cover bg-center`}
                                style={{ backgroundImage: `url(${profile.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <span className="text-gray-400 group-hover:text-white transition-colors duration-200 text-lg font-normal font-sans">
                            {profile.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
