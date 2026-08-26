import React, { useState, useEffect } from 'react';
import type { FrappeItem } from '../../../data/frappes';
import type { CartItem } from '../utils/whatsapp';
import { OrderContext } from './OrderContextDef';

const STORAGE_KEY_CART = 'tc_order_cart';
const STORAGE_KEY_NOTE = 'tc_order_note';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [preparationNote, setPreparationNoteState] = useState<string>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_NOTE) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart]);

  const setPreparationNote = (note: string) => {
    setPreparationNoteState(note);
    try {
      sessionStorage.setItem(STORAGE_KEY_NOTE, note);
    } catch (e) {
      console.error('Failed to save note to storage', e);
    }
  };

  const addToCart = (frappe: FrappeItem, quantity: number = 1) => {
    if (quantity <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.frappe.id === frappe.id);
      if (existing) {
        return prev.map(item =>
          item.frappe.id === frappe.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { frappe, quantity }];
    });
  };

  const updateQuantity = (frappeId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.frappe.id === frappeId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const setQuantity = (frappeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(frappeId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.frappe.id === frappeId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (frappeId: string) => {
    setCart(prev => prev.filter(item => item.frappe.id !== frappeId));
  };

  const clearCart = () => {
    setCart([]);
    setPreparationNoteState('');
    sessionStorage.removeItem(STORAGE_KEY_CART);
    sessionStorage.removeItem(STORAGE_KEY_NOTE);
  };

  const getFrappeQuantity = (frappeId: string) => {
    const item = cart.find(i => i.frappe.id === frappeId);
    return item ? item.quantity : 0;
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.frappe.price * item.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        cart,
        totalCount,
        totalAmount,
        preparationNote,
        isCartOpen,
        isNoteModalOpen,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        setPreparationNote,
        setIsCartOpen,
        setIsNoteModalOpen,
        getFrappeQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
