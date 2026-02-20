import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold tracking-tighter mb-4">
                            TECHNO<span className="text-accent">ULTRA</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Arquitectura digital y crecimiento estratégico para empresas que no dejan su futuro a la suerte.
                        </p>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gray-200">Servicios</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-accent transition-colors">Arquitectura Web</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Growth & Ads</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">SEO Avanzado</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Branding Estratégico</Link></li>
                        </ul>
                    </div>

                    {/* Compañía */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gray-200">Compañía</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#metodologia" className="hover:text-accent transition-colors">Metodología</Link></li>
                            <li><Link href="#manifiesto" className="hover:text-accent transition-colors">Manifiesto</Link></li>
                            <li><Link href="#contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gray-200">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} TECHNOULTRA. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white">Política de Privacidad</Link>
                        <Link href="#" className="hover:text-white">Términos de Servicio</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
