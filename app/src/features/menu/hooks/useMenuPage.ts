import { useState, useMemo } from 'react';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { flushSync } from 'react-dom';
import { exploreProducts, type Product } from '../../../data/products';

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP);

export function useMenuPage(containerRef: React.RefObject<HTMLDivElement | null>) {
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

    const closeModal = () => setIsModalOpen(false);

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
                    trigger: card as HTMLElement,
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

    return {
        categories,
        activeCategory,
        filteredProducts,
        selectedProduct,
        isModalOpen,
        handleCategoryChange,
        handleProductClick,
        closeModal
    };
}
