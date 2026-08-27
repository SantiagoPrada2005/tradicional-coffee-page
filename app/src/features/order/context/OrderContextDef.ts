import { createContext } from 'react';
import type { Product } from '../../../types/product';
import type { CartItem } from '../utils/whatsapp';

export interface OrderContextType {
  cart: CartItem[];
  totalCount: number;
  totalAmount: number;
  preparationNote: string;
  isCartOpen: boolean;
  isNoteModalOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  setPreparationNote: (note: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsNoteModalOpen: (open: boolean) => void;
  getProductQuantity: (productId: number) => number;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);
