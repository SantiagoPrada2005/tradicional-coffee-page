import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';

export const OrderBar: React.FC = () => {
  const { totalCount, totalAmount, setIsCartOpen, cart, preparationNote } = useOrder();

  if (totalCount === 0) return null;

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40"
      >
        <div
          onClick={() => setIsCartOpen(true)}
          className="flex items-center justify-between p-2.5 sm:p-3 pl-4 rounded-full bg-[#2B1B12]/95 backdrop-blur-md border border-[#E2C38F]/40 shadow-[0_12px_35px_rgba(0,0,0,0.6)] cursor-pointer hover:border-[#E2C38F] transition-all"
        >
          {/* Summary info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E2C38F] text-[#2B1B12] flex items-center justify-center font-bold text-xs shadow font-['Syne']">
              {totalCount}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] font-bold text-[#F4EDDF]">
                <span>{formatCurrency(totalAmount)}</span>
                <span className="text-[#C49C64]">·</span>
                <span className="text-xs font-normal text-[#E2C38F] flex items-center gap-0.5">
                  Ver pedido <ChevronUp className="w-3 h-3" />
                </span>
              </div>
              <p className="text-[10px] text-[#7A6854] font-['Plus_Jakarta_Sans'] truncate max-w-[140px] sm:max-w-[180px]">
                {preparationNote ? `Nota: ${preparationNote}` : 'Toca para revisar'}
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={handleDirectWhatsApp}
            className="py-2.5 px-4 sm:px-5 rounded-full bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12] font-['Syne'] text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
          >
            <span>PEDIR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
