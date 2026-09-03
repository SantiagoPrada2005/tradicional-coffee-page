import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import {
  MetricsView,
  type MetricsSummary,
  type FunnelStage,
  type CampaignData,
  type TagData,
  type RecentEventItem,
} from '../components/MetricsView';
import { LinkBuilderView, type CampaignLinkItem } from '../components/LinkBuilderView';
import { getLocalBufferedEvents } from '../../../lib/analytics';

const INITIAL_SUMMARY: MetricsSummary = {
  totalVisitors: 0,
  uniqueSessions: 0,
  pageViews: 0,
  addToCartCount: 0,
  checkoutCount: 0,
  ordersCount: 0,
  totalRevenue: 0,
  conversionRate: 0,
};

const INITIAL_FUNNEL: FunnelStage[] = [
  { stage: 'Visitas (PageView)', count: 0 },
  { stage: 'Ver Producto', count: 0 },
  { stage: 'Agregar Carrito', count: 0 },
  { stage: 'Iniciar Checkout', count: 0 },
  { stage: 'Pedido WhatsApp (Purchase)', count: 0 },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'links'>('metrics');
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@tradicional-coffee.shop');
  const [isZeroTrust, setIsZeroTrust] = useState(false);

  const [summary, setSummary] = useState<MetricsSummary>(INITIAL_SUMMARY);
  const [funnel, setFunnel] = useState<FunnelStage[]>(INITIAL_FUNNEL);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);
  const [devices, setDevices] = useState<Array<{ device: string; count: number }>>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEventItem[]>([]);
  const [links, setLinks] = useState<CampaignLinkItem[]>([]);
  const [isMock, setIsMock] = useState(false);

  // Fetch admin profile and Zero Trust identity
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        const data = await res.json();
        if (data.email) setUserEmail(data.email);
        if (data.zeroTrustActive) setIsZeroTrust(data.zeroTrustActive);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Fetch metrics and merge with local buffer if in development
  const fetchMetrics = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        if (!data.isMock && data.summary && data.summary.totalVisitors > 0) {
          setSummary(data.summary);
          setFunnel(data.funnel || INITIAL_FUNNEL);
          setCampaigns(data.campaigns || []);
          setTags(data.tags || []);
          setDevices(data.devices || []);
          setRecentEvents(data.recentEvents || []);
          setIsMock(false);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.debug('[Admin] Remote metrics not available, using local buffer:', e);
    }

    // Local buffer fallback calculation for local dev / preview
    setIsMock(true);
    const localEvents = getLocalBufferedEvents();

    const sessions = new Set<string>();
    let pvs = 0;
    let vcs = 0;
    let atcs = 0;
    let chks = 0;
    let ords = 0;
    let rev = 0;

    const campMap = new Map<string, { visits: number; orders: number; revenue: number }>();
    const tagMap = new Map<string, { visits: number; orders: number; revenue: number }>();

    for (const ev of localEvents) {
      if (ev.session_id) sessions.add(ev.session_id);
      if (ev.event_type === 'pageview') pvs++;
      if (ev.event_type === 'view_content') vcs++;
      if (ev.event_type === 'add_to_cart') atcs++;
      if (ev.event_type === 'initiate_checkout') chks++;
      if (ev.event_type === 'purchase') {
        ords++;
        rev += ev.value || 0;
      }

      const campKey = ev.attribution?.utm_campaign || '(Orgánico / Directo)';
      const c = campMap.get(campKey) || { visits: 0, orders: 0, revenue: 0 };
      if (ev.event_type === 'pageview') c.visits++;
      if (ev.event_type === 'purchase') {
        c.orders++;
        c.revenue += ev.value || 0;
      }
      campMap.set(campKey, c);

      const tagKey = ev.attribution?.tag;
      if (tagKey) {
        const t = tagMap.get(tagKey) || { visits: 0, orders: 0, revenue: 0 };
        if (ev.event_type === 'pageview') t.visits++;
        if (ev.event_type === 'purchase') {
          t.orders++;
          t.revenue += ev.value || 0;
        }
        tagMap.set(tagKey, t);
      }
    }

    const uniqueSessions = Math.max(sessions.size, pvs > 0 ? 1 : 0);
    const cr = uniqueSessions > 0 ? Number(((ords / uniqueSessions) * 100).toFixed(2)) : 0;

    setSummary({
      totalVisitors: localEvents.length,
      uniqueSessions,
      pageViews: pvs,
      addToCartCount: atcs,
      checkoutCount: chks,
      ordersCount: ords,
      totalRevenue: rev,
      conversionRate: cr,
    });

    setFunnel([
      { stage: 'Visitas (PageView)', count: pvs },
      { stage: 'Ver Producto', count: vcs },
      { stage: 'Agregar Carrito', count: atcs },
      { stage: 'Iniciar Checkout', count: chks },
      { stage: 'Pedido WhatsApp (Purchase)', count: ords },
    ]);

    setCampaigns(
      Array.from(campMap.entries()).map(([name, d]) => ({
        campaign: name,
        visits: d.visits,
        orders: d.orders,
        revenue: d.revenue,
        cr: d.visits > 0 ? Number(((d.orders / d.visits) * 100).toFixed(1)) : 0,
      }))
    );

    setTags(
      Array.from(tagMap.entries()).map(([t, d]) => ({
        tag: t,
        visits: d.visits,
        orders: d.orders,
        revenue: d.revenue,
        cr: d.visits > 0 ? Number(((d.orders / d.visits) * 100).toFixed(1)) : 0,
      }))
    );

    setDevices([
      { device: 'mobile', count: Math.round(localEvents.length * 0.7) },
      { device: 'desktop', count: Math.round(localEvents.length * 0.3) },
    ]);

    setRecentEvents(
      localEvents.map(e => ({
        ...e,
        eventType: e.event_type,
        utmCampaign: e.attribution?.utm_campaign,
        tag: e.attribution?.tag,
        createdAt: e.timestamp,
      }))
    );

    setIsLoading(false);
  }, []);

  // Fetch campaign links
  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/links');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.links)) {
          setLinks(data.links);
          return;
        }
      }
    } catch {
      // Fallback
    }

    // LocalStorage fallback for created links
    try {
      const raw = localStorage.getItem('tc_campaign_links');
      if (raw) setLinks(JSON.parse(raw));
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      await fetchProfile();
      if (mounted) {
        await fetchMetrics(false);
        await fetchLinks();
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [fetchProfile, fetchMetrics, fetchLinks]);

  const handleCreateLink = async (newLink: Partial<CampaignLinkItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLink),
      });
      if (res.ok) {
        await fetchLinks();
        return true;
      }
    } catch {
      // Local fallback
    }

    // Save locally
    const created: CampaignLinkItem = {
      id: Date.now(),
      slug: newLink.slug || 'promo',
      title: newLink.title || 'Campaña',
      targetPath: newLink.targetPath || '/order',
      utmSource: newLink.utmSource || 'direct',
      utmMedium: newLink.utmMedium || 'cpc',
      utmCampaign: newLink.utmCampaign || 'campaña',
      tag: newLink.tag || null,
      clicksCount: 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [created, ...links];
    setLinks(updated);
    try {
      localStorage.setItem('tc_campaign_links', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    return true;
  };

  const handleDeleteLink = async (id: number): Promise<void> => {
    try {
      await fetch(`/api/admin/links?id=${id}`, { method: 'DELETE' });
    } catch {
      // Ignore
    }
    const updated = links.filter(l => l.id !== id);
    setLinks(updated);
    try {
      localStorage.setItem('tc_campaign_links', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#170E08] text-[#F4EDDF] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#C49C64] selection:text-[#2B1B12]">
      {/* Header */}
      <AdminHeader
        userEmail={userEmail}
        isZeroTrust={isZeroTrust}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={() => {
          fetchMetrics();
          fetchLinks();
        }}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'metrics' ? (
          <MetricsView
            summary={summary}
            funnel={funnel}
            campaigns={campaigns}
            tags={tags}
            devices={devices}
            recentEvents={recentEvents}
            isMock={isMock}
          />
        ) : (
          <LinkBuilderView
            links={links}
            onCreateLink={handleCreateLink}
            onDeleteLink={handleDeleteLink}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
