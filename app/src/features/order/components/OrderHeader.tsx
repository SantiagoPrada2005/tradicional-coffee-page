import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency } from '../utils/whatsapp';

export const OrderHeader: React.FC = () => {
  const { totalCount, totalAmount, setIsCartOpen } = useOrder();

  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between z-30 relative bg-transparent">
      {/* Brand and Back Button */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="group flex items-center gap-2 p-2 rounded-full bg-[#2B1B12]/80 hover:bg-[#422B19] border border-[#E2C38F]/20 text-[#E2C38F] transition-all"
          title="Volver a la página principal"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline text-xs font-['Syne'] tracking-wider uppercase font-semibold text-[#F4EDDF]">
            Inicio
          </span>
        </Link>

        <div className="flex flex-col">
          <Link to="/" className="inline-block">
            <span className="font-['Syne'] tracking-[0.18em] uppercase text-sm sm:text-base font-bold text-[#F4EDDF] hover:text-[#E2C38F] transition-colors">
              TRADICIONAL COFFEE
            </span>
          </Link>
          <span className="text-[11px] sm:text-xs text-[#E2C38F]/80 font-['Plus_Jakarta_Sans'] font-medium">
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
        className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#2B1B12]/95 hover:bg-[#422B19] border border-[#E2C38F]/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer text-left"
        aria-label={`Ver pedido actual con ${totalCount} productos`}
      >
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#E2C38F]" />
          <AnimatePresence>
            {totalCount > 0 && (
              <motion.span
                key={totalCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-[#E2C38F] text-[#2B1B12] text-[10px] font-bold font-['Syne'] w-4 h-4 rounded-full flex items-center justify-center shadow"
              >
                {totalCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-['Plus_Jakarta_Sans']">
          <span className="font-semibold text-[#F4EDDF]">
            {totalCount === 1 ? '1 producto' : `${totalCount} productos`}
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
