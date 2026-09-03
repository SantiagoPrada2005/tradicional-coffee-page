import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency } from '../utils/whatsapp';

export const OrderHeader: React.FC = () => {
  const { totalCount, totalAmount, setIsCartOpen } = useOrder();

  return (
    <header className="w-full py-2.5 px-3 sm:px-6 md:px-8 flex items-center justify-between z-30 relative bg-transparent flex-shrink-0">
      {/* Brand and Back Button */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <Link
          to="/"
          className="group flex items-center gap-1.5 p-1.5 sm:p-2 rounded-full bg-[#2B1B12]/80 hover:bg-[#422B19] border border-[#E2C38F]/20 text-[#E2C38F] transition-all"
          title="Volver al inicio"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden md:inline text-xs font-['Syne'] tracking-wider uppercase font-semibold text-[#F4EDDF]">
            Inicio
          </span>
        </Link>

        <div className="flex flex-col">
          <Link to="/" className="inline-block">
            <span className="font-['Syne'] tracking-[0.14em] uppercase text-xs sm:text-sm md:text-base font-bold text-[#F4EDDF] hover:text-[#E2C38F] transition-colors">
              TRADICIONAL COFFEE
            </span>
          </Link>
          <span className="text-[10px] sm:text-xs text-[#E2C38F]/80 font-['Plus_Jakarta_Sans'] font-medium leading-none">
            Elige tus bebidas favoritas
          </span>
        </div>
      </div>

      {/* Order Pill (Cart Summary) */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#2B1B12]/95 hover:bg-[#422B19] border border-[#E2C38F]/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer text-left flex-shrink-0 touch-manipulation select-none"
        aria-label={`Ver pedido actual con ${totalCount} productos`}
      >
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E2C38F]" />
          <AnimatePresence>
            {totalCount > 0 && (
              <motion.span
                key={totalCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-[#E2C38F] text-[#2B1B12] text-[9px] font-bold font-['Syne'] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow"
              >
                {totalCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 text-[11px] sm:text-xs font-['Plus_Jakarta_Sans']">
          <span className="font-semibold text-[#F4EDDF]">
            {totalCount === 1 ? '1 item' : `${totalCount} items`}
          </span>
          {totalCount > 0 && (
            <>
              <span className="text-[#C49C64]">·</span>
              <span className="font-bold text-[#E2C38F]">
                {formatCurrency(totalAmount)}
              </span>
            </>
          )}
        </div>
      </motion.button>
    </header>
  );
};
