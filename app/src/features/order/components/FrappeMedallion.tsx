import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../../types/product';

interface FrappeMedallionProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  isCurrent?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FrappeMedallion: React.FC<FrappeMedallionProps> = ({
  product,
  size = 'lg',
  isCurrent = true,
  onClick,
  className = '',
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const sizeDimensions = {
    sm: {
      container: 'w-[75px] h-[75px] xs:w-[95px] xs:h-[95px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px]',
      plate: 'w-[68px] h-[68px] xs:w-[85px] xs:h-[85px] sm:w-[108px] sm:h-[108px] md:w-[125px] md:h-[125px] lg:w-[140px] lg:h-[140px]',
      glow: 'w-[80px] h-[80px] xs:w-[100px] xs:h-[100px]',
    },
    md: {
      container: 'w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] lg:w-[240px] lg:h-[240px]',
      plate: 'w-[135px] h-[135px] sm:w-[170px] sm:h-[170px] lg:w-[215px] lg:h-[215px]',
      glow: 'w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]',
    },
    lg: {
      container: 'w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[310px] sm:h-[310px] md:w-[350px] md:h-[350px] lg:w-[390px] lg:h-[390px] xl:w-[420px] xl:h-[420px]',
      plate: 'w-[195px] h-[195px] xs:w-[235px] xs:h-[235px] sm:w-[280px] sm:h-[280px] md:w-[315px] md:h-[315px] lg:w-[355px] lg:h-[355px] xl:w-[385px] xl:h-[385px]',
      glow: 'w-[240px] h-[240px] xs:w-[285px] xs:h-[285px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
    },
  }[size];

  const imageKey = `${product.id}-${product.image}`;
  const isImageFailed = Boolean(failedImages[imageKey]);
  const hasImage = Boolean(product.image && product.image.trim().length > 0 && !isImageFailed);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frappe':
        return '🥤';
      case 'cold':
      case 'latte':
        return '🧊';
      default:
        return '☕';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none ${sizeDimensions.container} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Radial Gold Glow */}
      {isCurrent && (
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.32, 0.52, 0.32],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full pointer-events-none ${sizeDimensions.glow}`}
          style={{
            background: 'radial-gradient(circle, rgba(226,195,143,0.32) 0%, rgba(226,195,143,0.12) 55%, transparent 75%)',
            filter: 'blur(24px)',
          }}
        />
      )}

      {/* Ambient Shadow under the medallion */}
      <div
        className="absolute -bottom-3 w-[82%] h-7 rounded-full pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(28,17,12,0.45) 60%, transparent 80%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Outer Golden Accented Ring */}
      <motion.div
        className={`absolute rounded-full border border-[#C49C64]/45 z-10 pointer-events-none ${sizeDimensions.plate}`}
        style={{
          boxShadow: isCurrent ? '0 0 22px rgba(226, 195, 143, 0.25), inset 0 0 14px rgba(226, 195, 143, 0.14)' : 'none',
        }}
        animate={{
          rotate: isCurrent ? 360 : 0,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E2C38F] shadow-[0_0_8px_#E2C38F]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C49C64]" />
      </motion.div>

      {/* Circular Image Plate */}
      <div
        className={`relative overflow-hidden rounded-full z-0 bg-[#2B1B12] border-2 border-[#E2C38F]/35 shadow-2xl ${sizeDimensions.plate}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ scale: 0.92, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.92, opacity: 0, rotate: 4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {hasImage ? (
              <img
                key={imageKey}
                src={product.image}
                alt={product.alt || product.name}
                onError={() => {
                  setFailedImages(prev => ({ ...prev, [imageKey]: true }));
                }}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#2B1B12] via-[#352217] to-[#1C110C]">
                <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow">
                  {getCategoryIcon(product.category)}
                </span>
                <span className="text-[#E2C38F] font-['Syne'] text-[10px] sm:text-xs font-bold uppercase tracking-wider max-w-[90%] truncate">
                  {product.name}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Soft Vignette Overlay for Depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#1C110C]/40 via-transparent to-[#E2C38F]/10 pointer-events-none" />
      </div>
    </div>
  );
};
