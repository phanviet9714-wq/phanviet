"use client";

import { PROFILES, useProfile } from "@/components/ProfileContext";
import { useRouter } from "next/navigation";

export default function Profiles() {
    const { setProfile } = useProfile();
    const router = useRouter();

    const handleProfileSelect = (id: number) => {
        setProfile(id as any);
        router.push("/browse");
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[#141414] text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-normal text-netflix-red font-bebas tracking-wide transition-all duration-300">
                Ai đang xem?
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
                {Object.values(PROFILES).map((profile) => (
                    <div
                        key={profile.id}
                        onClick={() => handleProfileSelect(profile.id)}
                        className="group flex flex-col items-center gap-2 w-24 md:w-32 cursor-pointer"
                    >
                        <div className={`relative h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-md border-2 border-transparent transition-all duration-200 group-hover:border-white group-hover:scale-105`}>
                            <div
                                className={`h-full w-full ${profile.color} bg-cover bg-center`}
                                style={{ backgroundImage: `url(${profile.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <span className="text-gray-400 group-hover:text-white transition-colors duration-200 text-lg font-normal font-sans">
                            {profile.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
