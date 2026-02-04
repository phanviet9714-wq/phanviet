"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ProfileId = 1 | 2 | 3 | 4;

export interface Profile {
    id: ProfileId;
    name: string;
    color: string;       // For profile icon background
    image: string;       // For profile icon image
    accentColor: string; // For buttons (Play, More Info)
    greeting: string;    // Personalized greeting
}

export const PROFILES: Record<ProfileId, Profile> = {
    1: {
        id: 1,
        name: "Người tò mò",
        color: "bg-cyan-500",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
        accentColor: "bg-cyan-600 hover:bg-cyan-700",
        greeting: "Chào Người tò mò, bạn muốn khám phá điều gì?"
    },
    2: {
        id: 2,
        name: "Content Creator",
        color: "bg-zinc-500",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
        accentColor: "bg-zinc-600 hover:bg-zinc-700",
        greeting: "Chào Content Creator, hôm nay viết gì nào?"
    },
    3: {
        id: 3,
        name: "Chuyên gia",
        color: "bg-red-600",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png",
        accentColor: "bg-red-600 hover:bg-red-700",
        greeting: "Chào Chuyên gia, welcome back."
    },
    4: {
        id: 4,
        name: "Học viên",
        color: "bg-yellow-500",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png",
        accentColor: "bg-yellow-500 hover:bg-yellow-400 text-black",
        greeting: "Chào Học viên, tiếp tục bài học nhé."
    },
};

interface ProfileContextType {
    currentProfile: Profile;
    setProfile: (id: ProfileId) => void;
    isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [activeProfileId, setActiveProfileId] = useState<ProfileId>(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load from localStorage on mount
        const saved = localStorage.getItem('profileId');
        if (saved) {
            const id = parseInt(saved) as ProfileId;
            if (PROFILES[id]) setActiveProfileId(id);
        }
        setIsLoading(false);
    }, []);

    const setProfile = (id: ProfileId) => {
        setActiveProfileId(id);
        localStorage.setItem('profileId', id.toString());
    };

    return (
        <ProfileContext.Provider value={{ currentProfile: PROFILES[activeProfileId], setProfile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
