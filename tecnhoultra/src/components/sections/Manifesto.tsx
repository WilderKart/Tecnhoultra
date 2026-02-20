"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <section id="manifiesto" ref={containerRef} className="py-40 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">Lo que hacemos</span>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tighter max-w-6xl font-display">
                        "NO CONSTRUIMOS SITIOS WEB. <br />
                        DISEÑAMOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">ACTIVOS DIGITALES</span> QUE DOMINAN MERCADOS."
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Effect */}
            <div className="w-full border-y border-white/5 py-12 bg-soft/20 backdrop-blur-sm transform -skew-y-2">
                <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-24 text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter select-none">
                        <span>Estrategia</span>
                        <span className="text-accent/20">Sistema</span>
                        <span>Escala</span>
                        <span className="text-accent/20">Control</span>
                        <span>Dominio</span>
                        <span>Resultados</span>
                        <span className="text-accent/20">TechnoUltra</span>
                        <span>Estrategia</span>
                        <span className="text-accent/20">Sistema</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
