import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, ArrowRight, MessageSquarePlus, Edit3, MapPin } from 'lucide-react';
import type { Product } from '../../../types/product';
import { useOrder } from '../context/useOrder';
import { Stepper } from './Stepper';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { parseProductPrice } from '../../../data/frappes';

interface DesktopConfigPanelProps {
  product: Product;
}

export const DesktopConfigPanel: React.FC<DesktopConfigPanelProps> = ({ product }) => {
  const {
    cart,
    totalCount,
    totalAmount,
    addToCart,
    preparationNote,
    deliveryAddress,
    setIsNoteModalOpen,
    setIsAddressModalOpen,
    setIsCartOpen,
  } = useOrder();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = parseProductPrice(product.price);

  const handleAdd = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    if (!deliveryAddress.trim()) {
      setIsAddressModalOpen(true);
      return;
    }
    const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote, deliveryAddress);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-[340px] bg-[#FBF6EB] text-[#2B1B12] rounded-[28px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#E2D3BB] flex flex-col justify-between z-10 space-y-4">
      {/* Top Section: Configure current product */}
      <div className="space-y-3.5">
        <h3 className="font-['Syne'] text-base font-bold text-[#2B1B12] tracking-wide">
          Configura tu pedido
        </h3>

        {/* Quantity Row */}
        <div className="flex items-center justify-between py-1">
          <span className="text-sm font-['Plus_Jakarta_Sans'] font-medium text-[#7A6854]">
            Cantidad
          </span>
          <Stepper
            value={quantity}
            onIncrement={() => setQuantity(q => q + 1)}
            onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
            size="md"
          />
        </div>

        {/* Add to order button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleAdd}
          className={`w-full py-3.5 px-4 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#2B1B12] text-[#E2C38F]'
              : 'bg-[#C49C64] hover:bg-[#D6A354] text-[#422B19]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-[#E2C38F]" />
              <span>¡AGREGADO AL PEDIDO!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>AGREGAR AL PEDIDO</span>
              <span className="text-[11px] font-mono opacity-85">· {formatCurrency(unitPrice * quantity)}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#E2D3BB]" />

      {/* Accumulated Order List */}
      <div className="space-y-2.5 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-['Syne'] text-[11px] font-bold tracking-[0.16em] text-[#7A6854] uppercase">
            PEDIDO ACUMULADO
          </span>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="text-[11px] font-['Syne'] font-bold text-[#C49C64] hover:underline uppercase cursor-pointer"
            >
              Ver todo ({totalCount})
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-xs text-[#7A6854] font-['Plus_Jakarta_Sans'] italic py-2">
            No has agregado productos aún.
          </p>
        ) : (
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {cart.slice(0, 3).map(item => {
              const itemTotal = parseProductPrice(item.product.price) * item.quantity;
              const hasImg = Boolean(item.product.image && item.product.image.trim().length > 0);

              return (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[#F4EDDF] border border-[#E2D3BB]/60 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C49C64]/40 bg-[#2B1B12] flex-shrink-0 flex items-center justify-center">
                      {hasImg ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs">☕</span>
                      )}
                    </div>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#2B1B12] truncate">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[#7A6854] font-medium whitespace-nowrap text-[11px]">
                    {item.quantity} · {formatCurrency(itemTotal)}
                  </span>
                </div>
              );
            })}
            {cart.length > 3 && (
              <p className="text-[10px] text-center text-[#7A6854] font-['Plus_Jakarta_Sans']">
                + {cart.length - 3} producto(s) más
              </p>
            )}
          </div>
        )}
      </div>

      {/* Delivery Address Shortcut */}
      <div
        onClick={() => setIsAddressModalOpen(true)}
        className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-colors text-xs ${
          deliveryAddress
            ? 'bg-[#EFE4CD] hover:bg-[#E2D3BB]/70 border-[#C49C64]/60'
            : 'bg-[#FBEED7] hover:bg-[#F4E0C0] border-[#C49C64]'
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 rounded-full bg-[#C49C64] text-[#2B1B12] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#2B1B12] truncate">
            {deliveryAddress ? deliveryAddress : '+ Definir dirección'}
          </span>
        </div>
        <span className="text-[10px] font-['Syne'] font-bold text-[#C49C64] uppercase flex-shrink-0 ml-1">
          {deliveryAddress ? 'Editar' : 'Dirección'}
        </span>
      </div>

      {/* Note Shortcut */}
      <div
        onClick={() => setIsNoteModalOpen(true)}
        className="flex items-center justify-between p-2 rounded-xl bg-[#F4EDDF] hover:bg-[#EFE4CD] border border-[#E2D3BB] cursor-pointer transition-colors text-xs"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 rounded-full bg-[#C49C64] text-[#2B1B12] flex items-center justify-center flex-shrink-0">
            {preparationNote ? <Edit3 className="w-3 h-3" /> : <MessageSquarePlus className="w-3 h-3" />}
          </div>
          <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#2B1B12] truncate">
            {preparationNote ? `“${preparationNote}”` : '+ Agregar nota'}
          </span>
        </div>
        <span className="text-[10px] font-['Syne'] font-bold text-[#C49C64] uppercase flex-shrink-0 ml-1">
          {preparationNote ? 'Editar' : 'Nota'}
        </span>
      </div>

      {/* Total & Primary CTA Button */}
      <div className="space-y-3 pt-1 border-t border-[#E2D3BB]">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-['Plus_Jakarta_Sans'] font-medium text-[#7A6854]">
            {totalCount} {totalCount === 1 ? 'producto' : 'productos'}
          </span>
          <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#2B1B12]">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={cart.length > 0 ? handleWhatsAppCheckout : () => setIsCartOpen(true)}
          disabled={totalCount === 0}
          className={`w-full py-3.5 px-4 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            totalCount > 0
              ? 'bg-[#422B19] hover:bg-[#2B1B12] text-[#E2C38F]'
              : 'bg-[#EFE4CD] text-[#7A6854] opacity-60 cursor-not-allowed'
          }`}
        >
          <span>HACER PEDIDO</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
