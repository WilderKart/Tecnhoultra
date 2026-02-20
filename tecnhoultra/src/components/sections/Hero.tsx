"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HiChevronDown } from "react-icons/hi";

const textVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]); // Zoom sutil hasta 1.15x
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center">
            {/* Background Layer - Cinematic */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                    alt="TechnoUltra Urban Architecture"
                    fill
                    className="object-cover scale-105 animate-float opacity-60" // Subtle scale animation
                    priority
                    quality={100}
                />
                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            </div>

            {/* Content Layer */}
            <div className="container mx-auto px-6 relative z-20 pt-20">
                <div className="max-w-5xl">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Tagline */}
                        <motion.div variants={textVariants} className="mb-6 flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-accent"></span>
                            <span className="text-accent uppercase tracking-[0.2em] font-medium text-sm md:text-base">
                                Arquitectura Digital Premium
                            </span>
                        </motion.div>

                        {/* Headline Giant with Scroll Zoom */}
                        <motion.div style={{ scale: scaleText, opacity: opacityText }} className="origin-left">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-8 font-display">
                                <motion.span className="block" variants={textVariants}>EL CRECIMIENTO</motion.span>
                                <motion.span className="block text-gray-500" variants={textVariants}>NO ES SUERTE.</motion.span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed text-balance"
                        >
                            Diseñamos ecosistemas digitales que <span className="text-white font-medium">convierten, escalan y dominan</span> mercados competitivos.
                        </motion.p>

                        {/* CTA Buttons Premium */}
                        <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-6">
                            <Button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                size="lg"
                                className="bg-accent text-white hover:bg-accent/90 shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] transition-all duration-500 text-lg px-10 h-16 rounded-full border-0"
                            >
                                Iniciar Diagnóstico
                            </Button>
                            <Button
                                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="outline"
                                size="lg"
                                className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm text-lg px-10 h-16 rounded-full"
                            >
                                Explorar Sistema
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator Cinematic */}
            <motion.div
                className="absolute bottom-12 left-0 right-0 z-20 flex justify-center items-center pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                    <HiChevronDown className="text-white/60 text-xl" />
                </div>
            </motion.div>
        </section>
    );
}
