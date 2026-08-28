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
  deliveryAddress?: string,
  phoneNumber: string = "573218322393"
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  const lines: string[] = [
    '*Pedido - Tradicional Coffee*',
    '',
    '*Detalle:*',
    ...items.map(item => {
      const unitPrice = parseProductPrice(item.product.price);
      const subtotal = unitPrice * item.quantity;
      return `- ${item.quantity}x ${item.product.name} ($${formatCurrency(subtotal).replace('$', '')})`;
    }),
    '',
    `*Total:* $${formatCurrency(totalAmount).replace('$', '')}`,
  ];

  if (deliveryAddress && deliveryAddress.trim().length > 0) {
    lines.push(`*Entrega:* ${deliveryAddress.trim()}`);
  }

  if (preparationNote && preparationNote.trim().length > 0) {
    lines.push(`*Nota:* ${preparationNote.trim()}`);
  }

  const encodedMessage = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
