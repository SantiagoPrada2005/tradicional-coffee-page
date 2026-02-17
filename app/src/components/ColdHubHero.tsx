import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';
import { siteConfig } from '../data/site-config';

const ColdHubHero: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const theme = {
        '--color-primary': '#39FF14',
        '--color-background-dark': '#12230f',
        '--font-display': "'Space Grotesk'",
        '--font-body': "'Space Grotesk'",
    } as React.CSSProperties;

    return (
        <div ref={targetRef} style={theme} className="bg-background-dark text-white overflow-x-hidden min-h-screen font-display">
            <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden">
                <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-10"></div>
                    <div
                        className="h-full w-full bg-cover bg-center"
                        role="img"
                        aria-label="Two hands holding Tradicional cold frappe drinks in an urban setting"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbfo38vPpfkGfJ2o4pVX1irYSUc0KxY2Oq1UWBbbLSdMuhyS4-BxnLH28J_6wmUavbzj13lQhe7HHClhBt0EyFd7jK4K-BESRZs1gFB7LBPDI3G4Y0AcA0pQKDrY5PXHBamgUbcAClQYhLQn9hKTcQzbMTMMmUppwx8wjO9MAmaZqJGf-nVCdoTH3S0GNR5MuLBNRw6b_sxuo_x3f1LuFLUQxRd6V_41BNPVT1CYoJ3ccfoP1Izen5PKvKgYCiu3guv-Od33MhELL-")' }}
                    >
                    </div>
                </motion.div>
                <nav className="relative z-50 w-full flex justify-between items-center px-6 md:px-12 py-6 pt-12 md:pt-8 backdrop-blur-sm bg-black/10 border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <div className="h-10 w-10 md:h-12 md:w-12">
                            <img
                                src={siteConfig.brand.logo}
                                alt={siteConfig.brand.name}
                                className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                            />
                        </div>
                        <span className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-md">{siteConfig.brand.shortName}</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <button className="p-2 text-white/90 hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/10" aria-label="Locations">
                            <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">location_on</span>
                        </button>
                        <button className="p-2 text-white/90 hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/10" aria-label="Camera">
                            <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">photo_camera</span>
                        </button>
                        <button className="p-2 text-white/90 hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/10" aria-label="Music">
                            <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">music_note</span>
                        </button>
                    </motion.div>
                </nav>
                <main className="relative z-40 w-full flex-grow flex flex-col justify-center md:justify-end px-6 md:px-12 pb-12 md:pb-24 gap-8 md:gap-12">
                    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full text-center">
                        <ScrollReveal animation="fade-up" duration={0.8}>
                            <h1 className="font-anton text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-wide text-white uppercase drop-shadow-2xl" style={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)" }}>
                                {siteConfig.hero.title}
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal animation="scale-up" delay={0.3} duration={0.6}>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(57,255,20,0.8)]"></div>
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={0.5}>
                            <p className="text-gray-100 text-sm md:text-xl font-semibold tracking-wide flex flex-wrap justify-center gap-3 items-center drop-shadow-md">
                                {siteConfig.hero.tags.map((tag, index) => (
                                    <React.Fragment key={tag}>
                                        <span>{tag}</span>
                                        {index < siteConfig.hero.tags.length - 1 && <span className="text-primary">•</span>}
                                    </React.Fragment>
                                ))}
                            </p>
                        </ScrollReveal>
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <ScrollReveal animation="fade-up" delay={0.7} className="w-full flex justify-center">
                            <Link to="/menu" className="group relative flex w-full max-w-sm md:max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 md:h-16 bg-primary text-background-dark text-lg md:text-xl font-bold tracking-wide shadow-neon-green hover:shadow-[0_0_30px_rgba(57,255,20,0.9)] transition-all duration-300 hover:scale-105 active:scale-95">
                                <span className="relative z-10 flex items-center gap-2">
                                    {siteConfig.hero.cta}
                                    <span className="material-symbols-outlined !text-[22px] md:!text-[26px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"></div>
                            </Link>
                        </ScrollReveal>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute bottom-4 left-0 right-0 flex justify-center"
                    >
                        <span className="material-symbols-outlined text-white drop-shadow-md !text-[32px]">keyboard_arrow_down</span>
                    </motion.div>
                </main>
            </div>          </div>
    );
};

export default ColdHubHero;
