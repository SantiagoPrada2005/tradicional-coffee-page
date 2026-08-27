import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, MessageSquarePlus, Edit3, MapPin } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { parseProductPrice } from '../../../data/frappes';
import { Stepper } from './Stepper';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    totalCount,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    clearCart,
    preparationNote,
    deliveryAddress,
    setIsNoteModalOpen,
    setIsAddressModalOpen,
  } = useOrder();

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    if (!deliveryAddress.trim()) {
      setIsAddressModalOpen(true);
      return;
    }
    const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote, deliveryAddress);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const mobileVariants = {
    initial: { y: '100%', opacity: 0.6 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0.6 },
  };

  const desktopVariants = {
    initial: { x: '100%', opacity: 0.6 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0.6 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end md:justify-stretch pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#0A0604]/80 backdrop-blur-md z-40"
          />

          {/* Modal / Drawer Panel */}
          <div className="relative z-50 w-full md:fixed md:inset-y-0 md:right-0 md:left-auto md:max-w-md md:w-full flex">
            <motion.div
              variants={isMobile ? mobileVariants : desktopVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 320,
                mass: 0.8,
              }}
              drag={isMobile ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.04, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (isMobile && (info.offset.y > 100 || info.velocity.y > 500)) {
                  setIsCartOpen(false);
                }
              }}
              className="w-full h-[88dvh] max-h-[88dvh] md:h-full md:max-h-full bg-[#FBF6EB] text-[#2B1B12] shadow-[0_-10px_35px_rgba(0,0,0,0.5)] md:shadow-2xl flex flex-col justify-between overflow-hidden rounded-t-[28px] sm:rounded-t-[32px] md:rounded-t-none md:rounded-l-[28px] border-t md:border-t-0 md:border-l border-[#E2D3BB]"
            >
              {/* Mobile Drag Indicator Handle */}
              <div className="w-full pt-3 pb-1 flex items-center justify-center md:hidden flex-shrink-0 bg-[#F4EDDF]/60 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-[#C49C64]/40" />
              </div>

              {/* Drawer Header */}
              <div className="px-5 py-4 sm:p-6 md:p-8 border-b border-[#E2D3BB]/70 flex items-center justify-between bg-[#F4EDDF]/60 flex-shrink-0">
                <div>
                  <span className="font-['Syne'] tracking-[0.16em] text-[10px] sm:text-[11px] font-bold text-[#C49C64] uppercase block">
                    RESUMEN DE COMPRA
                  </span>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B12] leading-tight">
                    Tu pedido
                  </h2>
                  <p className="text-[11px] sm:text-xs font-['Syne'] text-[#7A6854] font-semibold tracking-wider uppercase mt-0.5">
                    {totalCount} {totalCount === 1 ? 'PRODUCTO' : 'PRODUCTOS'} · {formatCurrency(totalAmount)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="p-2 text-[#7A6854] hover:text-[#2B1B12] transition-colors text-xs font-['Syne'] uppercase cursor-pointer"
                      title="Vaciar pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFE4CD] hover:bg-[#E2D3BB] flex items-center justify-center text-[#2B1B12] transition-colors cursor-pointer"
                    aria-label="Cerrar pedido"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items Scrollable List */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:p-6 md:p-8 space-y-3.5 min-h-0">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 sm:py-16 space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EFE4CD] flex items-center justify-center text-2xl sm:text-3xl text-[#C49C64]">
                      ☕
                    </div>
                    <div>
                      <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold text-[#2B1B12]">
                        Aún no has agregado productos
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7A6854] font-['Plus_Jakarta_Sans'] max-w-xs mt-1">
                        Explora el carrusel y elige tus bebidas favoritas para armar tu pedido.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 px-5 py-2.5 rounded-full bg-[#2B1B12] text-[#E2C38F] font-['Syne'] text-xs uppercase font-bold tracking-wider hover:bg-[#422B19] transition-all cursor-pointer"
                    >
                      Explorar bebidas
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => {
                      const unitPrice = parseProductPrice(item.product.price);
                      const subtotal = unitPrice * item.quantity;
                      const hasImg = Boolean(item.product.image && item.product.image.trim().length > 0);

                      return (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#F4EDDF] border border-[#E2D3BB]/80 shadow-sm"
                        >
                          {/* Product Thumbnail */}
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-[#C49C64]/40 flex-shrink-0 bg-[#2B1B12] flex items-center justify-center">
                            {hasImg ? (
                              <img
                                src={item.product.image}
                                alt={item.product.alt || item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-lg">☕</span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs sm:text-sm md:text-base text-[#2B1B12] truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-[#7A6854] font-['Plus_Jakarta_Sans']">
                              {item.product.price} c/u
                            </p>
                          </div>

                          {/* Quantity Stepper & Price */}
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <Stepper
                              size="sm"
                              value={item.quantity}
                              onIncrement={() => updateQuantity(item.product.id, 1)}
                              onDecrement={() => updateQuantity(item.product.id, -1)}
                            />
                            <span className="text-[11px] font-bold text-[#C49C64] font-['Plus_Jakarta_Sans']">
                              {formatCurrency(subtotal)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Section: Delivery Address, Notes & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 md:p-8 border-t border-[#E2D3BB]/80 bg-[#F4EDDF]/90 backdrop-blur-sm space-y-3 flex-shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {/* Delivery Address Card */}
                  <div
                    onClick={() => setIsAddressModalOpen(true)}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${
                      deliveryAddress
                        ? 'bg-[#EFE4CD] hover:bg-[#E2D3BB]/70 border-[#C49C64]/60'
                        : 'bg-[#FBEED7] hover:bg-[#F4E0C0] border-[#C49C64] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C49C64] text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] sm:text-[11px] font-['Syne'] uppercase font-bold text-[#7A6854] block">
                          Lugar de entrega / Dirección <span className="text-[#C49C64]">*</span>
                        </span>
                        <p className="text-xs font-['Plus_Jakarta_Sans'] font-medium text-[#2B1B12] truncate">
                          {deliveryAddress ? deliveryAddress : 'Indicar mesa, dirección o local'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-['Syne'] font-bold text-[#C49C64] uppercase flex-shrink-0 ml-2">
                      {deliveryAddress ? 'Editar' : '+ Definir'}
                    </span>
                  </div>

                  {/* Note Card */}
                  <div
                    onClick={() => setIsNoteModalOpen(true)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#EFE4CD] hover:bg-[#E2D3BB]/70 border border-[#E2D3BB] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C49C64]/70 text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                        {preparationNote ? <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <MessageSquarePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] sm:text-[11px] font-['Syne'] uppercase font-bold text-[#7A6854] block">
                          Nota de preparación
                        </span>
                        <p className="text-xs font-['Plus_Jakarta_Sans'] font-medium text-[#2B1B12] truncate">
                          {preparationNote ? `“${preparationNote}”` : '¿Alguna indicación para el barista?'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-['Syne'] font-bold text-[#C49C64] uppercase flex-shrink-0 ml-2">
                      {preparationNote ? 'Editar' : '+ Agregar'}
                    </span>
                  </div>

                  {/* Subtotals & Total */}
                  <div className="space-y-1 pt-1 text-sm font-['Plus_Jakarta_Sans']">
                    <div className="flex justify-between text-[#7A6854] text-xs">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#2B1B12]">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-[#7A6854] text-xs">
                      <span>Entrega</span>
                      <span className="font-semibold text-[#C49C64]">
                        {deliveryAddress ? 'Dirección indicada' : 'A coordinar'}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1.5 border-t border-[#E2D3BB]/60">
                      <span className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold text-[#2B1B12]">
                        Total
                      </span>
                      <span className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-[#2B1B12]">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-1.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#2B1B12] hover:bg-[#422B19] text-[#E2C38F] font-['Syne'] font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(43,27,18,0.35)] transition-all cursor-pointer"
                    >
                      <span>HACER PEDIDO POR WHATSAPP</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <p className="text-[10px] sm:text-[11px] text-center text-[#7A6854] font-['Plus_Jakarta_Sans']">
                      Confirmaremos tu pedido y método de entrega por WhatsApp
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
