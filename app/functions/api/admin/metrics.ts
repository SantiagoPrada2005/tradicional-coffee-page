import { createDb } from '../../../src/db';
import { analyticsEvents } from '../../../src/db/schema';
import { desc } from 'drizzle-orm';

interface Env {
  DB?: unknown;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { env } = context;

  if (!env.DB) {
    // Return empty structured response if DB is not attached yet
    return new Response(
      JSON.stringify({
        isMock: true,
        summary: {
          totalVisitors: 0,
          uniqueSessions: 0,
          pageViews: 0,
          addToCartCount: 0,
          checkoutCount: 0,
          ordersCount: 0,
          totalRevenue: 0,
          conversionRate: 0,
        },
        funnel: [
          { stage: 'Visitas (PageView)', count: 0 },
          { stage: 'Ver Producto', count: 0 },
          { stage: 'Agregar Carrito', count: 0 },
          { stage: 'Iniciar Checkout', count: 0 },
          { stage: 'Pedido WhatsApp (Purchase)', count: 0 },
        ],
        campaigns: [],
        tags: [],
        sources: [],
        devices: [],
        countries: [],
        recentEvents: [],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const db = createDb(env.DB);
    const allEvents = await db
      .select()
      .from(analyticsEvents)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(1000);

    const sessions = new Set<string>();
    let pageViews = 0;
    let viewContentCount = 0;
    let addToCartCount = 0;
    let checkoutCount = 0;
    let ordersCount = 0;
    let totalRevenue = 0;

    const campaignMap = new Map<string, { visits: number; orders: number; revenue: number }>();
    const tagMap = new Map<string, { visits: number; orders: number; revenue: number }>();
    const sourceMap = new Map<string, { count: number }>();
    const deviceMap = new Map<string, { count: number }>();
    const countryMap = new Map<string, { count: number }>();

    for (const ev of allEvents) {
      if (ev.sessionId) sessions.add(ev.sessionId);

      if (ev.eventType === 'pageview') pageViews++;
      if (ev.eventType === 'view_content') viewContentCount++;
      if (ev.eventType === 'add_to_cart') addToCartCount++;
      if (ev.eventType === 'initiate_checkout') checkoutCount++;
      if (ev.eventType === 'purchase') {
        ordersCount++;
        totalRevenue += ev.value || 0;
      }

      // Campaign aggregation
      const campaignKey = ev.utmCampaign || '(Orgánico / Directo)';
      const camp = campaignMap.get(campaignKey) || { visits: 0, orders: 0, revenue: 0 };
      if (ev.eventType === 'pageview') camp.visits++;
      if (ev.eventType === 'purchase') {
        camp.orders++;
        camp.revenue += ev.value || 0;
      }
      campaignMap.set(campaignKey, camp);

      // Tag aggregation
      if (ev.tag) {
        const tagItem = tagMap.get(ev.tag) || { visits: 0, orders: 0, revenue: 0 };
        if (ev.eventType === 'pageview') tagItem.visits++;
        if (ev.eventType === 'purchase') {
          tagItem.orders++;
          tagItem.revenue += ev.value || 0;
        }
        tagMap.set(ev.tag, tagItem);
      }

      // Source aggregation
      const srcKey = ev.utmSource || '(Directo)';
      sourceMap.set(srcKey, { count: (sourceMap.get(srcKey)?.count || 0) + 1 });

      // Device
      const devKey = ev.deviceType || 'desktop';
      deviceMap.set(devKey, { count: (deviceMap.get(devKey)?.count || 0) + 1 });

      // Country
      const countryKey = ev.country || 'CO';
      countryMap.set(countryKey, { count: (countryMap.get(countryKey)?.count || 0) + 1 });
    }

    const uniqueSessions = sessions.size;
    const conversionRate = uniqueSessions > 0
      ? Number(((ordersCount / uniqueSessions) * 100).toFixed(2))
      : 0;

    const campaigns = Array.from(campaignMap.entries()).map(([name, data]) => ({
      campaign: name,
      visits: data.visits,
      orders: data.orders,
      revenue: data.revenue,
      cr: data.visits > 0 ? Number(((data.orders / data.visits) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.visits - a.visits);

    const tags = Array.from(tagMap.entries()).map(([tag, data]) => ({
      tag,
      visits: data.visits,
      orders: data.orders,
      revenue: data.revenue,
      cr: data.visits > 0 ? Number(((data.orders / data.visits) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.visits - a.visits);

    const sources = Array.from(sourceMap.entries()).map(([source, data]) => ({
      source,
      count: data.count,
    })).sort((a, b) => b.count - a.count);

    const devices = Array.from(deviceMap.entries()).map(([device, data]) => ({
      device,
      count: data.count,
    }));

    const countries = Array.from(countryMap.entries()).map(([country, data]) => ({
      country,
      count: data.count,
    }));

    return new Response(
      JSON.stringify({
        isMock: false,
        summary: {
          totalVisitors: allEvents.length,
          uniqueSessions,
          pageViews,
          addToCartCount,
          checkoutCount,
          ordersCount,
          totalRevenue,
          conversionRate,
        },
        funnel: [
          { stage: 'Visitas (PageView)', count: pageViews },
          { stage: 'Ver Producto', count: viewContentCount },
          { stage: 'Agregar Carrito', count: addToCartCount },
          { stage: 'Iniciar Checkout', count: checkoutCount },
          { stage: 'Pedido WhatsApp (Purchase)', count: ordersCount },
        ],
        campaigns,
        tags,
        sources,
        devices,
        countries,
        recentEvents: allEvents.slice(0, 30),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Failed to query analytics from D1', details: message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
