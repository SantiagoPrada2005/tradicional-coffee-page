import React from 'react';
import ScrollReveal from '../../../components/animations/ScrollReveal';
import { LocationMap } from './expand-map';

const SocialLocationHub: React.FC = () => {
    return (
        <section className="bg-[#1C110C] font-body text-white relative min-h-[100dvh] flex flex-col justify-between py-4 overflow-hidden">

            {/* --- FONDO DE IMAGEN --- */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: 'url("/images/fondo-hero.jpeg")',
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

                {/* --- 2. SOCIAL HUB (DISEÑO CENTRALIZADO) --- */}
                <ScrollReveal animation="fade-up" className="relative w-full bg-[#241710]/80 backdrop-blur-sm rounded-3xl border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-around gap-10 md:gap-4 group mb-4">

                    {/* CAMBIO 2: Agregué un div contenedor con 'overflow-hidden rounded-3xl' solo para la luz de fondo, para que el degradado no se salga de las esquinas */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2818]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* --- IZQUIERDA: TIKTOK --- */}
                    <a
                        href="https://www.tiktok.com/@tradicionalcoffeerol?_r=1&_t=ZS-95LvyjihScf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex flex-col items-center gap-1 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                        aria-label="Ir a TikTok"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10 fill-[#D4B88E] mb-3 drop-shadow-md" viewBox="0 0 448 512">
                            <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                        </svg>
                        <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89B72]">TikTok</span>
                    </a>

                    {/* --- CENTRO: IMAGEN 3D --- */}
                    <div className="relative z-10 w-56 md:w-72 lg:w-80 flex-shrink-0 flex justify-center items-center">
                        <div className="absolute w-40 h-40 bg-[#D4B88E]/20 rounded-full blur-[50px] scale-150 pointer-events-none"></div>

                        <img
                            src="./images/frappe-3d.png"
                            alt="Frappé Tradicional Coffee"
                            className="relative z-10 w-full h-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] scale-[1.3] md:scale-[1.5] group-hover:-translate-y-3 group-hover:scale-[1.35] md:group-hover:scale-[1.55] transition-all duration-700 ease-out"
                        />
                    </div>

                    {/* --- DERECHA: INSTAGRAM --- */}
                    <a
                        href="https://www.instagram.com/tradicional_coffee_roldanillo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex flex-col items-center gap-1 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                        aria-label="Ir a Instagram"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10 fill-[#D4B88E] mb-3 drop-shadow-md" viewBox="0 0 448 512">
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89B72]">Instagram</span>
                    </a>

                </ScrollReveal>

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