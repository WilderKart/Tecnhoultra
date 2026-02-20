"use client";

import { motion } from "framer-motion";

const steps = [
    { id: "01", title: "Diagnóstico", desc: "Auditoría profunda del ecosistema digital actual y definición de objetivos." },
    { id: "02", title: "Arquitectura", desc: "Diseño de la estructura, stack tecnológico y estrategia de conversión." },
    { id: "03", title: "Implementación", desc: "Desarrollo ágil con código limpio, escalable y optimizado para SEO." },
    { id: "04", title: "Optimización", desc: "Ajustes basados en data real, CRO y mejora continua de performance." },
    { id: "05", title: "Escalado", desc: "Expansión de canales, automatización y crecimiento sostenido." },
];

export default function Methodology() {
    return (
        <section id="metodologia" className="py-24 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter"
                    >
                        ARQUITECTURA DE <span className="text-accent">CRECIMIENTO</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-xl leading-relaxed"
                    >
                        El crecimiento no es suerte. <br className="hidden md:block" />
                        Es diseño, ejecución y optimización constante.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Línea conectora desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }} // Reduced delay for smoother replay
                                className="group relative"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary border border-white/20 flex items-center justify-center text-accent font-bold mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300 relative z-20">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-white transition-colors">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
