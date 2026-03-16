import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site-config';

const ColdHubHero: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.8,
                ease: "easeOut",
            }
        })
    };

    return (
        <section ref={targetRef} className="relative min-h-[100dvh] w-full bg-coffee-dark overflow-hidden flex flex-col font-body">
            {/* Background Composition */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-coffee-dark/80 to-transparent z-10 md:block hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-transparent to-coffee-dark z-10 md:hidden block"></div>
                <div
                    className="h-full w-full bg-cover bg-center grayscale-[20%] brightness-[0.7]"
                    role="img"
                    aria-label="Tradicional Coffee Experience"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbfo38vPpfkGfJ2o4pVX1irYSUc0KxY2Oq1UWBbbLSdMuhyS4-BxnLH28J_6wmUavbzj13lQhe7HHClhBt0EyFd7jK4K-BESRZs1gFB7LBPDI3G4Y0AcA0pQKDrY5PXHBamgUbcAClQYhLQn9hKTcQzbMTMMmUppwx8wjO9MAmaZqJGf-nVCdoTH3S0GNR5MuLBNRw6b_sxuo_x3f1LuFLUQxRd6V_41BNPVT1CYoJ3ccfoP1Izen5PKvKgYCiu3guv-Od33MhELL-")' }}
                ></div>
            </motion.div>

            {/* Navigation Overlay */}
            <nav className="relative z-50 flex justify-between items-center px-6 md:px-20 py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex items-center gap-4"
                >
                    <img src={siteConfig.brand.logo} alt="Logo" className="h-10 w-10 object-contain" />
                    <span className="font-modern font-bold text-white tracking-widest text-sm uppercase">{siteConfig.brand.name}</span>
                </motion.div>
                
                <div className="hidden md:flex gap-10 items-center">
                    {siteConfig.navigation.header.map((item, idx) => (
                        <Link key={idx} to={item.href} className="font-modern text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-coffee-gold transition-colors">{item.label}</Link>
                    ))}
                    <button className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-coffee-dark transition-all duration-500">
                        <span className="material-symbols-outlined text-sm">search</span>
                    </button>
                </div>
            </nav>

            {/* Content Area */}
            <div className="relative z-20 flex-grow flex flex-col justify-center px-6 md:px-20 max-w-7xl">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <div className="w-8 h-[1px] bg-coffee-gold"></div>
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.3em] text-coffee-gold">Hecho en Roldanillo</span>
                    </motion.div>

                    <h1 className="font-display text-5xl md:text-8xl lg:text-[7rem] leading-[0.95] text-white mb-10 italic">
                        {siteConfig.hero.title.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={titleVariants}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col md:flex-row gap-8 items-start md:items-center"
                    >
                        <Link
                            to="/menu"
                            className="bg-coffee-gold px-10 py-5 rounded-full font-modern font-bold text-xs uppercase tracking-[0.2em] text-coffee-dark hover:bg-white transition-colors duration-500"
                        >
                            {siteConfig.hero.cta}
                        </Link>
                        
                        <div className="flex gap-4">
                            {siteConfig.hero.tags.map((tag) => (
                                <span key={tag} className="font-modern text-[10px] font-bold uppercase tracking-widest text-white/30 border-l border-white/20 pl-4 first:border-0 first:pl-0">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="relative z-20 px-6 md:px-20 py-10 flex justify-between items-end">
                <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-coffee-gold"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-white/20 text-xs font-modern uppercase tracking-[0.2em] flex flex-col items-center gap-4"
                >
                    <span className="[writing-mode:vertical-lr]">Scroll</span>
                    <div className="w-[1px] h-10 bg-white/20"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default ColdHubHero;
