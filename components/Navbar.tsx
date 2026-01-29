"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-colors duration-300 ease-in-out px-4 md:px-16 py-4 flex items-center justify-between",
                isScrolled ? "bg-netflix-black bg-opacity-90" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
            )}
        >
            <div className="flex items-center space-x-8">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden cursor-pointer text-white" onClick={toggleMobileMenu}>
                        <Menu />
                    </div>

                    <Link href="/" className="text-netflix-red text-2xl md:text-3xl font-bold uppercase cursor-pointer mr-6 font-bebas tracking-wider z-50">
                        PHAN VIET
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-5 text-sm font-medium text-gray-300">
                    <Link href="/" className="text-white font-bold cursor-default">Home</Link>
                    <Link href="https://www.facebook.com/cuoi.thu.5" target="_blank" className="hover:text-gray-400 transition">Facebook</Link>
                    <Link href="https://phanviet.substack.com/" target="_blank" className="hover:text-gray-400 transition">Substack</Link>
                    <Link href="https://padlet.com/conan_group/phan-vi-t-nh-ng-s-n-ph-m-m-t-i-t-o-ra-6kcueklaqietgmkz" target="_blank" className="hover:text-gray-400 transition">Tài nguyên</Link>
                    <Link href="https://padlet.com/conan_group/viral-content-testimonials-8lvtmjec317ngmer" target="_blank" className="hover:text-gray-400 transition">Review</Link>
                    <Link href="https://padlet.com/conan_group/about-phan-vi-t-uou1u3b7nqji5fmy" target="_blank" className="hover:text-gray-400 transition">Cá nhân</Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={cn(
                "absolute top-full left-0 w-full bg-netflix-black border-t border-gray-800 flex flex-col md:hidden transition-all duration-300 ease-in-out overflow-hidden",
                isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            )}>
                <div className="flex flex-col space-y-4 px-8 text-sm font-medium text-gray-300">
                    <Link href="/" className="text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="https://www.facebook.com/cuoi.thu.5" target="_blank" className="hover:text-gray-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Facebook</Link>
                    <Link href="https://phanviet.substack.com/" target="_blank" className="hover:text-gray-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Substack</Link>
                    <Link href="https://padlet.com/conan_group/phan-vi-t-nh-ng-s-n-ph-m-m-t-i-t-o-ra-6kcueklaqietgmkz" target="_blank" className="hover:text-gray-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Tài nguyên</Link>
                    <Link href="https://padlet.com/conan_group/viral-content-testimonials-8lvtmjec317ngmer" target="_blank" className="hover:text-gray-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Review</Link>
                    <Link href="https://padlet.com/conan_group/about-phan-vi-t-uou1u3b7nqji5fmy" target="_blank" className="hover:text-gray-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Cá nhân</Link>
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
