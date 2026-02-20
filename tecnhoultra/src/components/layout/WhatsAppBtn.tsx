"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function WhatsAppBtn() {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Vibración sutil cada 10 segundos
        const interval = setInterval(() => {
            if (navigator.vibrate) navigator.vibrate(50);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                className="bg-white/90 backdrop-blur text-primary px-4 py-2 rounded-xl shadow-lg text-sm font-bold pointer-events-none hidden md:block"
            >
                ¡Escríbenos ahora!
            </motion.div>

            <motion.a
                href="https://wa.me/573007296067"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] relative flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 duration-[3s]" />

                <FaWhatsapp size={32} />
            </motion.a>
        </div>
    );
}
