import React, { useState } from 'react';
import { highlightedProducts, exploreProducts, type Product } from '../data/products';
import ScrollReveal from './ui/ScrollReveal';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import ProductModal from './ProductModal';

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    },
    exit: { opacity: 0, y: 20 }
};

const ColdProductCarousel: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<'all' | 'nitro' | 'latte' | 'frappe'>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const filteredHighlighted = activeCategory === 'all'
        ? highlightedProducts
        : highlightedProducts.filter(p => p.category === activeCategory);

    const filteredExplore = (activeCategory === 'all'
        ? exploreProducts
        : exploreProducts.filter(p => p.category === activeCategory)).slice(0, 6);

    const categories: { id: 'all' | 'nitro' | 'latte' | 'frappe'; label: string }[] = [
        { id: 'all', label: 'Todos' },
        { id: 'nitro', label: 'Nitro' },
        { id: 'latte', label: 'Lattes' },
        { id: 'frappe', label: 'Frappés' },
    ];

    return (
        <div className="bg-coffee-cream font-body text-coffee-dark overflow-hidden antialiased min-h-screen relative py-24 md:py-32">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coffee-gold/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coffee-dark/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <header className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                    <ScrollReveal animation="fade-right" className="max-w-xl">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-coffee-gold mb-4 block">Selección de Autor</span>
                        <h2 className="font-display text-5xl md:text-7xl leading-tight mb-6">
                            Bebidas que <span className="italic">inspiran</span>
                        </h2>
                        <div className="w-12 h-[1px] bg-coffee-dark/20 mb-6"></div>
                        <p className="text-coffee-dark/60 text-lg leading-relaxed">Explora nuestra curaduría de café frío premium, diseñado para despertar tus sentidos.</p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-left" delay={0.2} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 px-8 py-4 rounded-full font-modern text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat.id
                                    ? 'bg-coffee-dark text-white shadow-premium'
                                    : 'bg-white/40 text-coffee-dark/40 hover:bg-white hover:text-coffee-dark'
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24"
                    >
                        {filteredHighlighted.map((product) => (
                            <motion.div
                                variants={item}
                                key={product.id}
                                className="group relative cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-premium bg-white">
                                    <div className="absolute inset-0 bg-cover bg-center grayscale-[10%] group-hover:scale-110 group-hover:grayscale-0 transition-transform duration-1000" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-transparent opacity-60"></div>
                                    
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-2 block">{product.category}</span>
                                            <h3 className="font-display text-4xl text-white italic mb-4">{product.name}</h3>
                                            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <span className="font-modern text-lg font-bold text-white/90">{product.price}</span>
                                                <span className="font-modern text-[10px] font-bold uppercase tracking-widest text-coffee-gold border-b border-coffee-gold/50">Detalles</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <ScrollReveal animation="fade-up" delay={0.4}>
                    <div className="h-[1px] w-full bg-coffee-dark/5 mb-24"></div>
                </ScrollReveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + "-explore"}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12"
                    >
                        {filteredExplore.map((product) => (
                            <motion.div
                                variants={item}
                                key={product.id}
                                className="flex items-center gap-8 group cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="h-40 w-32 rounded-lg bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 shadow-lg" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                <div className="flex-1 border-b border-coffee-dark/5 pb-6">
                                    <span className="font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-coffee-gold mb-1 block">{product.category}</span>
                                    <h4 className="font-display text-3xl mb-2 group-hover:text-coffee-gold transition-colors">{product.name}</h4>
                                    <p className="font-body text-sm text-coffee-dark/50 leading-relaxed max-w-sm">{product.description}</p>
                                </div>
                                <div className="text-right pb-6">
                                    <span className="block font-modern text-xl font-bold mb-4">{product.price}</span>
                                    <button className="h-10 w-10 rounded-full border border-coffee-dark/20 flex items-center justify-center hover:bg-coffee-dark hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default ColdProductCarousel;
