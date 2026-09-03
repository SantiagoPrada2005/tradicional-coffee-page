import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MapPin, Store, Utensils, Bike, Building2, Compass } from 'lucide-react';
import { useOrder } from '../context/useOrder';
import { generateWhatsAppOrderUrl, trackOrderPlacement } from '../utils/whatsapp';

type DeliveryMode = 'pickup' | 'delivery';

const PICKUP_PRESETS = [
  'Para llevar',
  'En barra / Local',
  'Mesa'
];

const STREET_PREFIXES = ['Calle', 'Carrera', 'Avenida', 'Diagonal', 'Transversal'];

interface InnerModalProps {
  initialAddress: string;
  hasCartItems: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
}

const parseInitialAddress = (raw: string) => {
  if (!raw || !raw.trim()) {
    return {
      mode: 'delivery' as DeliveryMode,
      addressLine: '',
      neighborhood: '',
      reference: '',
      pickupOption: 'Para llevar',
    };
  }

  const isExplicitPickup =
    raw.toLowerCase().startsWith('recoger') ||
    raw.toLowerCase().startsWith('en local');

  if (isExplicitPickup) {
    const cleaned = raw.replace(/^Recoger\s*(en local)?\s*[:-]?\s*/i, '').trim();
    return {
      mode: 'pickup' as DeliveryMode,
      addressLine: '',
      neighborhood: '',
      reference: '',
      pickupOption: cleaned || 'Para llevar',
    };
  }

  let text = raw.replace(/^Domicilio:\s*/i, '').trim();
  let reference = '';
  const refMatch = text.match(/\((.*?)\)/);
  if (refMatch) {
    reference = refMatch[1].trim();
    text = text.replace(/\(.*?\)/, '').trim();
  }

  let neighborhood = '';
  const barrioMatch = text.match(/Barrio\s+([^,]+)/i);
  if (barrioMatch) {
    neighborhood = barrioMatch[1].trim();
    text = text.replace(/,?\s*Barrio\s+[^,]+/i, '').trim();
  }

  const addressLine = text.replace(/^,\s*|,\s*$/g, '').trim();

  return {
    mode: 'delivery' as DeliveryMode,
    addressLine,
    neighborhood,
    reference,
    pickupOption: 'Para llevar',
  };
};

const InnerModalContent: React.FC<InnerModalProps> = ({ initialAddress, hasCartItems, onClose, onSave }) => {
  const initial = parseInitialAddress(initialAddress);

  const [mode, setMode] = useState<DeliveryMode>(initial.mode);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // State for Pickup
  const [pickupOption, setPickupOption] = useState(initial.pickupOption);

  // State for Delivery
  const [addressLine, setAddressLine] = useState(initial.addressLine);
  const [neighborhood, setNeighborhood] = useState(initial.neighborhood);
  const [reference, setReference] = useState(initial.reference);

  const handleSelectPrefix = (prefix: string) => {
    if (!addressLine.trim()) {
      setAddressLine(`${prefix} `);
    } else {
      const cleaned = addressLine.replace(/^(Calle|Carrera|Cra|Cra\.|Av|Avenida|Diag|Diagonal|Trans|Transversal)\.?\s*/i, '');
      setAddressLine(`${prefix} ${cleaned}`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let finalFormatted = '';

    if (mode === 'pickup') {
      finalFormatted = `Recoger en local: ${pickupOption.trim()}`;
    } else {
      const parts: string[] = [];
      if (addressLine.trim()) {
        parts.push(addressLine.trim());
      }
      if (neighborhood.trim()) {
        const cleanBarrio = neighborhood.trim().replace(/^Barrio\s+/i, '');
        parts.push(`Barrio ${cleanBarrio}`);
      }
      if (reference.trim()) {
        const cleanRef = reference.trim().replace(/^\(|\)$/g, '');
        parts.push(`(${cleanRef})`);
      }

      finalFormatted = parts.length > 0 ? `Domicilio: ${parts.join(', ')}` : '';
    }

    onSave(finalFormatted);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const isDeliveryValid =
    mode === 'delivery'
      ? Boolean(addressLine.trim() && neighborhood.trim())
      : Boolean(pickupOption.trim());

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A0604]/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#FBF6EB] text-[#2B1B12] rounded-[28px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#E2D3BB] z-10 my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFE4CD] hover:bg-[#E2D3BB] flex items-center justify-center text-[#2B1B12] transition-colors cursor-pointer"
          aria-label="Cerrar modal de entrega"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="font-['Syne'] tracking-[0.16em] text-[11px] font-bold text-[#C49C64] uppercase block mb-1">
            MÉTODO DE ENTREGA
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-[#2B1B12] leading-tight">
            ¿Cómo deseas recibir tu café?
          </h3>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE4CD]/80 rounded-2xl mb-4 border border-[#E2D3BB]">
          <button
            type="button"
            onClick={() => setMode('delivery')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'delivery'
                ? 'bg-[#2B1B12] text-[#E2C38F] shadow-sm'
                : 'text-[#7A6854] hover:text-[#2B1B12]'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>A Domicilio</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('pickup')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'pickup'
                ? 'bg-[#2B1B12] text-[#E2C38F] shadow-sm'
                : 'text-[#7A6854] hover:text-[#2B1B12]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Recoger en local</span>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSave} className="space-y-4">
          {mode === 'delivery' ? (
            /* DELIVERY MODE CONTENT */
            <div className="space-y-3.5">
              {/* Quick Street Prefixes */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#7A6854] font-medium mb-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C49C64]" />
                  <span>Tipo de vía rápida:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STREET_PREFIXES.map(p => {
                    const isSelected = addressLine.toLowerCase().startsWith(p.toLowerCase());
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSelectPrefix(p)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all font-['Plus_Jakarta_Sans'] cursor-pointer ${
                          isSelected
                            ? 'bg-[#C49C64] text-[#2B1B12] border-[#C49C64] font-semibold'
                            : 'bg-[#F4EDDF] hover:bg-[#EFE4CD] text-[#2B1B12] border-[#E2D3BB]'
                        }`}
                      >
                        + {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exact Address Field */}
              <div>
                <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                  Dirección exacta (Calle / Carrera y número) <span className="text-[#C49C64]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={addressLine}
                    onChange={e => setAddressLine(e.target.value)}
                    placeholder="Ej: Carrera 23 # 45-12 o Calle 10 # 5-20"
                    autoComplete="street-address"
                    enterKeyHint="next"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                  <MapPin className="w-4 h-4 text-[#C49C64] absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Neighborhood Field */}
              <div>
                <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                  Barrio o Sector <span className="text-[#C49C64]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    placeholder="Ej: Palermo, El Cable, La Sultana, Centro..."
                    autoComplete="address-level3"
                    enterKeyHint="next"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                  <Building2 className="w-4 h-4 text-[#7A6854]/70 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Additional Reference Field */}
              <div>
                <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                  Apartamento, Torre o Referencia (Opcional)
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                  placeholder="Ej: Apto 402 Torre 2, portón negro, timbre 3..."
                  enterKeyHint="done"
                  className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                />
              </div>
            </div>
          ) : (
            /* PICKUP MODE CONTENT */
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-[#7A6854] font-medium">
                <Utensils className="w-3.5 h-3.5 text-[#C49C64]" />
                <span>Opciones de consumo:</span>
              </div>

              {/* Quick Pickup Presets */}
              <div className="flex flex-wrap gap-1.5">
                {PICKUP_PRESETS.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPickupOption(preset)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all font-['Plus_Jakarta_Sans'] cursor-pointer ${
                      pickupOption === preset
                        ? 'bg-[#C49C64] text-[#2B1B12] border-[#C49C64] font-semibold shadow-sm'
                        : 'bg-[#F4EDDF] hover:bg-[#EFE4CD] text-[#2B1B12] border-[#E2D3BB]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Custom Pickup Detail Input */}
              <div className="pt-1">
                <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                  Detalle adicional de recogida / mesa
                </label>
                <input
                  type="text"
                  value={pickupOption}
                  onChange={e => setPickupOption(e.target.value)}
                  placeholder="Ej: Mesa 3, En la barra, Para llevar..."
                  enterKeyHint="done"
                  className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setAddressLine('');
                setNeighborhood('');
                setReference('');
                setPickupOption('Para llevar');
                onSave('');
              }}
              className="px-4 py-3 rounded-full text-xs font-['Syne'] font-bold text-[#7A6854] hover:text-[#2B1B12] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Limpiar
            </button>

            <motion.button
              type="submit"
              disabled={!isDeliveryValid}
              whileTap={{ scale: 0.96 }}
              className={`flex-1 py-3.5 px-6 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                savedSuccess
                  ? 'bg-[#2B1B12] text-[#E2C38F]'
                  : isDeliveryValid
                  ? 'bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12]'
                  : 'bg-[#E2D3BB] text-[#7A6854] cursor-not-allowed opacity-60'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#E2C38F]" />
                  <span>{hasCartItems ? 'REDIRECCIONANDO...' : 'GUARDADO CON ÉXITO'}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  <span>{hasCartItems ? 'CONFIRMAR Y PEDIR' : `CONFIRMAR ${mode === 'pickup' ? 'RECOGIDA' : 'DOMICILIO'}`}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const DeliveryAddressModal: React.FC = () => {
  const {
    isAddressModalOpen,
    setIsAddressModalOpen,
    setIsCartOpen,
    deliveryAddress,
    setDeliveryAddress,
    cart,
    totalAmount,
    totalCount,
    preparationNote,
  } = useOrder();

  const handleSave = (address: string) => {
    setDeliveryAddress(address);
    if (cart.length > 0 && address.trim()) {
      trackOrderPlacement(cart, totalAmount, totalCount);
      const url = generateWhatsAppOrderUrl(cart, totalAmount, preparationNote, address);
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsCartOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isAddressModalOpen && (
        <InnerModalContent
          key="address-modal"
          initialAddress={deliveryAddress}
          hasCartItems={cart.length > 0}
          onClose={() => setIsAddressModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </AnimatePresence>
  );
};
