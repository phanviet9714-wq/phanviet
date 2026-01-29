"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-colors duration-300 ease-in-out px-4 md:px-16 py-4 flex items-center justify-between",
                isScrolled ? "bg-netflix-black bg-opacity-90" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
            )}
        >
            <div className="flex items-center space-x-8">
                <Link href="/" className="text-netflix-red text-2xl md:text-3xl font-bold uppercase cursor-pointer mr-6 font-bebas tracking-wider">
                    PHAN VIET
                </Link>
                <div className="hidden md:flex space-x-5 text-sm font-medium text-gray-300">
                    <Link href="/" className="text-white font-bold cursor-default">Home</Link>
                    <Link href="https://www.facebook.com/cuoi.thu.5" target="_blank" className="hover:text-gray-400 transition">Facebook</Link>
                    <Link href="https://phanviet.substack.com/" target="_blank" className="hover:text-gray-400 transition">Substack</Link>
                    <Link href="https://padlet.com/conan_group/phan-vi-t-nh-ng-s-n-ph-m-m-t-i-t-o-ra-6kcueklaqietgmkz" target="_blank" className="hover:text-gray-400 transition">Tài nguyên</Link>
                    <Link href="https://padlet.com/conan_group/viral-content-testimonials-8lvtmjec317ngmer" target="_blank" className="hover:text-gray-400 transition">Review</Link>
                    <Link href="https://padlet.com/conan_group/about-phan-vi-t-uou1u3b7nqji5fmy" target="_blank" className="hover:text-gray-400 transition">Cá nhân</Link>
                </div>
            </div>

            <div className="flex items-center space-x-4 text-white">
                <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                <div className="w-8 h-8 rounded bg-blue-600 cursor-pointer"></div> {/* Profile Placeholder */}
            </div>
        </nav>
    );
}
