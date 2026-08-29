// Cloudflare Pages Function: /api/capi
// Handles Server-Side Meta Conversions API (CAPI) events with automatic deduplication

interface Env {
  META_ACCESS_TOKEN?: string;
  META_PIXEL_ID?: string;
  VITE_META_PIXEL_ID?: string;
  META_TEST_EVENT_CODE?: string;
}

interface CapiRequestBody {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  user_data?: {
    fbp?: string;
    fbc?: string;
    email?: string;
    phone?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    contents?: Array<{
      id: string;
      quantity?: number;
      item_price?: number;
    }>;
    num_items?: number;
  };
}

function getCookieValue(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  const accessToken = env.META_ACCESS_TOKEN;
  const pixelId = env.META_PIXEL_ID || env.VITE_META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    return new Response(
      JSON.stringify({
        error: 'Missing META_ACCESS_TOKEN or META_PIXEL_ID environment variables in Cloudflare Pages.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let body: CapiRequestBody;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!body.event_name || !body.event_id) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields: event_name or event_id' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Extract client metadata from Cloudflare Edge headers
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    undefined;

  const userAgent = request.headers.get('user-agent') || undefined;
  const cookieHeader = request.headers.get('cookie');

  // Extract or fallback for Meta cookies (_fbp and _fbc)
  const fbp = body.user_data?.fbp || getCookieValue(cookieHeader, '_fbp');
  const fbc = body.user_data?.fbc || getCookieValue(cookieHeader, '_fbc');

  const userData: Record<string, unknown> = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
    fbp,
    fbc,
  };

  if (body.user_data?.email) {
    userData.em = [await sha256(body.user_data.email)];
  }
  if (body.user_data?.phone) {
    userData.ph = [await sha256(body.user_data.phone)];
  }

  const eventSourceUrl =
    body.event_source_url ||
    request.headers.get('referer') ||
    'https://tradicional-coffee.shop';

  const metaEventData = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id, // Identical to Pixel eventID for deduplication
    event_source_url: eventSourceUrl,
    action_source: 'website',
    user_data: userData,
    custom_data: body.custom_data,
  };

  const payload: Record<string, unknown> = {
    data: [metaEventData],
  };

  if (env.META_TEST_EVENT_CODE) {
    payload.test_event_code = env.META_TEST_EVENT_CODE;
  }

  try {
    const metaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await metaResponse.json();

    return new Response(JSON.stringify(result), {
      status: metaResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to send event to Meta Graph API',
        details: error?.message,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
