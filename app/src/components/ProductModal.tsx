import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../data/products';
import { siteConfig } from '../data/site-config';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300 backdrop-blur-md border border-white/10"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Product Image Section */}
                        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden group">
                            <motion.div
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                                style={{ backgroundImage: `url('${product.image}')` }}
                                role="img"
                                aria-label={product.alt}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />

                            {/* Floating Badge */}
                            {product.tag && (
                                <div className="absolute top-6 left-6">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${product.tag.icon ? 'bg-primary text-black' : 'border border-primary text-primary bg-black/50 backdrop-blur-md'}`}>
                                        {product.tag.icon && <span className="material-symbols-outlined text-[16px] mr-1">{product.tag.icon}</span>}
                                        {product.tag.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                            <div className="mb-2">
                                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                                    {siteConfig.brand.name}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                                {product.name}
                            </h2>

                            <p className="text-white/60 text-lg md:text-xl mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span className="block text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Categoría</span>
                                    <span className="text-white font-bold capitalize">{product.category}</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span className="block text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Precio</span>
                                    <span className="text-primary text-2xl font-bold">{product.price}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-primary text-black font-bold h-14 md:h-16 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    AÑADIR AL CARRITO
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-8 h-14 md:h-16 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
