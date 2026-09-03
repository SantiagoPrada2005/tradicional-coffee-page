import React from 'react';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Smartphone,
  Monitor,
  Tag,
  Flame,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../../order/utils/whatsapp';

export interface MetricsSummary {
  totalVisitors: number;
  uniqueSessions: number;
  pageViews: number;
  addToCartCount: number;
  checkoutCount: number;
  ordersCount: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
}

export interface CampaignData {
  campaign: string;
  visits: number;
  orders: number;
  revenue: number;
  cr: number;
}

export interface TagData {
  tag: string;
  visits: number;
  orders: number;
  revenue: number;
  cr: number;
}

export interface RecentEventItem {
  id?: number | string;
  eventType?: string;
  path?: string;
  utmCampaign?: string;
  tag?: string;
  deviceType?: string;
  value?: number;
  createdAt?: string;
  timestamp?: string;
}

export interface MetricsViewProps {
  summary: MetricsSummary;
  funnel: FunnelStage[];
  campaigns: CampaignData[];
  tags: TagData[];
  devices: Array<{ device: string; count: number }>;
  recentEvents: RecentEventItem[];
  isMock?: boolean;
}

export const MetricsView: React.FC<MetricsViewProps> = ({
  summary,
  funnel,
  campaigns,
  tags,
  devices,
  recentEvents,
  isMock,
}) => {
  const maxFunnelCount = Math.max(...funnel.map(f => f.count), 1);

  return (
    <div className="space-y-8">
      {/* Top Banner if in development / initial state */}
      {isMock && (
        <div className="p-3.5 rounded-2xl bg-[#C49C64]/10 border border-[#C49C64]/30 flex items-center justify-between gap-3 text-xs text-[#E2C38F]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C49C64] flex-shrink-0" />
            <span>
              <strong>Modo Local / Inicial:</strong> Los eventos generados en tu navegador se están registrando y atribuyendo localmente hasta conectar la base de datos Cloudflare D1 en producción.
            </span>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Unique Visitors & Sessions */}
        <div className="p-5 rounded-2xl bg-[#23150D] border border-[#3D291D] relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A89886] mb-3">
            <span className="text-xs font-['Plus_Jakarta_Sans'] font-medium uppercase tracking-wider">
              Sesiones Únicas
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#2B1B12] flex items-center justify-center text-[#C49C64]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-['Syne'] text-3xl font-bold text-[#F4EDDF]">
              {summary.uniqueSessions.toLocaleString()}
            </span>
            <span className="text-xs text-[#A89886]">
              ({summary.pageViews} vistas)
            </span>
          </div>
          <p className="text-[11px] text-[#7A6854] mt-2">
            Tráfico total acumulado en el embudo
          </p>
        </div>

        {/* Card 2: WhatsApp Orders (Purchase) */}
        <div className="p-5 rounded-2xl bg-[#23150D] border border-[#3D291D] relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A89886] mb-3">
            <span className="text-xs font-['Plus_Jakarta_Sans'] font-medium uppercase tracking-wider">
              Pedidos WhatsApp
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 flex items-center justify-center text-[#4ADE80]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-['Syne'] text-3xl font-bold text-[#4ADE80]">
              {summary.ordersCount.toLocaleString()}
            </span>
            <span className="text-xs text-[#A89886]">
              conversiones
            </span>
          </div>
          <p className="text-[11px] text-[#7A6854] mt-2">
            Órdenes despachadas a WhatsApp
          </p>
        </div>

        {/* Card 3: Conversion Rate */}
        <div className="p-5 rounded-2xl bg-[#23150D] border border-[#3D291D] relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A89886] mb-3">
            <span className="text-xs font-['Plus_Jakarta_Sans'] font-medium uppercase tracking-wider">
              Tasa de Conversión
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C49C64]/15 flex items-center justify-center text-[#E2C38F]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-['Syne'] text-3xl font-bold text-[#E2C38F]">
              {summary.conversionRate}%
            </span>
            <span className="text-xs text-[#A89886]">
              visitas ➔ compra
            </span>
          </div>
          <p className="text-[11px] text-[#7A6854] mt-2">
            {summary.checkoutCount} llegaron al checkout
          </p>
        </div>

        {/* Card 4: Attributed Revenue */}
        <div className="p-5 rounded-2xl bg-[#23150D] border border-[#3D291D] relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A89886] mb-3">
            <span className="text-xs font-['Plus_Jakarta_Sans'] font-medium uppercase tracking-wider">
              Ingresos Atribuidos
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C49C64]/15 flex items-center justify-center text-[#C49C64]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F4EDDF]">
              {formatCurrency(summary.totalRevenue)}
            </span>
          </div>
          <p className="text-[11px] text-[#7A6854] mt-2">
            Valor total de pedidos generados
          </p>
        </div>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF]">
              Embudo de Conversión (Conversion Funnel)
            </h2>
            <p className="text-xs text-[#A89886] mt-0.5">
              Ruta del cliente desde la vista de página hasta el pedido final por WhatsApp
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#2B1B12] text-[#C49C64] border border-[#3D291D]">
            5 Etapas
          </span>
        </div>

        <div className="space-y-3.5 pt-2">
          {funnel.map((step, idx) => {
            const percentage = maxFunnelCount > 0
              ? Math.max(4, Math.round((step.count / maxFunnelCount) * 100))
              : 4;
            const dropoff = idx > 0 && funnel[idx - 1].count > 0
              ? Math.round((step.count / funnel[idx - 1].count) * 100)
              : null;

            return (
              <div key={step.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[#F4EDDF] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2B1B12] border border-[#C49C64]/30 flex items-center justify-center text-[10px] text-[#C49C64]">
                      {idx + 1}
                    </span>
                    {step.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    {dropoff !== null && (
                      <span className="text-[11px] text-[#A89886]">
                        pasaron el <strong className="text-[#E2C38F]">{dropoff}%</strong>
                      </span>
                    )}
                    <span className="font-mono font-bold text-[#F4EDDF] text-xs">
                      {step.count.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-[#1B1009] overflow-hidden border border-[#3D291D]/50 p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#8B5E34] to-[#C49C64]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaigns & Tags Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns Attribution Table (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C49C64]" />
                Rendimiento por Campaña (UTM)
              </h2>
              <p className="text-xs text-[#A89886] mt-0.5">
                Atribución directa de clics y pedidos según <code className="text-[#C49C64]">utm_campaign</code>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#3D291D] text-[#A89886] font-mono text-[11px]">
                  <th className="py-2.5 px-3">Campaña</th>
                  <th className="py-2.5 px-3 text-right">Visitas</th>
                  <th className="py-2.5 px-3 text-right">Pedidos</th>
                  <th className="py-2.5 px-3 text-right">Tasa Conv.</th>
                  <th className="py-2.5 px-3 text-right">Ingresos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3D291D]/50">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#7A6854] italic">
                      No hay datos de campañas registrados todavía. Creá enlaces con etiquetas para rastrear.
                    </td>
                  </tr>
                ) : (
                  campaigns.map(camp => (
                    <tr key={camp.campaign} className="hover:bg-[#2B1B12]/50 transition-colors">
                      <td className="py-3 px-3 font-medium text-[#F4EDDF] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C49C64]" />
                        <span className="truncate max-w-[200px]" title={camp.campaign}>
                          {camp.campaign}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-[#A89886] font-mono">
                        {camp.visits.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right text-[#4ADE80] font-mono font-semibold">
                        {camp.orders.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[#E2C38F]">
                        {camp.cr}%
                      </td>
                      <td className="py-3 px-3 text-right text-[#F4EDDF] font-mono font-medium">
                        {formatCurrency(camp.revenue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tags & Labels Breakdown (1 col) */}
        <div className="p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-4">
          <div>
            <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#C49C64]" />
              Etiquetas de Conversión
            </h2>
            <p className="text-xs text-[#A89886] mt-0.5">
              Etiquetas personalizadas (<code className="text-[#C49C64]">?tag=...</code>)
            </p>
          </div>

          <div className="space-y-2.5">
            {tags.length === 0 ? (
              <p className="py-8 text-center text-[#7A6854] text-xs italic">
                Aún no se han utilizado etiquetas en los enlaces.
              </p>
            ) : (
              tags.map(item => (
                <div
                  key={item.tag}
                  className="p-3 rounded-xl bg-[#2B1B12] border border-[#3D291D] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-[#E2C38F] px-2 py-0.5 rounded-md bg-[#1F130B] border border-[#C49C64]/30">
                      #{item.tag}
                    </span>
                    <div className="text-[10px] text-[#A89886] mt-1">
                      {item.visits} visitas · {item.orders} pedidos
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#4ADE80] font-mono">
                      {formatCurrency(item.revenue)}
                    </span>
                    <div className="text-[10px] text-[#C49C64] font-mono">
                      {item.cr}% CR
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Device Split Mini Box */}
          <div className="pt-4 border-t border-[#3D291D] space-y-2">
            <span className="text-xs font-['Syne'] font-bold text-[#A89886] uppercase tracking-wider">
              Dispositivos
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-[#1F130B] border border-[#3D291D] flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#C49C64]" />
                <div>
                  <div className="text-xs font-bold text-[#F4EDDF]">
                    {devices.find(d => d.device === 'mobile')?.count || 0}
                  </div>
                  <div className="text-[10px] text-[#7A6854]">Móviles</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1F130B] border border-[#3D291D] flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#C49C64]" />
                <div>
                  <div className="text-xs font-bold text-[#F4EDDF]">
                    {devices.find(d => d.device === 'desktop')?.count || 0}
                  </div>
                  <div className="text-[10px] text-[#7A6854]">Computadoras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Recent Events Stream */}
      <div className="p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF]">
            Eventos en Vivo (Actividad Reciente)
          </h2>
          <span className="text-xs text-[#A89886]">Últimos registros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3D291D] text-[#A89886] font-mono text-[11px]">
                <th className="py-2.5 px-3">Evento</th>
                <th className="py-2.5 px-3">Ruta</th>
                <th className="py-2.5 px-3">Campaña / Etiqueta</th>
                <th className="py-2.5 px-3">Dispositivo</th>
                <th className="py-2.5 px-3 text-right">Valor</th>
                <th className="py-2.5 px-3 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D291D]/50">
              {recentEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#7A6854] italic">
                    Sin eventos recientes aún.
                  </td>
                </tr>
              ) : (
                recentEvents.slice(0, 15).map((ev, i) => {
                  const isPurchase = ev.eventType === 'purchase';
                  const isCart = ev.eventType === 'add_to_cart';
                  const isCheckout = ev.eventType === 'initiate_checkout';

                  const badgeClass = isPurchase
                    ? 'bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30'
                    : isCheckout
                    ? 'bg-[#EAB308]/15 text-[#FDE047] border-[#EAB308]/30'
                    : isCart
                    ? 'bg-[#3B82F6]/15 text-[#93C5FD] border-[#3B82F6]/30'
                    : 'bg-[#2B1B12] text-[#A89886] border-[#3D291D]';

                  return (
                    <tr key={ev.id || i} className="hover:bg-[#2B1B12]/40 transition-colors">
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${badgeClass}`}>
                          {ev.eventType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#D4C4B5] truncate max-w-[150px]">
                        {ev.path}
                      </td>
                      <td className="py-2.5 px-3 text-[#A89886]">
                        {ev.utmCampaign ? (
                          <span className="text-[#E2C38F] font-mono text-[11px]">
                            {ev.utmCampaign} {ev.tag ? `(#${ev.tag})` : ''}
                          </span>
                        ) : (
                          <span className="text-[#7A6854] italic">Directo</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-[#A89886] capitalize">
                        {ev.deviceType || 'web'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-[#F4EDDF]">
                        {ev.value ? formatCurrency(ev.value) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[10px] font-mono text-[#7A6854]">
                        {ev.createdAt
                          ? new Date(ev.createdAt).toLocaleTimeString()
                          : ev.timestamp
                          ? new Date(ev.timestamp).toLocaleTimeString()
                          : '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
