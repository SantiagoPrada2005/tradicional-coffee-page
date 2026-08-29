// Meta Pixel TypeScript definitions and helper utilities

declare global {
  interface Window {
    fbq?: ((...args: any[]) => void) | undefined;
    _fbq?: any;
  }
}

export interface PixelProductPayload {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
}

let isInitialized = false;

/**
 * Helper to safely get the fbq function if attached to window.
 */
function getFbq(): ((...args: any[]) => void) | null {
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    return (window as any).fbq;
  }
  return null;
}

/**
 * Initializes the Meta Pixel script asynchronously and configures the Pixel ID.
 */
export const initMetaPixel = (pixelId?: string): void => {
  if (typeof window === 'undefined') return;
  if (isInitialized || getFbq()) return;

  const id = pixelId || import.meta.env.VITE_META_PIXEL_ID;
  if (!id) {
    if (import.meta.env.DEV) {
      console.info('[Meta Pixel] No VITE_META_PIXEL_ID provided. Skipping initialization.');
    }
    return;
  }

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  const fbq = getFbq();
  if (fbq) {
    fbq('init', id);
    isInitialized = true;
    if (import.meta.env.DEV) {
      console.info(`[Meta Pixel] Initialized with ID: ${id}`);
    }
  }
};

/**
 * Tracks virtual page transitions in Single Page Applications.
 */
export const trackPageView = (): void => {
  if (typeof window === 'undefined') return;
  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'PageView');
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] PageView tracked (mock/dev)');
  }
};

/**
 * Tracks viewing product details (e.g. Menu Modal or Order carousel focus).
 */
export const trackViewContent = (product: PixelProductPayload): void => {
  if (typeof window === 'undefined') return;
  const payload = {
    content_name: product.name,
    content_category: product.category || 'Bebidas',
    content_ids: [String(product.id)],
    content_type: 'product',
    value: product.price,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'ViewContent', payload);
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] ViewContent:', payload);
  }
};

/**
 * Tracks adding a product to the cart.
 */
export const trackAddToCart = (product: PixelProductPayload, quantity: number = 1): void => {
  if (typeof window === 'undefined') return;
  const subtotal = product.price * quantity;
  const payload = {
    content_name: product.name,
    content_category: product.category || 'Bebidas',
    content_ids: [String(product.id)],
    content_type: 'product',
    contents: [
      {
        id: String(product.id),
        quantity,
        item_price: product.price,
      },
    ],
    value: subtotal,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'AddToCart', payload);
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] AddToCart:', payload);
  }
};

/**
 * Tracks reviewing the cart or opening the checkout drawer.
 */
export const trackInitiateCheckout = (
  items: PixelProductPayload[],
  totalAmount: number,
  totalCount: number
): void => {
  if (typeof window === 'undefined' || items.length === 0) return;
  const payload = {
    content_ids: items.map(item => String(item.id)),
    content_type: 'product',
    contents: items.map(item => ({
      id: String(item.id),
      quantity: item.quantity || 1,
      item_price: item.price,
    })),
    num_items: totalCount,
    value: totalAmount,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'InitiateCheckout', payload);
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] InitiateCheckout:', payload);
  }
};

/**
 * Tracks lead conversion towards WhatsApp order closure.
 */
export const trackWhatsAppLead = (
  totalAmount: number,
  itemsCount: number,
  details?: string
): void => {
  if (typeof window === 'undefined') return;
  const contactPayload = {
    content_name: details || 'Pedido WhatsApp Tradicional Coffee',
    num_items: itemsCount,
    value: totalAmount,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'Contact', contactPayload);
    fbq('track', 'Lead', contactPayload);
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] Contact & Lead:', contactPayload);
  }
};
