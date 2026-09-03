// First-party Analytics & Campaign Attribution Engine
// Automatically persists UTMs and tags in session and emits structured events.

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  tag?: string;
  ref?: string;
}

export type AnalyticsEventType =
  | 'pageview'
  | 'view_content'
  | 'add_to_cart'
  | 'initiate_checkout'
  | 'purchase';

export interface AnalyticsEventPayload {
  session_id: string;
  event_type: AnalyticsEventType;
  path: string;
  referrer: string;
  value?: number;
  metadata?: Record<string, unknown>;
  attribution: AttributionData;
  timestamp: string;
}

const STORAGE_SESSION_KEY = 'tc_session_id';
const STORAGE_ATTRIBUTION_KEY = 'tc_attribution';
const STORAGE_LOCAL_EVENTS_KEY = 'tc_local_events';

/**
 * Generates a unique UUID or pseudo-UUID for sessions.
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  try {
    let sid = sessionStorage.getItem(STORAGE_SESSION_KEY);
    if (!sid) {
      sid = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : 's_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      sessionStorage.setItem(STORAGE_SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return 'fallback_session';
  }
}

/**
 * Extracts and persists campaign attribution parameters from current URL query.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: AttributionData = {};

    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');
    const tag = params.get('tag') || params.get('etiqueta');
    const ref = params.get('ref');

    if (utmSource) incoming.utm_source = utmSource;
    if (utmMedium) incoming.utm_medium = utmMedium;
    if (utmCampaign) incoming.utm_campaign = utmCampaign;
    if (utmContent) incoming.utm_content = utmContent;
    if (utmTerm) incoming.utm_term = utmTerm;
    if (tag) incoming.tag = tag;
    if (ref) incoming.ref = ref;

    // If new UTMs arrived, update session storage
    if (Object.keys(incoming).length > 0) {
      sessionStorage.setItem(STORAGE_ATTRIBUTION_KEY, JSON.stringify(incoming));
      localStorage.setItem(STORAGE_ATTRIBUTION_KEY, JSON.stringify(incoming));
      return incoming;
    }

    // Otherwise, retrieve existing session attribution
    const existing = sessionStorage.getItem(STORAGE_ATTRIBUTION_KEY) || localStorage.getItem(STORAGE_ATTRIBUTION_KEY);
    if (existing) {
      return JSON.parse(existing) as AttributionData;
    }
  } catch (e) {
    console.debug('[Analytics] Failed to parse attribution:', e);
  }

  return {};
}

/**
 * Returns current attribution parameters.
 */
export function getAttribution(): AttributionData {
  return captureAttribution();
}

/**
 * Saves event to a local buffer in localStorage for local dev & offline resilience.
 */
function saveToLocalBuffer(payload: AnalyticsEventPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_EVENTS_KEY);
    const list: AnalyticsEventPayload[] = raw ? JSON.parse(raw) : [];
    list.unshift(payload);
    if (list.length > 500) {
      list.length = 500; // Cap to latest 500 events
    }
    localStorage.setItem(STORAGE_LOCAL_EVENTS_KEY, JSON.stringify(list));
  } catch (e) {
    console.debug('[Analytics] Local storage buffer error:', e);
  }
}

/**
 * Dispatches an event to the Cloudflare Functions ingestion endpoint.
 */
export function trackEvent(
  eventType: AnalyticsEventType,
  options: {
    value?: number;
    metadata?: Record<string, unknown>;
    path?: string;
  } = {}
): void {
  if (typeof window === 'undefined') return;

  const attribution = getAttribution();
  const sessionId = getOrCreateSessionId();
  const currentPath = options.path || window.location.pathname;

  const payload: AnalyticsEventPayload = {
    session_id: sessionId,
    event_type: eventType,
    path: currentPath,
    referrer: document.referrer || '',
    value: options.value || 0,
    metadata: options.metadata,
    attribution,
    timestamp: new Date().toISOString(),
  };

  // 1. Buffer locally
  saveToLocalBuffer(payload);

  // 2. Transmit to serverless ingestion endpoint (non-blocking)
  try {
    const serialized = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([serialized], { type: 'application/json' });
      navigator.sendBeacon('/api/metrics/track', blob);
    } else {
      fetch('/api/metrics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: serialized,
        keepalive: true,
      }).catch(err => {
        if (import.meta.env.DEV) {
          console.debug('[Analytics] Server dispatch error (tolerated):', err);
        }
      });
    }
  } catch (e) {
    console.debug('[Analytics] Dispatch error:', e);
  }
}

/**
 * Helper to track page navigation.
 */
export function trackAnalyticsPageView(path?: string): void {
  trackEvent('pageview', { path });
}

/**
 * Helper to track eCommerce funnel actions.
 */
export function trackEcommerceEvent(
  eventType: 'view_content' | 'add_to_cart' | 'initiate_checkout' | 'purchase',
  value: number = 0,
  metadata?: Record<string, unknown>
): void {
  trackEvent(eventType, { value, metadata });
}

/**
 * Helper for reading locally buffered events (used in dev/admin preview).
 */
export function getLocalBufferedEvents(): AnalyticsEventPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
