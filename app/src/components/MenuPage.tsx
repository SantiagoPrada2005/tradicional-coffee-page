import React, { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import { exploreProducts, type Product } from '../data/products';
import ProductModal from './ProductModal';

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP);

const MenuPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allProducts = useMemo(() => [...exploreProducts], []);

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

    const handleCategoryChange = (catId: string) => {
        if (catId === activeCategory) return;

        const state = Flip.getState('.product-card, .filter-indicator', { props: 'opacity' });

        flushSync(() => {
            setActiveCategory(catId);
        });

        Flip.from(state, {
            duration: 0.6,
            ease: 'power2.out',
            absolute: true,
            stagger: 0.05,
            onEnter: elements => gsap.fromTo(elements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        });
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    useGSAP(() => {
        // Timeline para la animación de entrada del header y filtros
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.menu-back-btn', { opacity: 0, x: -20, duration: 0.6 })
            .from('.menu-hero-text > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.4')
            .from('.filter-btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.5');

        // ScrollTrigger para las tarjetas de productos
        gsap.utils.toArray('.product-card').forEach((card: any) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative bg-[#1C110C] min-h-screen font-body text-white pb-32">

            {/* Background Image - Match Hero */}
            <div
                className="fixed inset-0 z-0 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('/images/fondo-hero.jpeg')`, filter: 'grayscale(30%) brightness(0.2)' }}
            />
            {/* Dark gradient overlay */}
            <div className="fixed inset-0 z-0 bg-linear-to-t from-[#1C110C] via-[#1C110C]/80 to-transparent"></div>

            {/* Header / Hero */}
            <header className="relative pt-20 pb-32 px-6 overflow-hidden z-10">

                <div className="max-w-7xl mx-auto relative z-10">
                    <Link to="/" className="menu-back-btn inline-flex items-center gap-3 font-modern text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-[#D4B88E] transition-colors mb-20 group">
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Volver al inicio
                    </Link>

                    <div className="menu-hero-text max-w-4xl">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-[#D4B88E] mb-6 block">Nuestra Carta</span>
                        <h1 className="font-display text-7xl md:text-9xl leading-[0.85] mb-12 italic text-white">
                            Sabores que <br /> <span className="not-italic text-[#D4B88E] font-modern font-black uppercase tracking-tighter">Cuentan Historias</span>
                        </h1>
                        <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
                            Cada grano ha sido seleccionado individualmente para ofrecer una experiencia que honra la tradición de Roldanillo.
                        </p>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="sticky top-0 z-50 bg-[#1C110C]/80 backdrop-blur-xl border-y border-white/10 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-10 overflow-x-auto no-scrollbar py-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`filter-btn relative shrink-0 font-modern text-[11px] font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activeCategory === cat.id ? 'text-white' : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                                {activeCategory === cat.id && (
                                    <div
                                        className="filter-indicator absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4B88E]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Listing */}
            <main className="relative max-w-7xl mx-auto px-6 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-16">
                    {filteredProducts.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="product-card group flex flex-col sm:flex-row items-center sm:items-start gap-8 cursor-pointer pb-12 border-b border-white/10"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="h-48 w-40 sm:h-48 sm:w-36 shrink-0 rounded-2xl overflow-hidden relative shadow-2xl bg-[#2A1B14]">
                                    {product.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            style={{ backgroundImage: `url('${product.image}')` }}
                                        ></div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10">
                                            <span className="material-symbols-outlined text-4xl">coffee</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grow flex flex-col justify-between h-full pt-1 text-center sm:text-left">
                                    <div>
                                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 gap-2 sm:gap-4">
                                            <h3 className="font-display text-3xl md:text-4xl text-white leading-none group-hover:text-[#D4B88E] transition-colors">{product.name}</h3>
                                            <span className="font-modern text-xl font-bold text-[#D4B88E] italic">{product.price}</span>
                                        </div>
                                        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mx-auto sm:mx-0">{product.description}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                                        <span className="font-modern text-[9px] font-bold uppercase tracking-widest text-[#D4B88E] bg-[#D4B88E]/10 px-3 py-1 rounded-full">{product.category}</span>
                                        <span className="hidden sm:block w-12 h-1 bg-white/10"></span>
                                        <button className="font-modern text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors flex items-center gap-2">
                                            Ver detalles
                                            <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <span className="material-symbols-outlined text-6xl text-white/10 mb-6">coffee_maker</span>
                        <p className="font-modern text-sm uppercase tracking-widest text-white/40">Próximamente más sabores en esta categoría</p>
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
