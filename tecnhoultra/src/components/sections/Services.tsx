"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    FaLaptopCode,
    FaChartLine,
    FaSearchDollar,
    FaRocket,
    FaFingerprint,
    FaPenNib
} from "react-icons/fa";

const services = [
    {
        icon: FaLaptopCode,
        title: "Arquitectura Digital",
        subtitle: "Infraestructura pensada para escalar.",
        items: ["Desarrollo estratégico", "Web corporativa", "Ecommerce", "Landing pages"],
        img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2670&auto=format&fit=crop" // Abstract Tech
    },
    {
        icon: FaChartLine,
        title: "Performance & Ads",
        subtitle: "Adquisición con retorno medible.",
        items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Programática"],
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" // Abstract graph
    },
    {
        icon: FaSearchDollar,
        title: "SEO Estratégico",
        subtitle: "Posicionamiento de autoridad.",
        items: ["Auditoría técnica", "SEO Local", "SEO Ecommerce", "Linkbuilding"],
        img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop" // Abstract grid
    },
    {
        icon: FaRocket,
        title: "Growth Systems",
        subtitle: "Automatización y ventas.",
        items: ["Funnels de venta", "CRM & Automation", "Email Marketing", "IA Aplicada"],
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" // Abstract geometry
    },
    {
        icon: FaFingerprint,
        title: "Brand Strategy",
        subtitle: "Identidad que domina mercados.",
        items: ["Naming & Identidad", "Rebranding", "Reputación Online", "Diseño UI/UX"],
        img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" // Abstract fluid
    },
    {
        icon: FaPenNib,
        title: "Content Marketing",
        subtitle: "Narrativa que convence.",
        items: ["Estrategia editorial", "Copywriting", "Calendarios", "Blog corporativo"],
        img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop" // Abstract writing/pen
    },
];

export default function Services() {
    return (
        <section id="servicios" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-8 text-primary font-display tracking-tight flex flex-col md:block items-center"
                    >
                        SISTEMAS DE <span className="text-secondary">ALTO</span>
                        <br className="md:hidden" />
                        <motion.span
                            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            // Liquid Flow Animation
                            style={{
                                backgroundImage: "linear-gradient(90deg, #FF5930 0%, #ABFA54 25%, #0044FF 50%, #5C6B3D 75%, #FF5930 100%)",
                                backgroundSize: "300% 300%",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                filter: "drop-shadow(0px 0px 20px rgba(171, 250, 84, 0.3))", // Glow sutil Neon Green
                            }}
                            transition={{
                                backgroundPosition: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                scale: { duration: 0.8 },
                                opacity: { duration: 0.8 },
                                filter: { duration: 0.8 }
                            }}
                            className="ml-3 inline-block font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter"
                        >
                            IMPACTO
                        </motion.span>
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        className="h-1 bg-accent mx-auto mb-8"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto font-light"
                    >
                        Infraestructura digital diseñada para escalar negocios y dominar mercados.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-white rounded-[2rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-slate-100"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {/* Abstract Background Image at Top Right */}
                            <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.08] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700 pointer-events-none">
                                <Image
                                    src={service.img}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    style={{
                                        maskImage: "radial-gradient(circle at top right, black 40%, transparent 80%)",
                                        WebkitMaskImage: "radial-gradient(circle at top right, black 40%, transparent 80%)"
                                    }}
                                />
                            </div>

                            {/* Icon Container */}
                            <div className="relative mb-8 inline-flex items-center justify-center p-4 rounded-2xl bg-slate-50 text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                                <service.icon size={28} />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-primary mb-2 font-display tracking-tight leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mb-8">
                                    {service.subtitle}
                                </p>

                                <div className="space-y-3">
                                    {service.items.map((item, i) => (
                                        <motion.p
                                            key={i}
                                            className="text-primary font-semibold text-base"
                                        >
                                            {item}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
