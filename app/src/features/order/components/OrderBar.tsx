import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { trackWhatsAppLead } from '../../../lib/metaPixel';

export const OrderBar: React.FC = () => {
  const {
    totalCount,
    totalAmount,
    setIsCartOpen,
    cart,
    preparationNote,
    deliveryAddress,
    setIsAddressModalOpen,
  } = useOrder();

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cart.length === 0) return;
    if (!deliveryAddress.trim()) {
      setIsAddressModalOpen(true);
      return;
    }
    trackWhatsAppLead(totalAmount, totalCount, `Pedido: ${totalCount} items`);
    const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote, deliveryAddress);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.div
          key="order-bar"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-2.5 inset-x-2 xs:inset-x-4 max-w-md mx-auto z-40"
        >
          <div
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-between p-2 pl-3 rounded-full bg-[#2B1B12]/95 backdrop-blur-md border border-[#E2C38F]/40 shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer hover:border-[#E2C38F] transition-all"
          >
            {/* Summary info */}
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#E2C38F] text-[#2B1B12] flex items-center justify-center font-bold text-[11px] xs:text-xs shadow font-['Syne']">
                {totalCount}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[11px] xs:text-xs font-['Plus_Jakarta_Sans'] font-bold text-[#F4EDDF]">
                  <span>{formatCurrency(totalAmount)}</span>
                  <span className="text-[#C49C64]">·</span>
                  <span className="text-[10px] xs:text-xs font-normal text-[#E2C38F] flex items-center gap-0.5">
                    Ver pedido <ChevronUp className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-[9px] xs:text-[10px] text-[#7A6854] font-['Plus_Jakarta_Sans'] truncate max-w-[120px] xs:max-w-[160px]">
                  {preparationNote ? `Nota: ${preparationNote}` : 'Toca para revisar'}
                </p>
              </div>
            </div>

            {/* Quick CTA */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={handleDirectWhatsApp}
              className="py-1.5 px-3 xs:py-2 xs:px-4 rounded-full bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12] font-['Syne'] text-[10px] xs:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer"
            >
              <span>PEDIR</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
