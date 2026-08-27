import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showTrashAtMin?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = 'lg',
  showTrashAtMin = false,
  className = '',
}) => {
  const isSm = size === 'sm';
  const isAtMin = value <= min;
  const isOne = value === 1;

  return (
    <div
      className={`inline-flex items-center select-none bg-[#EFE4CD] text-[#2B1B12] rounded-full px-2 py-1 shadow-sm border border-[#E2D3BB]/60 ${
        isSm ? 'gap-2 text-sm' : 'gap-4 md:gap-5 text-base md:text-lg px-3 py-1.5'
      } ${className}`}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={onDecrement}
        disabled={isAtMin && !showTrashAtMin}
        aria-label={isOne && showTrashAtMin ? 'Eliminar producto' : 'Disminuir cantidad'}
        title={isOne && showTrashAtMin ? 'Eliminar producto' : 'Disminuir cantidad'}
        className={`flex items-center justify-center rounded-full font-medium transition-colors text-[#2B1B12] hover:bg-[#E2D3BB]/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
          isSm ? 'w-6 h-6 text-sm' : 'w-9 h-9 text-xl'
        } ${isOne && showTrashAtMin ? 'text-[#A84836] hover:text-[#C93B24]' : ''}`}
      >
        {isOne && showTrashAtMin ? (
          <Trash2 className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
        ) : (
          '−'
        )}
      </motion.button>

      <motion.span
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={`font-semibold font-['Plus_Jakarta_Sans'] text-center tabular-nums ${
          isSm ? 'min-w-[1.2rem] text-sm' : 'min-w-[1.8rem] text-lg text-[#2B1B12]'
        }`}
      >
        {value}
      </motion.span>

      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className={`flex items-center justify-center rounded-full font-medium transition-colors bg-[#C49C64] text-[#2B1B12] hover:bg-[#D6A354] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
          isSm ? 'w-6 h-6 text-sm' : 'w-9 h-9 text-xl'
        }`}
      >
        +
      </motion.button>
    </div>
  );
};
