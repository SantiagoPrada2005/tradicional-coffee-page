import React, { useState, useEffect } from 'react';
import type { Product } from '../../../types/product';
import type { CartItem } from '../utils/whatsapp';
import { parseProductPrice } from '../../../data/frappes';
import { OrderContext } from './OrderContextDef';

const STORAGE_KEY_CART = 'tc_order_cart';
const STORAGE_KEY_NOTE = 'tc_order_note';
const STORAGE_KEY_ADDRESS = 'tc_order_address';

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

  const [deliveryAddress, setDeliveryAddressState] = useState<string>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADDRESS) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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

  const setDeliveryAddress = (address: string) => {
    setDeliveryAddressState(address);
    try {
      sessionStorage.setItem(STORAGE_KEY_ADDRESS, address);
    } catch (e) {
      console.error('Failed to save address to storage', e);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (quantity <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const setQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setPreparationNoteState('');
    setDeliveryAddressState('');
    sessionStorage.removeItem(STORAGE_KEY_CART);
    sessionStorage.removeItem(STORAGE_KEY_NOTE);
    sessionStorage.removeItem(STORAGE_KEY_ADDRESS);
  };

  const getProductQuantity = (productId: number) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const unitPrice = parseProductPrice(item.product.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <OrderContext.Provider
      value={{
        cart,
        totalCount,
        totalAmount,
        preparationNote,
        deliveryAddress,
        isCartOpen,
        isNoteModalOpen,
        isAddressModalOpen,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        setPreparationNote,
        setDeliveryAddress,
        setIsCartOpen,
        setIsNoteModalOpen,
        setIsAddressModalOpen,
        getProductQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
