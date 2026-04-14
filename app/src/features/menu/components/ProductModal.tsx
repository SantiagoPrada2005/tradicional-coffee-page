import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Product } from '../../../types';
import { siteConfig } from '../../../data/site-config';

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
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
            gsap.fromTo('.modal-content',
                { opacity: 0, y: 60, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out' }
            );
            gsap.fromTo('.modal-img',
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
            );
            gsap.fromTo('.modal-text > *',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, stagger: 0.1, ease: 'power3.out' }
            );
        } else if (renderModal) {
            // Animate OUT
            gsap.to('.backdrop', { opacity: 0, duration: 0.3, ease: 'power3.in' });
            gsap.to('.modal-content', {
                opacity: 0, y: 30, scale: 0.95, duration: 0.4, ease: 'power3.in',
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
                className="backdrop absolute inset-0 bg-[#1C110C]/95 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div
                className="modal-content relative w-full max-w-6xl bg-[#241710] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] border border-white/10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 h-12 w-12 rounded-full bg-white/10 text-white/60 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all duration-500 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Product Image Section */}
                <div className="w-full md:w-5/12 h-[40vh] md:h-auto relative overflow-hidden group">
                    <div
                        className="modal-img absolute inset-0 bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                        style={{ backgroundImage: `url('${product.image}')` }}
                        role="img"
                        aria-label={product.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/80 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center overflow-y-auto font-body">
                    <div className="modal-text">
                        <span className="font-modern text-xs font-bold uppercase tracking-[0.4em] text-[#D4B88E] mb-6 block">
                            {siteConfig.brand.name} — {product.category}
                        </span>

                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 italic">
                            {product.name}
                        </h2>

                        <p className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-12 mb-16 items-end">
                            <div>
                                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Inversión</span>
                                <span className="font-modern text-4xl font-bold text-[#D4B88E] italic">{product.price}</span>
                            </div>
                            <div className="flex-grow h-[1px] bg-white/10 mb-4"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-1/2 border border-white/10 text-white/70 h-16 rounded-full font-modern font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all duration-500"
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
