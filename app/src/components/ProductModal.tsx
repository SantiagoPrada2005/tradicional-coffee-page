import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Product } from '../data/products';
import { siteConfig } from '../data/site-config';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [renderModal, setRenderModal] = useState(isOpen);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) setRenderModal(true);
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            // Animate IN
            gsap.fromTo('.backdrop', 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo('.modal-content',
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
            );
            gsap.fromTo('.modal-img',
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
            );
            gsap.fromTo('.modal-text',
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
            );
        } else if (renderModal) {
            // Animate OUT
            gsap.to('.backdrop', { opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to('.modal-content', { 
                opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: 'power2.in',
                onComplete: () => setRenderModal(false)
            });
        }
    }, { dependencies: [isOpen], scope: containerRef });

    if (!product || !renderModal) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 pointer-events-auto">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="backdrop absolute inset-0 bg-coffee-dark/95 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div
                className="modal-content relative w-full max-w-6xl bg-coffee-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] border border-white/10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 h-12 w-12 rounded-full bg-coffee-dark/10 text-coffee-dark flex items-center justify-center hover:bg-coffee-dark hover:text-white transition-all duration-500 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Product Image Section */}
                <div className="w-full md:w-5/12 h-[40vh] md:h-auto relative overflow-hidden">
                    <div
                        className="modal-img absolute inset-0 bg-cover bg-center grayscale-[10%]"
                        style={{ backgroundImage: `url('${product.image}')` }}
                        role="img"
                        aria-label={product.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/20 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center overflow-y-auto font-body">
                    <div className="modal-text">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-coffee-gold mb-6 block">
                            {siteConfig.brand.name} — {product.category}
                        </span>

                        <h2 className="font-display text-5xl md:text-7xl font-bold text-coffee-dark mb-8 italic">
                            {product.name}
                        </h2>

                        <p className="text-coffee-dark/60 text-lg md:text-xl mb-12 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-12 mb-16 items-end">
                            <div>
                                <span className="block text-coffee-dark/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Inversión</span>
                                <span className="font-modern text-4xl font-bold text-coffee-dark italic">{product.price}</span>
                            </div>
                            <div className="flex-grow h-[1px] bg-coffee-dark/5 mb-4"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="flex-[2] bg-coffee-dark text-white h-16 rounded-full font-modern font-bold text-xs uppercase tracking-[0.3em] hover:bg-coffee-gold transition-colors duration-500 shadow-xl active:scale-95">
                                Ordenar ahora
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 border border-coffee-dark/10 text-coffee-dark h-16 rounded-full font-modern font-bold text-xs uppercase tracking-[0.3em] hover:bg-coffee-dark hover:text-white transition-all duration-500"
                            >
                                Explorar menú
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
