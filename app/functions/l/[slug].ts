import { createDb } from '../../src/db';
import { campaignLinks, analyticsEvents } from '../../src/db/schema';
import { eq, sql } from 'drizzle-orm';

interface Env {
  DB?: unknown;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
  params: { slug: string };
  waitUntil?: (promise: Promise<unknown>) => void;
}): Promise<Response> => {
  const { request, env, params } = context;
  const slug = params.slug?.toLowerCase();

  if (!slug) {
    return Response.redirect(new URL('/', request.url).toString(), 302);
  }

  if (!env.DB) {
    return Response.redirect(new URL('/', request.url).toString(), 302);
  }

  try {
    const db = createDb(env.DB);
    const [link] = await db
      .select()
      .from(campaignLinks)
      .where(eq(campaignLinks.slug, slug))
      .limit(1);

    if (!link) {
      return Response.redirect(new URL('/', request.url).toString(), 302);
    }

    // Increment click counter
    try {
      await db
        .update(campaignLinks)
        .set({ clicksCount: sql`clicks_count + 1` })
        .where(eq(campaignLinks.id, link.id));

      const userAgent = request.headers.get('user-agent') || '';
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
      const isTablet = /tablet|ipad/i.test(userAgent);
      const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

      await db.insert(analyticsEvents).values({
        sessionId: 'link_' + Math.random().toString(36).substring(2, 9),
        eventType: 'pageview',
        path: link.targetPath,
        referrer: request.headers.get('referer') || '',
        utmSource: link.utmSource,
        utmMedium: link.utmMedium,
        utmCampaign: link.utmCampaign,
        utmContent: link.utmContent,
        utmTerm: link.utmTerm,
        tag: link.tag,
        deviceType,
        country: request.headers.get('cf-ipcountry') || null,
        city: request.headers.get('cf-ipcity') || null,
        value: 0,
      });
    } catch (err) {
      console.debug('[Link Redirect] Counter error:', err);
    }

    // Build target destination URL with UTM params
    const destUrl = new URL(link.targetPath, request.url);
    destUrl.searchParams.set('utm_source', link.utmSource);
    destUrl.searchParams.set('utm_medium', link.utmMedium);
    destUrl.searchParams.set('utm_campaign', link.utmCampaign);
    if (link.utmContent) destUrl.searchParams.set('utm_content', link.utmContent);
    if (link.utmTerm) destUrl.searchParams.set('utm_term', link.utmTerm);
    if (link.tag) destUrl.searchParams.set('tag', link.tag);

    return Response.redirect(destUrl.toString(), 302);
  } catch {
    return Response.redirect(new URL('/', request.url).toString(), 302);
  }
};
