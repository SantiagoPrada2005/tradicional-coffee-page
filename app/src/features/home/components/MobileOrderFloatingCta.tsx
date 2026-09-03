import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShoppingBag } from 'lucide-react';

export const MobileOrderFloatingCta: React.FC = () => {
  return (
    <motion.aside
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      aria-label="Acceso rápido a pedidos para móviles"
      className="fixed bottom-3 inset-x-3 z-40 md:hidden pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto max-w-md w-full bg-[#1C110C]/95 backdrop-blur-md border border-[#D4B88E]/30 rounded-2xl p-2.5 px-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2.5 pointer-events-auto">
        <div className="flex flex-col min-w-0 pr-1">
          <span className="text-xs font-bold text-[#F4EDDF] font-modern uppercase tracking-wider truncate">
            Pide en línea
          </span>
          <div className="flex items-center gap-1 text-[11px] text-[#D4B88E] font-medium leading-tight mt-0.5">
            <MapPin className="w-3 h-3 shrink-0 text-[#D4B88E]" aria-hidden="true" />
            <span className="truncate">Solo Roldanillo, Valle</span>
          </div>
        </div>

        <Link
          to="/order"
          className="shrink-0 flex items-center justify-center gap-2 bg-linear-to-r from-[#D4B88E] to-[#B89C6D] text-[#1C110C] px-4 py-2.5 min-h-[44px] rounded-xl font-modern font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 hover:brightness-105 transition-all"
          aria-label="Pedir ahora. Disponible únicamente para Roldanillo, Valle"
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          <span>Pedir</span>
        </Link>
      </div>
    </motion.aside>
  );
};

export default MobileOrderFloatingCta;
