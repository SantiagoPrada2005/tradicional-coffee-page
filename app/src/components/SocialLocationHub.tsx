import React from 'react';
import { siteConfig, socialCards } from '../data/site-config';

import ScrollReveal from './ui/ScrollReveal';

const SocialLocationHub: React.FC = () => {
    const theme = {
        '--color-primary': '#25f478',
        '--color-background-dark': '#2a1e16',
        '--color-surface-dark': '#3d2b20',
        '--font-display': "'Plus Jakarta Sans'",
        '--font-body': "'Plus Jakarta Sans'",
        '--font-footer': "'Open Sans'",
    } as React.CSSProperties;

    return (
        <div style={theme} className="bg-coffee-dark text-coffee-cream font-sans antialiased overflow-hidden min-h-screen flex flex-col relative">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-xl bg-black/50">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8">
                            <img
                                src={siteConfig.brand.logo}
                                alt={siteConfig.brand.name}
                                className="h-full w-full object-contain filter drop-shadow-[0_0_5px_rgba(37,244,120,0.5)]"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">{siteConfig.brand.name}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {siteConfig.navigation.header.map((link, index) => (
                            <a key={index} href={link.href} className="text-sm font-bold text-white/70 hover:text-white transition-colors">{link.label}</a>
                        ))}
                        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors border border-white/10">
                            {siteConfig.navigation.actionButton.label}
                        </button>
                    </div>
                    <button className="w-10 h-10 flex md:hidden items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
                <ScrollReveal animation="fade-up" className="w-full text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-coffee-cream uppercase tracking-tight mb-4">
                        Síguenos y vive<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-gold to-yellow-600">la experiencia</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Únete a nuestra comunidad en redes sociales y descubre por qué somos el destino favorito para los amantes del café frío.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {socialCards.map((card, index) => (
                        <ScrollReveal key={card.id} animation="fade-up" delay={index * 0.2} className="h-full">
                            <a className="group card-hover-effect relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden block shadow-2xl shadow-black/50 ring-1 ring-white/10 h-full" href={card.url}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" role="img" aria-label={card.alt} style={{ backgroundImage: `url('${card.image}')` }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>
                                {card.overlayIcon && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-8 opacity-80 group-hover:opacity-100 transition-all duration-300">
                                        <div className="relative">
                                            {/* Only bounce for location pin to match original design, or make configurable */}
                                            {card.overlayAnimate && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/50 blur-sm rounded-full"></div>}
                                            {card.id === 'tiktok' ? (
                                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 transition-transform">
                                                    <span className="material-symbols-outlined text-white text-5xl ml-1">{card.overlayIcon}</span>
                                                </div>
                                            ) : (
                                                <span className={`material-symbols-outlined text-coffee-gold text-7xl drop-shadow-[0_0_15px_rgba(214,191,144,0.8)] ${card.overlayAnimate ? 'animate-bounce' : ''}`}>{card.overlayIcon}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <div className="flex items-center gap-2 mb-4 text-primary bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                        {card.iconPath ? (
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={card.iconPath}></path></svg>
                                        ) : (
                                            <span className="material-symbols-outlined text-lg">{card.iconSymbol}</span>
                                        )}
                                        <span className="text-xs font-bold tracking-wider uppercase">{card.platform}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-coffee-cream leading-none mb-6">{card.title}</h2>
                                    <span className="w-full bg-coffee-gold text-coffee-dark font-bold text-base py-3 px-6 rounded-full flex items-center justify-between hover:bg-coffee-cream transition-colors shadow-[0_0_20px_rgba(214,191,144,0.3)] group-hover:scale-105">
                                        {card.action}
                                        <span className="material-symbols-outlined text-[20px] font-bold">{card.actionIcon}</span>
                                    </span>
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal animation="scale-up" delay={0.4}>
                    <div className="w-full text-center mt-8 p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md max-w-3xl mx-auto">
                        <p className="text-coffee-cream/80 text-lg md:text-xl font-medium mb-2">{siteConfig.newsletter.title} <span className="text-coffee-gold font-bold">{siteConfig.newsletter.highlight}</span> {siteConfig.newsletter.suffix}</p>
                        <p className="text-white/40 text-sm">{siteConfig.newsletter.description}</p>
                    </div>
                </ScrollReveal>
            </main>

            <footer className="w-full bg-black py-16 px-6 border-t border-white/5 font-footer mt-auto relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10">
                                <img
                                    src={siteConfig.brand.logo}
                                    alt={siteConfig.brand.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-white">{siteConfig.brand.name}</span>
                        </div>
                        <p className="font-footer text-gray-400 text-sm tracking-wide max-w-xs mb-6">{siteConfig.brand.description}</p>
                        <div className="flex gap-4">
                            {siteConfig.social.generic.map((social) => (
                                <a key={social.platform} href={social.url} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-center md:text-left">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Compañía</h4>
                            {siteConfig.footer.company.map((link) => (
                                <a key={link.label} className="text-gray-500 hover:text-primary transition-colors text-sm" href={link.href}>{link.label}</a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Legal</h4>
                            {siteConfig.footer.legal.map((link) => (
                                <a key={link.label} className="text-gray-500 hover:text-primary transition-colors text-sm" href={link.href}>{link.label}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-white/20 text-xs font-footer">
                        {siteConfig.footer.copyright}
                    </p>
                </div>
            </footer>
        </div>
    );
};
export default SocialLocationHub;
