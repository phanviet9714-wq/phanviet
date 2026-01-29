"use client";

import { Home, Search, Tv, Film, Plus, Shuffle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { icon: Search, label: "Search", href: "#" },
    { icon: Home, label: "Home", href: "/browse", active: true },
    { icon: Tv, label: "TV Shows", href: "#" },
    { icon: Film, label: "Movies", href: "#" },
    { icon: Shuffle, label: "Latest", href: "#" },
    { icon: Plus, label: "My List", href: "#" },
];

export default function Sidebar() {
    return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-16 flex-col items-center bg-black/50 py-8 backdrop-blur-xl md:w-20 lg:w-24">
            {/* Logo placeholder */}
            <div className="mb-12 text-netflix-red font-bebas text-2xl tracking-widest">N</div>

            <nav className="flex flex-1 flex-col gap-8 md:gap-10">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "group relative flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors",
                            item.active && "text-white"
                        )}
                    >
                        <item.icon className="h-5 w-5 md:h-6 md:w-6 stroke-[1.5]" />
                        {/* Tooltip-ish label for larger screens, or hide if wanting purely iconic */}
                        {/* <span className="hidden text-[10px] uppercase tracking-wider lg:block">{item.label}</span> */}

                        {/* Active Indicator */}
                        {item.active && (
                            <div className="absolute -right-[18px] md:-right-[22px] lg:-right-[30px] top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-md bg-netflix-red" />
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
