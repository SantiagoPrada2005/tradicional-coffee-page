import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, socialCards } from '../data/site-config';
import ScrollReveal from './ui/ScrollReveal';

const SocialLocationHub: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('¡Gracias por suscribirte!');
        setEmail('');
    };

    return (
        <section className="bg-coffee-dark font-body text-white relative py-24 md:py-32 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale brightness-200" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                    <ScrollReveal animation="fade-right" className="max-w-2xl">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-coffee-gold mb-4 block">Comunidad</span>
                        <h2 className="font-display text-5xl md:text-7xl leading-tight mb-8 italic">
                            Síguenos en <br /> el <span className="text-coffee-gold not-italic font-modern font-black uppercase">Hub</span>
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed max-w-lg">
                            Más que una cafetería, somos un punto de encuentro para mentes creativas y amantes del sabor auténtico.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-left" delay={0.2} className="flex gap-4">
                        <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-coffee-dark transition-all duration-500">
                            <span className="material-symbols-outlined text-xl">camera</span>
                        </a>
                        <a href={siteConfig.social.tiktok.url} target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-coffee-dark transition-all duration-500">
                            <span className="material-symbols-outlined text-xl">play_circle</span>
                        </a>
                    </ScrollReveal>
                </div>

                {/* Social Grid - Asymmetric */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
                    {/* Big Card */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="md:col-span-8 group relative aspect-[16/9] md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-cover bg-center grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" style={{ backgroundImage: `url('${socialCards[0].image}')` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-transparent opacity-80"></div>
                        <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">
                            <span className="font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-2 block">Premium Lifestyle</span>
                            <h3 className="font-display text-4xl md:text-6xl text-white italic mb-6">Momentos que perduran</h3>
                            <button className="bg-white/10 backdrop-blur-md px-10 py-4 rounded-full font-modern text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-coffee-dark transition-all">Ver en Instagram</button>
                        </div>
                    </motion.div>

                    {/* Smaller Staggered Cards */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="flex-1 group relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" style={{ backgroundImage: `url('${socialCards[1].image}')` }}></div>
                            <div className="absolute inset-0 bg-coffee-dark/40 group-hover:bg-transparent transition-colors duration-500"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                                <span className="font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-1">{socialCards[1].platform}</span>
                                <h4 className="font-display text-2xl text-white italic">{socialCards[1].title}</h4>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="flex-1 group relative rounded-2xl overflow-hidden shadow-2xl bg-coffee-gold"
                            style={{ backgroundImage: `url('${socialCards[2].image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="absolute inset-0 bg-coffee-gold/60 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start bg-gradient-to-t from-coffee-dark/80 to-transparent">
                                <span className="font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Explora</span>
                                <h4 className="font-display text-2xl text-white italic">Nuestro menú digital</h4>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Location & Newsletter - Bento Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Newsletter */}
                    <ScrollReveal animation="fade-up" className="md:col-span-1 bg-white/[0.03] p-12 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <span className="font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-8 block">Inscríbete</span>
                            <h3 className="font-display text-4xl text-white mb-6">Noticias del Hub</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-10">Sé el primero en saber sobre lanzamientos exclusivos y eventos privados.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 font-modern text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-coffee-gold transition-colors"
                                required
                            />
                            <button type="submit" className="absolute right-2 top-2 h-10 w-10 bg-coffee-gold rounded-full text-coffee-dark flex items-center justify-center hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </form>
                    </ScrollReveal>

                    {/* Map Box */}
                    <ScrollReveal animation="fade-up" delay={0.2} className="md:col-span-2 relative h-[400px] md:h-auto rounded-2xl overflow-hidden group shadow-2xl border border-white/5">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.241513251505!2d-76.1558!3d4.412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f97!2sRoldanillo%2C+Valle+del+Cauca!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute top-8 left-8 bg-coffee-dark/80 backdrop-blur-md p-8 rounded-xl border border-white/10 max-w-sm pointer-events-none group-hover:translate-x-4 transition-transform duration-700">
                            <span className="font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-4 block">Encuéntranos</span>
                            <h4 className="font-display text-3xl text-white italic mb-4">{siteConfig.contact.address}</h4>
                            <p className="text-white/40 text-sm mb-6">En el corazón de la cultura cafetera.</p>
                            <a href={siteConfig.navigation.actionButton.href} target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center gap-2 font-modern text-[10px] font-bold uppercase tracking-widest text-coffee-gold hover:text-white transition-colors">
                                Cómo llegar <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
            
            {/* Footer Placeholder for continuation */}
            <footer className="mt-32 pt-20 border-t border-white/5 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-30 h-10 overflow-hidden">
                    <span className="font-modern text-[9px] uppercase tracking-[0.4em]">{siteConfig.footer.copyright}</span>
                </div>
            </footer>
        </section>
    );
};

export default SocialLocationHub;
