import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { highlightedProducts, exploreProducts, type Product } from '../data/products';
//import { siteConfig } from '../data/site-config';
import ProductModal from './ProductModal';
import ScrollReveal from './ui/ScrollReveal';

const MenuPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allProducts = useMemo(() => [...highlightedProducts, ...exploreProducts], []);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'frappe', label: 'Frappés' },
        { id: 'cold', label: 'Bebidas Frías' },
        { id: 'latte', label: 'Lattes' },
        { id: 'hot', label: 'Café Caliente' },
        { id: 'dessert', label: 'Delicias' },
    ];

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') return allProducts;
        return allProducts.filter(p => p.category === activeCategory);
    }, [activeCategory, allProducts]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-coffee-cream min-h-screen font-body text-coffee-dark pb-32">
            {/* Header / Hero */}
            <header className="relative pt-20 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 aspect-square bg-coffee-gold/5 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-3 font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-dark/40 hover:text-coffee-gold transition-colors mb-20 group">
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Volver al inicio
                    </Link>

                    <ScrollReveal animation="fade-up" className="max-w-4xl">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-coffee-gold mb-6 block">Nuestra Carta</span>
                        <h1 className="font-display text-7xl md:text-9xl leading-[0.85] mb-12 italic">
                            Sabores que <br /> <span className="not-italic text-coffee-gold font-modern font-black uppercase tracking-tighter">Cuentan Historias</span>
                        </h1>
                        <p className="text-coffee-dark/50 text-xl leading-relaxed max-w-2xl">
                            Cada grano ha sido seleccionado individualmente para ofrecer una experiencia que honra la tradición de Roldanillo.
                        </p>
                    </ScrollReveal>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="sticky top-0 z-50 bg-coffee-cream/80 backdrop-blur-xl border-y border-coffee-dark/5 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-10 overflow-x-auto no-scrollbar py-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`relative flex-shrink-0 font-modern text-[11px] font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activeCategory === cat.id ? 'text-coffee-dark' : 'text-coffee-dark/30 hover:text-coffee-dark'
                                    }`}
                            >
                                {cat.label}
                                {activeCategory === cat.id && (
                                    <motion.div
                                        layoutId="menu-filter-pill"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-coffee-gold"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Listing */}
            <main className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="group flex items-start gap-8 cursor-pointer pb-12 border-b border-coffee-dark/5"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="h-32 w-24 md:h-48 md:w-36 flex-shrink-0 rounded-lg overflow-hidden relative shadow-lg bg-white/50">
                                    {product.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                            style={{ backgroundImage: `url('${product.image}')` }}
                                        ></div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-coffee-dark/10">
                                            <span className="material-symbols-outlined text-4xl">coffee</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow flex flex-col justify-between h-full pt-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-4 gap-4">
                                            <h3 className="font-display text-3xl md:text-4xl text-coffee-dark leading-none group-hover:text-coffee-gold transition-colors">{product.name}</h3>
                                            <span className="font-modern text-xl font-bold text-coffee-dark italic">{product.price}</span>
                                        </div>
                                        <p className="text-coffee-dark/40 text-sm md:text-base leading-relaxed max-w-md">{product.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-6">
                                        <span className="font-modern text-[9px] font-bold uppercase tracking-widest text-coffee-gold bg-coffee-gold/5 px-3 py-1 rounded-full">{product.category}</span>
                                        <span className="w-12 h-[1px] bg-coffee-dark/5"></span>
                                        <button className="font-modern text-[9px] font-bold uppercase tracking-[0.2em] text-coffee-dark/40 group-hover:text-coffee-dark transition-colors flex items-center gap-2">
                                            Ver ingredientes
                                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <span className="material-symbols-outlined text-6xl text-coffee-dark/10 mb-6">coffee_maker</span>
                        <p className="font-modern text-sm uppercase tracking-widest text-coffee-dark/30">Próximamente más sabores en esta categoría</p>
                    </div>
                )}
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default MenuPage;
