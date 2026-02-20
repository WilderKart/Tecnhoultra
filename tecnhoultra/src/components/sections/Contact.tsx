"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    company: z.string().optional(),
    message: z.string().min(10, "Mensaje muy corto"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <section id="contacto" className="py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-100 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">Hablemos de Negocios</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-display">INICIAR DIAGNÓSTICO</h2>
                    <p className="text-slate-600 text-lg font-light">
                        ¿Listo para escalar? Cuéntanos tu desafío actual.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <FaCheckCircle className="text-accent text-6xl mb-6" />
                                <h3 className="text-3xl text-primary font-bold mb-2">¡Mensaje Recibido!</h3>
                                <p className="text-slate-600">Nuestro equipo de estrategia te contactará en breve.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm uppercase tracking-wider text-secondary font-semibold ml-1">Nombre</label>
                                        <input
                                            {...register("name")}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placholder:text-slate-400"
                                            placeholder="Tu nombre completo"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm uppercase tracking-wider text-secondary font-semibold ml-1">Empresa</label>
                                        <input
                                            {...register("company")}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placholder:text-slate-400"
                                            placeholder="Nombre de tu organización"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm uppercase tracking-wider text-secondary font-semibold ml-1">Email Corporativo</label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placholder:text-slate-400"
                                        placeholder="ejemplo@empresa.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm uppercase tracking-wider text-secondary font-semibold ml-1">Desafío Principal</label>
                                    <textarea
                                        {...register("message")}
                                        rows={4}
                                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                                        placeholder="Describe brevemente qué buscas lograr..."
                                    />
                                    {errors.message && <p className="text-red-400 text-xs ml-1">{errors.message.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold tracking-widest py-6 text-lg shadow-lg shadow-accent/20"
                                >
                                    {isSubmitting ? "ENVIANDO..." : "SOLICITAR AUDITORÍA"}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
