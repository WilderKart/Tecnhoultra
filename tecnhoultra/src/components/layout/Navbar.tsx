"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Lo que hacemos", href: "#manifiesto" },
    { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg" : "py-8 bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50 group">
                    <span className="text-2xl font-bold font-display tracking-tight text-white">
                        TECHNO<span className="text-accent">ULTRA</span>
                    </span>
                    <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/80 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90 font-bold tracking-wider text-[11px] h-10 px-6"
                    >
                        DIAGNÓSTICO
                    </Button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-display font-bold text-white hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button size="lg" className="mt-8 bg-accent text-white" onClick={() => setMobileMenuOpen(false)}>
                                INICIAR AHORA
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
