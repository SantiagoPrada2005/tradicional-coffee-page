import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { LocationMap } from './expand-map';

const SocialLocationHub: React.FC = () => {
    return (
        <section className="bg-[#1C110C] font-body text-white relative min-h-[100dvh] flex flex-col justify-between py-4 overflow-hidden">

            {/* --- FONDO DE IMAGEN --- */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: "/images/fondo-hero.jpeg",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>
            {/* opacacidad */}
            <div className="absolute inset-0 z-0 bg-linear-to-b from-[#1C110C]/80 to-[#1C110C]/90"></div>

            {/* Contenedor principal: flex-1 lo estira, flex-col y justify-center centran todo verticalmente */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center gap-4 md:gap-6 py-6">

                {/* --- 1. HEADER SECTION --- */}
                <div className="flex flex-col items-center justify-center text-center px-4">
                    <ScrollReveal animation="fade-up" className="max-w-4xl w-full flex flex-col items-center">
                        <span className="font-modern text-[9px] font-bold uppercase tracking-[0.4em] text-[#B89B72] mb-3 block">
                            Comunidad
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-[#D4B88E] mb-3 italic leading-none whitespace-nowrap">
                            Síguenos en las redes
                        </h2>
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">
                            Más que una cafetería, somos un punto de encuentro para mentes creativas.
                        </p>
                    </ScrollReveal>
                </div>

                {/* --- 2. SOCIAL CARDS (GRID 2 COLUMNAS) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Card Instagram */}
                    <ScrollReveal animation="fade-up" className="relative h-40 md:h-48 bg-[#241710]/80 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between border border-white/5 overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
                        {/* ESTE ES EL ENLACE INVISIBLE QUE CUBRE TODA LA TARJETA */}
                        <a
                            href="https://www.instagram.com/tradicional_coffee_roldanillo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-20"
                            aria-label="Ir a Instagram de Tradicional Coffee"
                        ></a>

                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#1C110C]/80 z-0"></div>
                        <div className="relative z-10 flex justify-center">
                            <span className="bg-[#3A2818] text-white/80 text-[9px] px-3 py-1 rounded-full font-modern tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B88E] inline-block group-hover:scale-150 transition-transform"></span>
                                @tradicional_coffee_roldanillo
                            </span>
                        </div>
                        <div className="relative z-10">
                            <span className="font-modern text-[8px] font-bold uppercase tracking-[0.3em] text-[#B89B72] mb-2 block group-hover:text-white transition-colors">Instagram</span>
                            <h3 className="font-display text-2xl md:text-3xl text-white italic group-hover:scale-[1.02] transition-transform origin-left">Momentos que perduran</h3>
                        </div>
                    </ScrollReveal>

                    {/* Card TikTok */}
                    <ScrollReveal animation="fade-up" delay={0.2} className="relative h-40 md:h-48 bg-[#241710]/80 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-end border border-white/5 overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
                        {/* ESTE ES EL ENLACE INVISIBLE QUE CUBRE TODA LA TARJETA */}
                        <a
                            href="https://www.tiktok.com/@tradicionalcoffeerol?_r=1&_t=ZS-95LvyjihScf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-20"
                            aria-label="Ir a TikTok de Tradicional Coffee"
                        ></a>

                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#1C110C]/80 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <span className="font-modern text-[8px] font-bold uppercase tracking-[0.3em] text-[#B89B72] mb-2 block group-hover:text-white transition-colors">TikTok</span>
                            <h3 className="font-display text-2xl md:text-3xl text-white italic group-hover:scale-[1.02] transition-transform origin-left">Entre bastidores</h3>
                        </div>
                    </ScrollReveal>
                </div>

                {/* --- 3. BANNER CENTRAL (EXPLORA MENÚ) --- */}
                <ScrollReveal animation="zoom-in" className="bg-[#3A2818]/90 backdrop-blur-sm rounded-3xl p-5 flex items-center justify-between border border-white/5 group cursor-pointer hover:bg-[#4A3522] transition-colors">
                    <div>
                        <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89B72] mb-1 block">Explora · Menú Digital</span>
                        <h3 className="font-display text-xl md:text-2xl text-white italic">Descubre nuestro catálogo completo</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4B88E] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[#2A1B14] text-lg">arrow_forward</span>
                    </div>
                </ScrollReveal>

                {/* --- 4. BOTTOM BENTO (INFO Y UBICACIÓN) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Info Card */}
                    <ScrollReveal animation="fade-right" className="bg-[#1C110C]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10 self-start w-full">
                        <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89B72] mb-3 block">Encuéntranos</span>
                        <div className="mb-4">
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] block mb-0.5">Dirección</span>
                            <p className="font-display text-lg text-white italic leading-tight">
                                Cra. 7 #7-40,<br />Roldanillo, Valle del Cauca
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] block mb-0.5">Horario</span>
                            <p className="text-[#D4B88E] font-medium text-xs">Todos los días 8:00am - 10:00pm</p>
                        </div>
                    </ScrollReveal>

                    {/* Visítanos Card - LocationMap */}
                    <ScrollReveal animation="fade-left" delay={0.2} className="flex flex-col items-center justify-center">
                        <LocationMap
                            location="Cra. 7 #7-40, Roldanillo"
                            coordinates="4.4110° N, 76.1542° W"
                            mapUrl="https://www.google.com/maps/place/Tradicional+Coffee/@4.4110203,-76.1567558,17z/data=!3m1!4b1!4m6!3m5!1s0x8e38374eef85d4b3:0x6b1bde098e68af0e!8m2!3d4.4110203!4d-76.1541809!16s%2Fg%2F11y_1tqqsl?hl=es&entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                        />
                    </ScrollReveal>
                </div>

            </div>

            {/* --- 5. FOOTER --- */}
            <footer className="border-t border-white/5 px-6 py-4 relative z-10 w-full">
                <div className="max-w-5xl mx-auto flex justify-center items-center text-white/30">
                    <span className="font-modern text-[8px] uppercase tracking-[0.3em] text-center">
                        © 2026 TRADICIONAL COFFEE · ROLDANILLO, VALLE DEL CAUCA
                    </span>
                </div>
            </footer>
        </section>
    );
};

export default SocialLocationHub;