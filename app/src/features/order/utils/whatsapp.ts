import type { Product } from '../../../types/product';
import { parseProductPrice } from '../../../data/frappes';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount).replace('COP', '').trim();
}

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  totalAmount: number,
  preparationNote?: string,
  phoneNumber: string = "573147774388"
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  let message = `☕ *¡Hola Tradicional Coffee! Quiero hacer el siguiente pedido:*\n\n`;

  items.forEach(item => {
    const unitPrice = parseProductPrice(item.product.price);
    const subtotal = unitPrice * item.quantity;
    message += `• *${item.quantity}x* ${item.product.name} — $${formatCurrency(subtotal).replace('$', '')}\n`;
  });

  if (preparationNote && preparationNote.trim().length > 0) {
    message += `\n📝 *Nota de preparación:* ${preparationNote.trim()}\n`;
  }

  message += `\n💰 *Total del pedido:* $${formatCurrency(totalAmount).replace('$', '')}\n`;
  message += `\n📍 *Lugar de entrega / Mesa:* (por favor indicar)\n`;
  message += `\n_Enviado desde el portal de pedidos de Tradicional Coffee_`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
