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
}) => {
  const { addToCart, setIsNoteModalOpen, preparationNote } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = parseProductPrice(product.price);

  const handleAdd = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center px-3 sm:px-4 z-10 flex-shrink-0 py-1">
      {/* Main Title (Product Name - Styled like Pen Design) */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={product.id + '-title'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="font-['Cormorant_Garamond'] text-2xl xs:text-3xl sm:text-4xl font-bold italic text-[#F4EDDF] tracking-tight leading-tight mb-1"
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
          transition={{ duration: 0.22, delay: 0.03 }}
          className="text-xs xs:text-sm text-[#F4EDDF]/80 font-['Plus_Jakarta_Sans'] max-w-[320px] xs:max-w-[360px] line-clamp-2 mb-1.5 leading-relaxed"
        >
          {product.description}
        </motion.p>
      </AnimatePresence>

      {/* Price Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + '-price'}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-baseline gap-2 mb-2.5"
        >
          <span className="font-['Cormorant_Garamond'] text-2xl xs:text-3xl sm:text-4xl font-bold text-[#E2C38F]">
            {product.price}
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-xs xs:text-sm text-[#E2C38F]/90 font-medium">
            /cada
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Selection & Add to Order Bar */}
      <div className="flex flex-row items-center gap-2 xs:gap-3 w-full max-w-[340px] xs:max-w-[360px] justify-center">
        {/* Stepper for Quantity */}
        <Stepper
          value={quantity}
          onIncrement={() => setQuantity(q => q + 1)}
          onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
          size="md"
        />

        {/* Add Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleAdd}
          className={`flex-1 py-2.5 xs:py-3 px-4 xs:px-5 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(226,195,143,0.25)] transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#2B1B12] text-[#E2C38F] border border-[#E2C38F]'
              : 'bg-[#C49C64] hover:bg-[#D6A354] text-[#422B19]'
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
              <span>AGREGAR</span>
              <span className="text-[11px] font-mono opacity-85">· {formatCurrency(unitPrice * quantity)}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Note Shortcut */}
      <button
        type="button"
        onClick={() => setIsNoteModalOpen(true)}
        className="mt-2 inline-flex items-center gap-1 text-[11px] xs:text-xs text-[#E2C38F]/80 hover:text-[#E2C38F] font-['Plus_Jakarta_Sans'] transition-colors cursor-pointer"
      >
        <MessageSquarePlus className="w-3.5 h-3.5 text-[#C49C64]" />
        <span className="truncate max-w-[260px]">
          {preparationNote ? `Nota: "${preparationNote}"` : '+ Agregar nota'}
        </span>
      </button>
    </div>
  );
};
