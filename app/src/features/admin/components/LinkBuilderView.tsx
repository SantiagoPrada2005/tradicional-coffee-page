import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Link as LinkIcon,
  Copy,
  Check,
  Download,
  QrCode,
  Tag,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export interface CampaignLinkItem {
  id: number;
  slug: string;
  title: string;
  targetPath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent?: string | null;
  utmTerm?: string | null;
  tag?: string | null;
  clicksCount: number;
  createdAt: string;
}

interface LinkBuilderViewProps {
  links: CampaignLinkItem[];
  onCreateLink: (newLink: Partial<CampaignLinkItem>) => Promise<boolean>;
  onDeleteLink: (id: number) => Promise<void>;
  isLoading: boolean;
}

const PRESET_SOURCES = [
  { id: 'meta_ads', label: 'Meta Ads (Facebook / Instagram)', medium: 'cpc' },
  { id: 'instagram', label: 'Instagram (Bio / Historias)', medium: 'stories' },
  { id: 'tiktok', label: 'TikTok (Bio / Contenido)', medium: 'social' },
  { id: 'qr_mesa', label: 'QR en Mesa (Local)', medium: 'qr' },
  { id: 'qr_mostrador', label: 'QR Mostrador / Barra', medium: 'qr' },
  { id: 'volante', label: 'Volante Impreso / Flyer', medium: 'print' },
  { id: 'whatsapp_broadcast', label: 'Difusión de WhatsApp', medium: 'chat' },
  { id: 'google_ads', label: 'Google Search Ads', medium: 'cpc' },
];

export const LinkBuilderView: React.FC<LinkBuilderViewProps> = ({
  links,
  onCreateLink,
  onDeleteLink,
}) => {
  const [title, setTitle] = useState('');
  const [targetPath, setTargetPath] = useState('/order');
  const [source, setSource] = useState('meta_ads');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('');
  const [tag, setTag] = useState('');
  const [slug, setSlug] = useState('');

  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const qrRef = useRef<SVGSVGElement | null>(null);

  const activeSource = source;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tradicional-coffee.shop';

  // Construct destination URL with UTM params
  const queryParams = new URLSearchParams();
  if (activeSource) queryParams.set('utm_source', activeSource);
  if (medium) queryParams.set('utm_medium', medium);
  if (campaign) queryParams.set('utm_campaign', campaign.trim());
  if (tag) queryParams.set('tag', tag.trim());

  const generatedFullUrl = `${baseUrl}${targetPath}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const generatedShortUrl = slug.trim() ? `${baseUrl}/l/${slug.trim().toLowerCase()}` : '';

  const handleCopy = (text: string, idKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(idKey);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 600;
    canvas.height = 600;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 50, 50, 500, 500);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `qr-${slug.trim() || 'tradicional'}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePresetSelect = (selectedId: string) => {
    setSource(selectedId);
    const preset = PRESET_SOURCES.find(p => p.id === selectedId);
    if (preset) {
      setMedium(preset.medium);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !campaign.trim()) return;

    const autoSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-')
      : (campaign.trim() + '-' + (tag.trim() || Math.random().toString(36).substring(2, 6)))
          .toLowerCase()
          .replace(/[^a-z0-9-_]/g, '-');

    setIsSubmitting(true);
    const success = await onCreateLink({
      title: title.trim(),
      slug: autoSlug,
      targetPath,
      utmSource: activeSource,
      utmMedium: medium.trim(),
      utmCampaign: campaign.trim(),
      tag: tag.trim() || null,
    });
    setIsSubmitting(false);

    if (success) {
      setTitle('');
      setCampaign('');
      setTag('');
      setSlug('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Link Generator & QR Code Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-5">
          <div>
            <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF] flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[#C49C64]" />
              Crear Nuevo Enlace de Campaña & Etiqueta
            </h2>
            <p className="text-xs text-[#A89886] mt-0.5">
              Generá URLs con tracking UTM y etiquetas personalizadas para medir la procedencia de cada cliente.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title & Target Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5]">
                  Nombre / Propósito del Enlace *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Campaña Frappes Verano - Meta Ads"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1009] border border-[#3D291D] text-xs text-[#F4EDDF] focus:outline-none focus:border-[#C49C64]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5]">
                  Página de Destino (Ruta)
                </label>
                <select
                  value={targetPath}
                  onChange={e => setTargetPath(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1009] border border-[#3D291D] text-xs text-[#F4EDDF] focus:outline-none focus:border-[#C49C64] cursor-pointer"
                >
                  <option value="/order">/order (Hacer Pedido de Frappes - Recomendado)</option>
                  <option value="/">/ (Inicio / Home)</option>
                  <option value="/menu">/menu (Carta Completa)</option>
                </select>
              </div>
            </div>

            {/* Source & Medium Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5]">
                Canal / Fuente (utm_source)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_SOURCES.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`p-2 rounded-xl border text-[11px] text-left transition-all cursor-pointer truncate ${
                      source === preset.id
                        ? 'bg-[#C49C64]/20 border-[#C49C64] text-[#E2C38F] font-bold'
                        : 'bg-[#1B1009] border-[#3D291D] text-[#A89886] hover:border-[#523B2B]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Name & Tag Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5]">
                  Nombre de Campaña (utm_campaign) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. promo_frappes_verano"
                  value={campaign}
                  onChange={e => setCampaign(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1009] border border-[#3D291D] text-xs text-[#F4EDDF] font-mono focus:outline-none focus:border-[#C49C64]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5] flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#C49C64]" />
                  Etiqueta Especial (?tag=...)
                </label>
                <input
                  type="text"
                  placeholder="ej. mesa-1, influencer-maria, volante-centro"
                  value={tag}
                  onChange={e => setTag(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1009] border border-[#3D291D] text-xs text-[#F4EDDF] font-mono focus:outline-none focus:border-[#C49C64]"
                />
              </div>
            </div>

            {/* Short Slug Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#D4C4B5]">
                Slug para Enlace Corto (opcional: /l/tu-slug)
              </label>
              <div className="flex items-center">
                <span className="px-3.5 py-2.5 bg-[#2B1B12] border border-r-0 border-[#3D291D] text-[#A89886] rounded-l-xl text-xs font-mono">
                  {baseUrl}/l/
                </span>
                <input
                  type="text"
                  placeholder="ej. promo1"
                  value={slug}
                  onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                  className="flex-1 px-3.5 py-2.5 rounded-r-xl bg-[#1B1009] border border-[#3D291D] text-xs text-[#F4EDDF] font-mono focus:outline-none focus:border-[#C49C64]"
                />
              </div>
            </div>

            {/* Live Generated URL Box */}
            <div className="p-3.5 rounded-2xl bg-[#1B1009] border border-[#3D291D] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A89886] font-medium">URL Generada con Atribución:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedFullUrl, 'preview-url')}
                  className="flex items-center gap-1 text-[#E2C38F] hover:underline font-mono text-[11px] cursor-pointer"
                >
                  {copiedUrl === 'preview-url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs font-mono text-[#D4C4B5] break-all select-all">
                {generatedFullUrl}
              </p>
              {generatedShortUrl && (
                <div className="pt-2 border-t border-[#3D291D]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#A89886]">Enlace Corto:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#E2C38F]">{generatedShortUrl}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedShortUrl, 'short-url')}
                      className="text-[#E2C38F] hover:underline font-mono text-[10px] cursor-pointer"
                    >
                      {copiedUrl === 'short-url' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !campaign.trim()}
              className="w-full py-3 px-4 rounded-xl font-['Syne'] font-bold text-xs uppercase tracking-wider bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar Enlace y Registrar en Métricas</span>
            </button>
          </form>
        </div>

        {/* QR Code Preview Box (1 col) */}
        <div className="p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-['Syne'] text-base font-bold text-[#F4EDDF] flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#C49C64]" />
              Código QR en Vivo
            </h3>
            <p className="text-xs text-[#A89886]">
              Ideal para imprimir en cartas, stickers para mesas, volantes o servilletas.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FFFFFF] shadow-inner">
            <QRCodeSVG
              ref={qrRef}
              value={generatedFullUrl}
              size={180}
              level="H"
              includeMargin={true}
            />
            <span className="text-[11px] font-mono text-[#523B2B] mt-2 font-bold text-center">
              TRADICIONAL COFFEE
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="w-full py-2.5 px-3 rounded-xl bg-[#2B1B12] border border-[#3D291D] hover:border-[#C49C64] text-[#E2C38F] text-xs font-['Syne'] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar QR (PNG de Alta Calidad)</span>
            </button>
            <p className="text-[10px] text-center text-[#7A6854]">
              Escanea directamente al destino con la etiqueta asignada.
            </p>
          </div>
        </div>
      </div>

      {/* Created Links Table */}
      <div className="p-6 rounded-3xl bg-[#23150D] border border-[#3D291D] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Syne'] text-base font-bold text-[#F4EDDF]">
              Enlaces Creados & Historial de Campañas
            </h2>
            <p className="text-xs text-[#A89886] mt-0.5">
              Gestión de enlaces activos con sus métricas de clics acumulados
            </p>
          </div>
          <span className="text-xs text-[#C49C64] font-mono font-bold">
            {links.length} enlace(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3D291D] text-[#A89886] font-mono text-[11px]">
                <th className="py-2.5 px-3">Nombre / Título</th>
                <th className="py-2.5 px-3">Campaña / Fuente</th>
                <th className="py-2.5 px-3">Etiqueta</th>
                <th className="py-2.5 px-3 text-right">Clics</th>
                <th className="py-2.5 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D291D]/50">
              {links.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#7A6854] italic">
                    Aún no creaste ningún enlace de campaña. Creá el primero en el formulario de arriba.
                  </td>
                </tr>
              ) : (
                links.map(link => {
                  const fullUrl = `${baseUrl}${link.targetPath}?utm_source=${link.utmSource}&utm_medium=${link.utmMedium}&utm_campaign=${link.utmCampaign}${link.tag ? `&tag=${link.tag}` : ''}`;
                  const isCopied = copiedUrl === `link-${link.id}`;

                  return (
                    <tr key={link.id} className="hover:bg-[#2B1B12]/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#F4EDDF]">{link.title}</div>
                        <div className="text-[11px] font-mono text-[#A89886] flex items-center gap-1.5 mt-0.5">
                          <span>{link.targetPath}</span>
                          {link.slug && (
                            <span className="text-[#C49C64]">/l/{link.slug}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-[#E2C38F]">{link.utmCampaign}</span>
                        <div className="text-[10px] text-[#7A6854]">
                          {link.utmSource} · {link.utmMedium}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        {link.tag ? (
                          <span className="px-2 py-0.5 rounded-md bg-[#2B1B12] text-[#C49C64] font-mono text-[11px] border border-[#3D291D]">
                            #{link.tag}
                          </span>
                        ) : (
                          <span className="text-[#7A6854]">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#F4EDDF]">
                        {link.clicksCount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(fullUrl, `link-${link.id}`)}
                            className="p-1.5 rounded-lg bg-[#2B1B12] hover:bg-[#3D291D] text-[#E2C38F] border border-[#3D291D] transition-colors cursor-pointer"
                            title="Copiar URL completa"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#2B1B12] hover:bg-[#3D291D] text-[#A89886] hover:text-[#F4EDDF] border border-[#3D291D] transition-colors"
                            title="Probar enlace"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => onDeleteLink(link.id)}
                            className="p-1.5 rounded-lg bg-[#2B1B12] hover:bg-[#EF4444]/20 text-[#EF4444] border border-[#3D291D] transition-colors cursor-pointer"
                            title="Eliminar enlace"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
