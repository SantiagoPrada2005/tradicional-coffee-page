import { createDb } from '../../../src/db';
import { analyticsEvents } from '../../../src/db/schema';

interface Env {
  DB?: unknown;
}

interface IngestPayload {
  session_id: string;
  event_type: string;
  path: string;
  referrer?: string;
  value?: number;
  metadata?: Record<string, unknown>;
  attribution?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    tag?: string;
    ref?: string;
  };
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  let body: IngestPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.event_type || !body.session_id) {
    return new Response(
      JSON.stringify({ error: 'Missing required event_type or session_id' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Extract Edge headers from Cloudflare
  const country = request.headers.get('cf-ipcountry') || undefined;
  const city = request.headers.get('cf-ipcity') || undefined;
  const userAgent = request.headers.get('user-agent') || '';

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const isTablet = /tablet|ipad/i.test(userAgent);
  const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  if (env.DB) {
    try {
      const db = createDb(env.DB);
      await db.insert(analyticsEvents).values({
        sessionId: body.session_id,
        eventType: body.event_type,
        path: body.path || '/',
        referrer: body.referrer || null,
        utmSource: body.attribution?.utm_source || null,
        utmMedium: body.attribution?.utm_medium || null,
        utmCampaign: body.attribution?.utm_campaign || null,
        utmContent: body.attribution?.utm_content || null,
        utmTerm: body.attribution?.utm_term || null,
        tag: body.attribution?.tag || body.attribution?.ref || null,
        deviceType,
        country: country || null,
        city: city || null,
        value: body.value || 0,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Database error';
      return new Response(
        JSON.stringify({ success: false, error: message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  // If DB is not bound yet (e.g. preview without binding), acknowledge
  return new Response(JSON.stringify({ success: true, note: 'DB binding pending' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
