import React from 'react';
import { ShieldCheck, RefreshCw, Coffee, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  userEmail: string;
  isZeroTrust: boolean;
  activeTab: 'metrics' | 'links';
  onTabChange: (tab: 'metrics' | 'links') => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  userEmail,
  isZeroTrust,
  activeTab,
  onTabChange,
  onRefresh,
  isLoading,
}) => {
  return (
    <header className="border-b border-[#3D291D] bg-[#1F130B]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-[#2B1B12] border border-[#C49C64]/40 flex items-center justify-center text-[#E2C38F] hover:border-[#E2C38F] transition-colors"
            title="Volver a la tienda"
          >
            <Coffee className="w-5 h-5 text-[#C49C64]" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Syne'] text-lg font-bold text-[#F4EDDF] tracking-wide">
                Tradicional Admin
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C49C64]/15 text-[#E2C38F] border border-[#C49C64]/30">
                Analytics & Growth
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#A89886]">
              <div className="flex items-center gap-1 text-[#86EFAC]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">
                  {isZeroTrust ? 'Cloudflare Zero Trust' : 'Zero Trust Protected'}
                </span>
              </div>
              <span className="text-[#523B2B]">•</span>
              <span className="text-[11px] font-mono text-[#D4C4B5] truncate max-w-[200px]">
                {userEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex bg-[#2B1B12] p-1 rounded-xl border border-[#3D291D]">
            <button
              type="button"
              onClick={() => onTabChange('metrics')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-['Syne'] font-bold transition-all cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-[#C49C64] text-[#2B1B12] shadow-sm'
                  : 'text-[#A89886] hover:text-[#F4EDDF]'
              }`}
            >
              Métricas & Funnel
            </button>
            <button
              type="button"
              onClick={() => onTabChange('links')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-['Syne'] font-bold transition-all cursor-pointer ${
                activeTab === 'links'
                  ? 'bg-[#C49C64] text-[#2B1B12] shadow-sm'
                  : 'text-[#A89886] hover:text-[#F4EDDF]'
              }`}
            >
              Generador de Links & QR
            </button>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-xl bg-[#2B1B12] border border-[#3D291D] text-[#E2C38F] hover:bg-[#3D291D] hover:text-white transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50"
            title="Recargar métricas"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#C49C64]/30 text-[#E2C38F] hover:bg-[#C49C64]/10 text-xs font-medium transition-colors"
          >
            <span>Ver Tienda</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
};
