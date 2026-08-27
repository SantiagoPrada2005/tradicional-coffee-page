import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, MessageSquarePlus } from 'lucide-react';
import type { Product } from '../../../types/product';
import { parseProductPrice } from '../../../data/frappes';
import { useOrder } from '../context/useOrder';
import { Stepper } from './Stepper';
import { formatCurrency } from '../utils/whatsapp';

interface ProductDetailsProps {
  product: Product;
  currentIndex: number;
  totalCount: number;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  currentIndex,
  totalCount,
}) => {
  const { addToCart, setIsNoteModalOpen, preparationNote } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = parseProductPrice(product.price);
  const formattedIndex = currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`;
  const formattedTotal = totalCount < 10 ? `0${totalCount}` : `${totalCount}`;

  const categoryLabel = product.tag?.label || (
    product.category === 'frappe' ? 'FRAPPÉ' :
    product.category === 'latte' ? 'LATTE FRÍO' :
    product.category === 'cold' ? 'BEBIDA FRÍA' : 'ESPECIALIDAD'
  );

  const handleAdd = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center px-4">
      {/* Category & Index Indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + '-cat'}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="font-['Syne'] text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#C49C64] uppercase">
            — {formattedIndex} · DE {formattedTotal} —
          </span>
          <span className="bg-[#C49C64]/20 border border-[#C49C64]/40 text-[#E2C38F] text-[10px] font-['Syne'] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
            {categoryLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Main Title (Product Name) */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={product.id + '-title'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-bold text-[#F4EDDF] tracking-tight leading-[1.1] mb-2"
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
          className="text-xs sm:text-sm md:text-base text-[#F4EDDF]/75 font-['Plus_Jakarta_Sans'] max-w-md line-clamp-2 sm:line-clamp-none mb-4 leading-relaxed"
        >
          {product.description}
        </motion.p>
      </AnimatePresence>

      {/* Price Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + '-price'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-baseline gap-2 mb-6"
        >
          <span className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#E2C38F]">
            {product.price}
          </span>
          <span className="font-['Syne'] text-[10px] sm:text-xs tracking-widest text-[#C49C64] uppercase font-semibold">
            CADA UNO
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Selection & Add to Order Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md justify-center">
        {/* Stepper for Quantity */}
        <Stepper
          value={quantity}
          onIncrement={() => setQuantity(q => q + 1)}
          onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
          size="lg"
        />

        {/* Add Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleAdd}
          className={`flex-1 w-full sm:w-auto py-3.5 px-6 sm:px-8 rounded-full font-['Syne'] font-bold text-xs sm:text-sm uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(226,195,143,0.25)] transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#2B1B12] text-[#E2C38F] border border-[#E2C38F]'
              : 'bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12]'
          }`}
          aria-label={`Agregar ${quantity} ${product.name} al pedido`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-[#E2C38F]" />
              <span>¡AGREGADO!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>AGREGAR AL PEDIDO</span>
              <span className="text-[11px] opacity-80">· {formatCurrency(unitPrice * quantity)}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Note Shortcut */}
      <button
        type="button"
        onClick={() => setIsNoteModalOpen(true)}
        className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#E2C38F]/80 hover:text-[#E2C38F] font-['Plus_Jakarta_Sans'] transition-colors cursor-pointer"
      >
        <MessageSquarePlus className="w-3.5 h-3.5 text-[#C49C64]" />
        <span>{preparationNote ? `Nota: "${preparationNote}"` : '+ Agregar nota de preparación'}</span>
      </button>
    </div>
  );
};
