import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FRAPPES_CATALOG } from '../../../data/frappes';
import { FrappeMedallion } from './FrappeMedallion';

interface FrappeCarouselProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export const FrappeCarousel: React.FC<FrappeCarouselProps> = ({
  activeIndex,
  onIndexChange,
}) => {
  const total = FRAPPES_CATALOG.length;

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

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const currentFrappe = FRAPPES_CATALOG[activeIndex];
  const prevFrappe = FRAPPES_CATALOG[prevIndex];
  const nextFrappe = FRAPPES_CATALOG[nextIndex];

  return (
    <div className="relative w-full flex items-center justify-center py-4 sm:py-8 select-none">
      {/* Navigation Arrow Left (Desktop & Tablet) */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 md:left-8 lg:left-12 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#2B1B12]/80 hover:bg-[#422B19] border border-[#E2C38F]/30 text-[#E2C38F] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Ver frappe anterior"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 -translate-x-0.5" />
      </motion.button>

      {/* Main Carousel Presentation Area */}
      <div className="relative flex items-center justify-center w-full max-w-4xl px-2 sm:px-4">
        {/* Left Peek (Previous Frappe) */}
        <div
          onClick={handlePrev}
          className="hidden md:block absolute -left-12 lg:-left-20 transform -translate-x-1/2 opacity-35 hover:opacity-70 scale-75 transition-all duration-300 cursor-pointer z-0 filter blur-[1px] hover:blur-none"
        >
          <FrappeMedallion frappe={prevFrappe} size="sm" isCurrent={false} />
        </div>

        {/* Center Protagonist Medallion with Swipe Handling */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            const swipeThreshold = 50;
            if (info.offset.x > swipeThreshold) {
              handlePrev();
            } else if (info.offset.x < -swipeThreshold) {
              handleNext();
            }
          }}
          className="relative z-10 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center"
        >
          <FrappeMedallion
            frappe={currentFrappe}
            size="lg"
            isCurrent={true}
          />
        </motion.div>

        {/* Right Peek (Next Frappe) */}
        <div
          onClick={handleNext}
          className="hidden md:block absolute -right-12 lg:-right-20 transform translate-x-1/2 opacity-35 hover:opacity-70 scale-75 transition-all duration-300 cursor-pointer z-0 filter blur-[1px] hover:blur-none"
        >
          <FrappeMedallion frappe={nextFrappe} size="sm" isCurrent={false} />
        </div>
      </div>

      {/* Navigation Arrow Right (Desktop & Tablet) */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        onClick={handleNext}
        className="absolute right-2 sm:right-4 md:right-8 lg:right-12 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#2B1B12]/80 hover:bg-[#422B19] border border-[#E2C38F]/30 text-[#E2C38F] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Ver frappe siguiente"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 translate-x-0.5" />
      </motion.button>
    </div>
  );
};
