import type { Product } from '../../../types/product';
import { parseProductPrice } from '../../../data/frappes';
import { trackOrderConversion, type PixelProductPayload } from '../../../lib/metaPixel';
import { trackEcommerceEvent } from '../../../lib/analytics';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function trackOrderPlacement(
  items: CartItem[],
  totalAmount: number,
  totalCount: number
): void {
  const itemsPayload: PixelProductPayload[] = items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: parseProductPrice(item.product.price),
    category: item.product.category,
    quantity: item.quantity,
  }));
  trackOrderConversion(itemsPayload, totalAmount, totalCount);
  trackEcommerceEvent('purchase', totalAmount, {
    itemsCount: totalCount,
    items: items.map(i => ({
      id: i.product.id,
      name: i.product.name,
      quantity: i.quantity,
      price: parseProductPrice(i.product.price),
    })),
  });
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
