import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FrappeItem } from '../../../data/frappes';

interface FrappeMedallionProps {
  frappe: FrappeItem;
  size?: 'sm' | 'md' | 'lg';
  isCurrent?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FrappeMedallion: React.FC<FrappeMedallionProps> = ({
  frappe,
  size = 'lg',
  isCurrent = true,
  onClick,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeDimensions = {
    sm: {
      container: 'w-[140px] h-[140px] md:w-[180px] md:h-[180px]',
      plate: 'w-[120px] h-[120px] md:w-[150px] md:h-[150px]',
      glow: 'w-[140px] h-[140px]',
      stroke: 1.5,
    },
    md: {
      container: 'w-[220px] h-[220px] md:w-[260px] md:h-[260px]',
      plate: 'w-[200px] h-[200px] md:w-[230px] md:h-[230px]',
      glow: 'w-[220px] h-[220px]',
      stroke: 2,
    },
    lg: {
      container: 'w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
      plate: 'w-[250px] h-[250px] sm:w-[290px] sm:h-[290px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px]',
      glow: 'w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]',
      stroke: 2.5,
    },
  }[size];

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
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full pointer-events-none ${sizeDimensions.glow}`}
          style={{
            background: 'radial-gradient(circle, rgba(226,195,143,0.3) 0%, rgba(226,195,143,0.12) 55%, transparent 75%)',
            filter: 'blur(28px)',
          }}
        />
      )}

      {/* Ambient Shadow under the medallion */}
      <div
        className="absolute -bottom-4 w-[80%] h-10 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(28,17,12,0.4) 60%, transparent 80%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Outer Golden Accented Ring */}
      <motion.div
        className={`absolute rounded-full border border-[#C49C64]/40 z-10 pointer-events-none ${sizeDimensions.plate}`}
        style={{
          boxShadow: isCurrent ? '0 0 25px rgba(226, 195, 143, 0.25), inset 0 0 15px rgba(226, 195, 143, 0.15)' : 'none',
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E2C38F] shadow-[0_0_8px_#E2C38F]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C49C64]" />
      </motion.div>

      {/* Circular Image Plate */}
      <div
        className={`relative overflow-hidden rounded-full z-0 bg-[#2B1B12] border-2 border-[#E2C38F]/30 shadow-2xl ${sizeDimensions.plate}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={frappe.id}
            initial={{ scale: 0.92, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.92, opacity: 0, rotate: 4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {!imgError ? (
              <img
                src={frappe.image}
                alt={frappe.alt}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#2B1B12] to-[#1C110C]">
                <span className="text-3xl mb-1">🥤</span>
                <span className="text-[#E2C38F] font-['Syne'] text-xs font-semibold uppercase tracking-wider">
                  {frappe.name}
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
