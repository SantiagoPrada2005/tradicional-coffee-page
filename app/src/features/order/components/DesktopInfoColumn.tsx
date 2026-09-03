import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../../types/product';

interface DesktopInfoColumnProps {
  product: Product;
}

export const DesktopInfoColumn: React.FC<DesktopInfoColumnProps> = ({ product }) => {
  const categoryLabel = product.tag?.label || (
    product.category === 'frappe' ? 'Frappe · Clásico' :
      product.category === 'latte' ? 'Latte · Frío' :
        product.category === 'cold' ? 'Bebida · Fría' : 'Especialidad'
  );

  return (
    <div className="w-full max-w-[340px] flex flex-col justify-center text-left py-4 z-10">
      {/* Category Eyebrow with Gold Rule */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + '-eyebrow'}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-[34px] h-[2px] bg-[#C49C64]" />
          <span className="font-['Syne'] text-[13px] font-bold tracking-[0.18em] text-[#C49C64] uppercase">
            {categoryLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Main Title (Huge Display) */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={product.id + '-name'}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="font-['Cormorant_Garamond'] text-6xl xl:text-7xl font-bold text-[#F4EDDF] tracking-tight leading-[1.02] mb-4"
        >
          {product.name}
        </motion.h1>
      </AnimatePresence>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={product.id + '-desc'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-base text-[#F4EDDF]/80 font-['Plus_Jakarta_Sans'] leading-relaxed mb-6 max-w-[320px]"
        >
          {product.description}
        </motion.p>
      </AnimatePresence>

      {/* Price Row */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + '-price'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-baseline gap-2"
        >
          <span className="font-['Cormorant_Garamond'] text-4xl xl:text-5xl font-bold text-[#E2C38F]">
            {product.price}
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#E2C38F]/90 font-medium">
            /cada uno
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
