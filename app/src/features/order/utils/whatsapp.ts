import type { FrappeItem } from '../../../data/frappes';

export interface CartItem {
  frappe: FrappeItem;
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
  phoneNumber: string = "573126120456"
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  let message = `☕ *¡Hola Tradicional Coffee! Quiero hacer el siguiente pedido de frappes:*\n\n`;

  items.forEach(item => {
    const subtotal = item.frappe.price * item.quantity;
    message += `• *${item.quantity}x* ${item.frappe.name} — $${formatCurrency(subtotal).replace('$', '')}\n`;
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
