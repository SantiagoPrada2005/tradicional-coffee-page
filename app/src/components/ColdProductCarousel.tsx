import React, { useState } from 'react';
import { highlightedProducts, exploreProducts } from '../data/products';
import ScrollReveal from './ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
};

const ColdProductCarousel: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<'all' | 'nitro' | 'latte' | 'frappe'>('all');

    const theme = {
        '--color-primary': '#25f478',
        '--color-background-dark': '#0f172a',
        '--font-display': "'Plus Jakarta Sans'",
        '--font-body': "'Plus Jakarta Sans'",
    } as React.CSSProperties;

    const filteredHighlighted = activeCategory === 'all'
        ? highlightedProducts
        : highlightedProducts.filter(p => p.category === activeCategory);

    const filteredExplore = activeCategory === 'all'
        ? exploreProducts
        : exploreProducts.filter(p => p.category === activeCategory);

    const categories: { id: 'all' | 'nitro' | 'latte' | 'frappe'; label: string }[] = [
        { id: 'all', label: 'Todos' },
        { id: 'nitro', label: 'Nitro' },
        { id: 'latte', label: 'Lattes' },
        { id: 'frappe', label: 'Frappés' },
    ];

    return (
        <div style={theme} className="bg-background-dark font-display text-white overflow-hidden antialiased min-h-screen relative">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="ice-particle backdrop-blur-sm border border-white/10"></div>
                <div className="ice-particle backdrop-blur-sm border border-white/10"></div>
                <div className="ice-particle backdrop-blur-sm border border-white/10"></div>
                <div className="ice-particle backdrop-blur-sm border border-white/10"></div>
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
                <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <ScrollReveal animation="fade-right" className="text-center md:text-left">
                        <span className="text-sm md:text-base text-primary font-bold tracking-wider uppercase block mb-2">Tradicional</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-4">
                            Nuestros Fríos <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">del Momento</span>
                        </h1>
                        <p className="text-white/60 text-base md:text-lg font-medium max-w-md">Refresca tu día con nuestra selección premium de bebidas frías, preparadas al momento.</p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-left" delay={0.2} className="flex gap-3 overflow-x-auto max-w-full pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 backdrop-blur-sm hover:scale-105 ${activeCategory === cat.id
                                    ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(37,244,120,0.4)]'
                                    : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </ScrollReveal>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {filteredHighlighted.map((product) => (
                            <motion.div variants={item} key={product.id} className="w-full relative group cursor-pointer">
                                <div className="aspect-[2/3] md:aspect-[3/4] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-neon-green/20">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" role="img" aria-label={product.alt} style={{ backgroundImage: `url('${product.image}')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                                    {product.tag && (
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg ${product.tag.icon ? 'bg-primary text-black' : 'border border-primary text-primary bg-black/50 backdrop-blur-md'}`}>
                                                {product.tag.icon && <span className="material-symbols-outlined text-[16px] mr-1">{product.tag.icon}</span>}
                                                {product.tag.label}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col z-20">
                                        <div className="mb-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                                            <h3 className="text-3xl font-extrabold text-white mb-2">{product.name}</h3>
                                            <p className="text-white/80 text-base leading-snug">{product.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Precio</span>
                                                <span className="text-3xl font-bold text-primary">{product.price}</span>
                                            </div>
                                            <button className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-lg group-hover:rotate-90 group-hover:scale-110" aria-label={`Add ${product.name} to cart`}>
                                                <span className="material-symbols-outlined text-[28px]">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {filteredHighlighted.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-white/40 text-lg">No hay productos destacados en esta categoría.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <ScrollReveal animation="fade-up" delay={0.4}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary">local_cafe</span>
                            <span className="text-lg font-bold">¿Buscas algo más clásico?</span>
                        </div>
                        <Link className="group flex items-center gap-2 text-primary font-bold hover:text-white transition-colors" to="/menu">
                            Ver menú completo
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </ScrollReveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + "-explore"}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {filteredExplore.map((product) => (
                            <motion.div variants={item} key={product.id} className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="h-24 w-24 rounded-2xl bg-cover bg-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform" role="img" aria-label={product.alt} style={{ backgroundImage: `url('${product.image}')` }}></div>
                                <div className="flex-1">
                                    <h4 className="text-white text-xl font-bold mb-1">{product.name}</h4>
                                    <p className="text-white/50 text-sm">{product.description}</p>
                                </div>
                                <div className="text-right pr-4">
                                    <span className="block text-primary text-xl font-bold mb-2">{product.price}</span>
                                    <button className="text-white/60 hover:text-white transition-colors" aria-label={`Add ${product.name} to cart`}>
                                        <span className="material-symbols-outlined text-[32px]">add_circle</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ColdProductCarousel;
