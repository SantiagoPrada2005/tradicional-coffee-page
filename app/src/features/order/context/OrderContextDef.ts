import { createContext } from 'react';
import type { FrappeItem } from '../../../data/frappes';
import type { CartItem } from '../utils/whatsapp';

export interface OrderContextType {
  cart: CartItem[];
  totalCount: number;
  totalAmount: number;
  preparationNote: string;
  isCartOpen: boolean;
  isNoteModalOpen: boolean;
  addToCart: (frappe: FrappeItem, quantity?: number) => void;
  updateQuantity: (frappeId: string, delta: number) => void;
  setQuantity: (frappeId: string, quantity: number) => void;
  removeFromCart: (frappeId: string) => void;
  clearCart: () => void;
  setPreparationNote: (note: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsNoteModalOpen: (open: boolean) => void;
  getFrappeQuantity: (frappeId: string) => number;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);
