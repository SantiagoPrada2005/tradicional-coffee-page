// Meta Pixel (Browser) & Meta Conversions API (Server-Side via Cloudflare Pages Function)
// Hybrid tracking with automated deduplication using eventID.

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
 * Generate a unique UUIDv4 event ID for deduplication between Pixel and CAPI.
 */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'evt_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

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
 * Helper to read browser cookies (_fbp, _fbc).
 */
function getClientCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

/**
 * Sends event asynchronously to Cloudflare Pages Function (/api/capi) for Server-Side CAPI.
 */
async function sendToCapi(
  eventName: string,
  eventId: string,
  customData?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      user_data: {
        fbp: getClientCookie('_fbp'),
        fbc: getClientCookie('_fbc'),
      },
      custom_data: customData,
    };

    // Non-blocking fetch to Cloudflare Pages Function
    fetch('/api/capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(err => {
      if (import.meta.env.DEV) {
        console.debug('[Meta CAPI] Server-side dispatch error (ignored in client):', err);
      }
    });
  } catch (e) {
    if (import.meta.env.DEV) {
      console.debug('[Meta CAPI] Execution error:', e);
    }
  }
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
 * Tracks virtual page transitions in Single Page Applications (Hybrid: Browser + CAPI).
 */
export const trackPageView = (): void => {
  if (typeof window === 'undefined') return;
  const eventId = generateEventId();

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'PageView', {}, { eventID: eventId });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] PageView tracked (eventID:', eventId, ')');
  }

  sendToCapi('PageView', eventId);
};

/**
 * Tracks viewing product details (Hybrid: Browser + CAPI).
 */
export const trackViewContent = (product: PixelProductPayload): void => {
  if (typeof window === 'undefined') return;
  const eventId = generateEventId();

  const customData = {
    content_name: product.name,
    content_category: product.category || 'Bebidas',
    content_ids: [String(product.id)],
    content_type: 'product',
    value: product.price,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'ViewContent', customData, { eventID: eventId });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] ViewContent:', customData, '(eventID:', eventId, ')');
  }

  sendToCapi('ViewContent', eventId, customData);
};

/**
 * Tracks adding a product to the cart (Hybrid: Browser + CAPI).
 */
export const trackAddToCart = (product: PixelProductPayload, quantity: number = 1): void => {
  if (typeof window === 'undefined') return;
  const eventId = generateEventId();
  const subtotal = product.price * quantity;

  const customData = {
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
    fbq('track', 'AddToCart', customData, { eventID: eventId });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] AddToCart:', customData, '(eventID:', eventId, ')');
  }

  sendToCapi('AddToCart', eventId, customData);
};

/**
 * Tracks reviewing the cart or opening the checkout drawer (Hybrid: Browser + CAPI).
 */
export const trackInitiateCheckout = (
  items: PixelProductPayload[],
  totalAmount: number,
  totalCount: number
): void => {
  if (typeof window === 'undefined' || items.length === 0) return;
  const eventId = generateEventId();

  const customData = {
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
    fbq('track', 'InitiateCheckout', customData, { eventID: eventId });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] InitiateCheckout:', customData, '(eventID:', eventId, ')');
  }

  sendToCapi('InitiateCheckout', eventId, customData);
};

/**
 * Tracks a completed purchase / order dispatch (Hybrid: Browser + CAPI).
 */
export const trackPurchase = (
  items: PixelProductPayload[],
  totalAmount: number,
  totalCount: number
): void => {
  if (typeof window === 'undefined' || items.length === 0) return;
  const eventId = generateEventId();

  const customData = {
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
    fbq('track', 'Purchase', customData, { eventID: eventId });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] Purchase:', customData, '(eventID:', eventId, ')');
  }

  sendToCapi('Purchase', eventId, customData);
};

/**
 * Tracks lead conversion towards WhatsApp order closure (Hybrid: Browser + CAPI).
 */
export const trackWhatsAppLead = (
  totalAmount: number,
  itemsCount: number,
  details?: string
): void => {
  if (typeof window === 'undefined') return;
  const eventIdContact = generateEventId();
  const eventIdLead = generateEventId();

  const customData = {
    content_name: details || 'Pedido WhatsApp Tradicional Coffee',
    num_items: itemsCount,
    value: totalAmount,
    currency: 'COP',
  };

  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'Contact', customData, { eventID: eventIdContact });
    fbq('track', 'Lead', customData, { eventID: eventIdLead });
  } else if (import.meta.env.DEV) {
    console.debug('[Meta Pixel] Contact & Lead:', customData, '(eventID:', eventIdLead, ')');
  }

  sendToCapi('Contact', eventIdContact, customData);
  sendToCapi('Lead', eventIdLead, customData);
};

/**
 * Tracks the complete conversion when placing an order via WhatsApp.
 * Dispatches Purchase (for Sales campaigns), Lead and Contact (for Lead campaigns).
 */
export const trackOrderConversion = (
  items: PixelProductPayload[],
  totalAmount: number,
  totalCount: number,
  details?: string
): void => {
  trackPurchase(items, totalAmount, totalCount);
  trackWhatsAppLead(totalAmount, totalCount, details);
};

