"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { value: 240, label: "Crecimiento Promedio", suffix: "%", sub: "En los primeros 12 meses" },
    { value: 12, label: "ROI Estructurado", suffix: "X", sub: "Sobre inversión tecnológica" },
    { value: 98, label: "Tasa de Retención", suffix: "%", sub: "Partnerships a largo plazo" },
];

export default function Authority() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section className="bg-background py-32 border-t border-white/5 relative overflow-hidden" ref={ref}>
            {/* Glow effect ambient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="pt-12 md:pt-0 px-6 group transition-all duration-500 hover:transform hover:-translate-y-2">
                            <div className="text-6xl md:text-8xl font-bold text-white mb-4 flex justify-center items-baseline font-display tracking-tighter group-hover:text-accent transition-colors duration-300">
                                {isInView ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={2.5}
                                        separator=","
                                        enableScrollSpy={true}
                                        scrollSpyOnce={false}
                                    />
                                ) : (
                                    <span>0</span>
                                )}
                                <span className="text-accent ml-1">{stat.suffix}</span>
                            </div>
                            <p className="text-xl text-gray-300 font-medium mb-2">{stat.label}</p>
                            <p className="text-sm text-gray-500 font-light">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
