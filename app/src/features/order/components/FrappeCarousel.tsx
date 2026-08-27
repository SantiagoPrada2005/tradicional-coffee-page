import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../../types/product';
import { orderProducts } from '../../../data/frappes';
import { FrappeMedallion } from './FrappeMedallion';

interface FrappeCarouselProps {
  products?: Product[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  showIndexBadge?: boolean;
}

export const FrappeCarousel: React.FC<FrappeCarouselProps> = ({
  products = orderProducts,
  activeIndex,
  onIndexChange,
  showIndexBadge = true,
}) => {
  const total = products.length;

  const handlePrev = useCallback(() => {
    onIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, onIndexChange, total]);

  const handleNext = useCallback(() => {
    onIndexChange((activeIndex + 1) % total);
  }, [activeIndex, onIndexChange, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (total === 0) return null;

  const safeIndex = (activeIndex + total) % total;
  const prevIndex = (safeIndex - 1 + total) % total;
  const nextIndex = (safeIndex + 1) % total;

  const currentProduct = products[safeIndex];
  const prevProduct = products[prevIndex];
  const nextProduct = products[nextIndex];

  const formattedCurrent = safeIndex + 1 < 10 ? `0${safeIndex + 1}` : `${safeIndex + 1}`;
  const formattedTotal = total < 10 ? `0${total}` : `${total}`;

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-1 xs:py-2 flex-1 min-h-0">
      {/* 3-Item Presentation Track */}
      <div className="relative flex items-center justify-center w-full max-w-xl px-1 sm:px-4 min-h-[220px] xs:min-h-[260px] sm:min-h-[310px] md:min-h-[350px] lg:min-h-[400px]">
        {/* Left Peek (Previous Product) */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="absolute -left-3 xs:left-0 sm:left-4 md:left-8 z-10 opacity-35 hover:opacity-75 transition-all cursor-pointer flex flex-col items-center filter blur-[0.5px] hover:blur-none"
          title="Ver producto anterior"
        >
          <FrappeMedallion product={prevProduct} size="sm" isCurrent={false} />
        </motion.div>

        {/* Navigation Arrow Left */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.06 }}
          onClick={handlePrev}
          className="absolute left-1 xs:left-2 sm:left-4 z-20 w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-[#2B1B12]/90 hover:bg-[#422B19] border border-[#E2C38F]/30 text-[#E2C38F] flex items-center justify-center shadow-xl transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -translate-x-0.5" />
        </motion.button>

        {/* Center Protagonist Medallion with Swipe Handling */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            const swipeThreshold = 35;
            if (info.offset.x > swipeThreshold) {
              handlePrev();
            } else if (info.offset.x < -swipeThreshold) {
              handleNext();
            }
          }}
          className="relative z-15 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center"
        >
          <FrappeMedallion
            product={currentProduct}
            size="lg"
            isCurrent={true}
          />
        </motion.div>

        {/* Right Peek (Next Product) */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="absolute -right-3 xs:right-0 sm:right-4 md:right-8 z-10 opacity-35 hover:opacity-75 transition-all cursor-pointer flex flex-col items-center filter blur-[0.5px] hover:blur-none"
          title="Ver producto siguiente"
        >
          <FrappeMedallion product={nextProduct} size="sm" isCurrent={false} />
        </motion.div>

        {/* Navigation Arrow Right */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.06 }}
          onClick={handleNext}
          className="absolute right-1 xs:right-2 sm:right-4 z-20 w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-[#2B1B12]/90 hover:bg-[#422B19] border border-[#E2C38F]/30 text-[#E2C38F] flex items-center justify-center shadow-xl transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 translate-x-0.5" />
        </motion.button>
      </div>

      {/* Index indicator badge under medallion with clear spacing */}
      {showIndexBadge && (
        <div className="mt-2 xs:mt-3 text-center flex-shrink-0">
          <span className="font-['Syne'] text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#C49C64] uppercase">
            — {formattedCurrent} · DE {formattedTotal} —
          </span>
        </div>
      )}
    </div>
  );
};
