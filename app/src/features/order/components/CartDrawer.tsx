import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, MessageSquarePlus, Edit3 } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
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
    setIsNoteModalOpen,
  } = useOrder();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-[#0A0604]/80 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md md:max-w-lg bg-[#FBF6EB] text-[#2B1B12] shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 sm:p-8 border-b border-[#E2D3BB]/70 flex items-center justify-between bg-[#F4EDDF]/60">
              <div>
                <span className="font-['Syne'] tracking-[0.16em] text-[11px] font-bold text-[#C49C64] uppercase block">
                  RESUMEN DE COMPRA
                </span>
                <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#2B1B12] leading-tight">
                  Tu pedido
                </h2>
                <p className="text-xs font-['Syne'] text-[#7A6854] font-semibold tracking-wider uppercase mt-0.5">
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
                  className="w-9 h-9 rounded-full bg-[#EFE4CD] hover:bg-[#E2D3BB] flex items-center justify-center text-[#2B1B12] transition-colors cursor-pointer"
                  aria-label="Cerrar pedido"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#EFE4CD] flex items-center justify-center text-3xl text-[#C49C64]">
                    🥤
                  </div>
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#2B1B12]">
                      Aún no has agregado frappes
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A6854] font-['Plus_Jakarta_Sans'] max-w-xs mt-1">
                      Explora el carrusel y elige tus combinaciones favoritas para armar tu pedido.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#2B1B12] text-[#E2C38F] font-['Syne'] text-xs uppercase font-bold tracking-wider hover:bg-[#422B19] transition-all cursor-pointer"
                  >
                    Explorar frappes
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map(item => (
                    <motion.div
                      key={item.frappe.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-[#F4EDDF] border border-[#E2D3BB]/80 shadow-sm"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#C49C64]/40 flex-shrink-0 bg-[#2B1B12]">
                        <img
                          src={item.frappe.image}
                          alt={item.frappe.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm sm:text-base text-[#2B1B12] truncate">
                          {item.frappe.name}
                        </h4>
                        <p className="text-xs text-[#7A6854] font-['Plus_Jakarta_Sans']">
                          {formatCurrency(item.frappe.price)} c/u
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Stepper
                          size="sm"
                          value={item.quantity}
                          onIncrement={() => updateQuantity(item.frappe.id, 1)}
                          onDecrement={() => updateQuantity(item.frappe.id, -1)}
                        />
                        <span className="text-[11px] font-bold text-[#C49C64] font-['Plus_Jakarta_Sans']">
                          {formatCurrency(item.frappe.price * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Section: Notes & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 sm:p-8 border-t border-[#E2D3BB]/80 bg-[#F4EDDF]/80 space-y-4">
                {/* Note Card */}
                <div
                  onClick={() => setIsNoteModalOpen(true)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EFE4CD] hover:bg-[#E2D3BB]/70 border border-[#E2D3BB] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-[#C49C64] text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                      {preparationNote ? <Edit3 className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <span className="text-[11px] font-['Syne'] uppercase font-bold text-[#7A6854] block">
                        Nota de preparación
                      </span>
                      <p className="text-xs font-['Plus_Jakarta_Sans'] font-medium text-[#2B1B12] truncate">
                        {preparationNote ? `“${preparationNote}”` : '¿Alguna indicación para el barista?'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-['Syne'] font-bold text-[#C49C64] uppercase flex-shrink-0 ml-2">
                    {preparationNote ? 'Editar' : '+ Agregar'}
                  </span>
                </div>

                {/* Subtotals & Total */}
                <div className="space-y-1.5 pt-1 text-sm font-['Plus_Jakarta_Sans']">
                  <div className="flex justify-between text-[#7A6854] text-xs">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#2B1B12]">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[#7A6854] text-xs">
                    <span>Entrega</span>
                    <span className="font-semibold text-[#C49C64]">A coordinar</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-[#E2D3BB]/60">
                    <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#2B1B12]">
                      Total
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#2B1B12]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="space-y-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 px-6 rounded-full bg-[#2B1B12] hover:bg-[#422B19] text-[#E2C38F] font-['Syne'] font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(43,27,18,0.35)] transition-all cursor-pointer"
                  >
                    <span>HACER PEDIDO POR WHATSAPP</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p className="text-[11px] text-center text-[#7A6854] font-['Plus_Jakarta_Sans']">
                    Confirmaremos tu pedido y método de entrega por WhatsApp
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
