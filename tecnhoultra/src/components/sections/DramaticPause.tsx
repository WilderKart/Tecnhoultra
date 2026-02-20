"use client";

import { motion } from "framer-motion";

export default function DramaticPause() {
    return (
        <section className="h-[80vh] bg-background flex items-center justify-center relative overflow-hidden">
            {/* Imagen fija sutil en el fondo con baja opacidad */}
            <div
                className="absolute inset-0 opacity-20 "
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2668&auto=format&fit=crop')",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "grayscale(100%) contrast(120%)"
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.3 }
                        }
                    }}
                >
                    <h3 className="text-4xl md:text-6xl text-white font-serif italic font-light leading-relaxed max-w-4xl mx-auto">
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: "easeOut" } } }}
                            className="block"
                        >
                            "El silencio es parte de la música.
                        </motion.span>
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: "easeOut" } } }}
                            className="block"
                        >
                            El espacio es parte de la arquitectura."
                        </motion.span>
                    </h3>
                </motion.div>
            </div>
        </section>
    );
}
