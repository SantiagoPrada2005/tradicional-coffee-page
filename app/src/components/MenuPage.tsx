import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';
import { highlightedProducts, exploreProducts, type Product } from '../data/products';
import ProductModal from './ProductModal';
import { siteConfig } from '../data/site-config';

// Combine all products for the menu
const allProducts = [...highlightedProducts, ...exploreProducts];

const MenuPage: React.FC = () => {
    useEffect(() => {
        document.title = `Menú | ${siteConfig.brand.name} | Café Frío y Frappes`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Explora nuestro menú artesanal de café frío, frappes, iced lattes y postres hechos en Colombia.');
        }
    }, []);

    const [filter, setFilter] = useState('Todos');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const filteredProducts = filter === 'Todos'
        ? allProducts
        : filter === 'Fríos'
            ? allProducts.filter(p => ['nitro', 'latte', 'frappe', 'cold'].includes(p.category))
            : filter === 'Calientes'
                ? allProducts.filter(p => p.category === 'hot')
                : filter === 'Postres'
                    ? allProducts.filter(p => p.category === 'dessert')
                    : allProducts;

    const theme = {
        '--color-primary': '#25f478',
        '--color-background-dark': '#121212',
        '--font-display': "'Plus Jakarta Sans'",
        '--font-body': "'Plus Jakarta Sans'",
    } as React.CSSProperties;

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
        exit: { opacity: 0, scale: 0.9, y: 10 }
    };

    return (
        <div style={theme} className="bg-coffee-dark font-sans text-coffee-cream min-h-screen relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-400/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Navigation (Simple version for Menu Page) */}
            <nav className="relative z-50 w-full flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-md bg-black/20">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-primary transition-transform group-hover:-translate-x-1">arrow_back</span>
                    <span className="font-bold text-lg">Volver</span>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                        <img
                            src={siteConfig.brand.logo}
                            alt={siteConfig.brand.name}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <span className="font-bold text-xl tracking-tight uppercase">{siteConfig.brand.name}</span>
                </div>
                <div className="w-20"></div> {/* Spacer for centering */}
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <header className="text-center mb-16">
                    <ScrollReveal animation="fade-down">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Nuestro</span> <br className="md:hidden" />
                            <span className="text-coffee-gold drop-shadow-[0_0_15px_rgba(214,191,144,0.5)]">Menú</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Descubre nuestra selección artesanal de bebidas frías y calientes, preparadas con pasión y los mejores ingredientes.
                        </p>
                    </ScrollReveal>
                </header>

                {/* Filters */}
                <ScrollReveal animation="fade-up" delay={0.2} className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Todos', 'Fríos', 'Calientes', 'Postres'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${filter === cat
                                    ? 'bg-coffee-gold text-coffee-dark shadow-[0_0_15px_rgba(214,191,144,0.4)] scale-105'
                                    : 'bg-white/5 text-coffee-cream/70 hover:bg-white/10 hover:text-coffee-cream'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Product Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={item}
                                className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-coffee-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-coffee-gold/5 cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="aspect-square relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${product.image}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                    <button className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-coffee-cream text-coffee-dark flex items-center justify-center hover:bg-coffee-gold transition-colors shadow-lg translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-coffee-cream group-hover:text-coffee-gold transition-colors">{product.name}</h3>
                                        <span className="font-bold text-coffee-gold bg-coffee-gold/10 px-2 py-1 rounded-lg text-sm">{product.price}</span>
                                    </div>
                                    <p className="text-white/50 text-sm line-clamp-2 mb-4">{product.description}</p>
                                    {product.tag && (
                                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1 rounded">
                                            {product.tag.icon && <span className="material-symbols-outlined text-[14px]">{product.tag.icon}</span>}
                                            {product.tag.label}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <span className="material-symbols-outlined text-white/20 text-6xl mb-4">coffee_maker</span>
                                <p className="text-white/40 text-lg font-medium">No encontramos productos en esta categoría.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </main>
        </div>
    );
};

export default MenuPage;
