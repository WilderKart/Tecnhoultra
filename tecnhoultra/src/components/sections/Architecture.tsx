"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Architecture() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[120vh] overflow-hidden flex items-center justify-center bg-background">
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-[140%] -top-[20%] absolute bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')",
                        filter: "brightness(0.4) saturate(0)"
                    }}
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight font-display">
                        ARQUITECTURA <br />
                        <span className="text-accent italic">EN ACCIÓN</span>
                    </h2>
                    <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                        "No improvisamos. Diseñamos sistemas capaces de soportar <span className="text-white font-medium">crecimiento exponencial</span>."
                    </p>
                </motion.div>
            </div>

            {/* Decorative lines */}
            <div className="absolute top-0 left-10 h-full w-[1px] bg-white/5 z-20" />
            <div className="absolute top-0 right-10 h-full w-[1px] bg-white/5 z-20" />
        </section>
    );
}
