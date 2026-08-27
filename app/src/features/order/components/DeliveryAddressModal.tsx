import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MapPin, Store, Utensils, Bike } from 'lucide-react';
import { useOrder } from '../context/useOrder';

type DeliveryMode = 'pickup' | 'delivery';

const PICKUP_PRESETS = [
  'Para llevar'
];

const STREET_PREFIXES = ['Calle', 'Carrera', 'Avenida', 'Diagonal', 'Transversal'];

interface InnerModalProps {
  initialAddress: string;
  onClose: () => void;
  onSave: (address: string) => void;
}

const InnerModalContent: React.FC<InnerModalProps> = ({ initialAddress, onClose, onSave }) => {
  // Determine initial mode based on existing text
  const isInitialPickup = initialAddress.toLowerCase().includes('recoger') ||
    initialAddress.toLowerCase().includes('mesa') ||
    initialAddress.toLowerCase().includes('barra');

  const [mode, setMode] = useState<DeliveryMode>(isInitialPickup ? 'pickup' : 'delivery');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // State for Pickup
  const [pickupOption, setPickupOption] = useState(() => {
    if (isInitialPickup) {
      return initialAddress.replace(/^Recoger\s*\(?en local\)?\s*[:-]?\s*/i, '').trim() || 'Para llevar / En barra';
    }
    return 'Para llevar / En barra';
  });

  // State for Delivery
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');

  const handleSelectPrefix = (prefix: string) => {
    if (!street.trim()) {
      setStreet(`${prefix} `);
    } else if (!street.startsWith(prefix)) {
      setStreet(`${prefix} ${street.replace(/^(Calle|Carrera|Cra|Av|Avenida|Diag|Diagonal|Trans|Transversal)\.?\s*/i, '')}`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let finalFormatted = '';

    if (mode === 'pickup') {
      finalFormatted = `Recoger en local: ${pickupOption.trim()}`;
    } else {
      const parts: string[] = [];
      if (street.trim() && houseNumber.trim()) {
        parts.push(`${street.trim()} ${houseNumber.startsWith('#') ? houseNumber.trim() : `# ${houseNumber.trim()}`}`);
      } else if (street.trim()) {
        parts.push(street.trim());
      } else if (houseNumber.trim()) {
        parts.push(houseNumber.trim());
      }

      if (neighborhood.trim()) {
        parts.push(`Barrio ${neighborhood.trim()}`);
      }

      if (reference.trim()) {
        parts.push(`(${reference.trim()})`);
      }

      finalFormatted = parts.length > 0 ? `Domicilio: ${parts.join(', ')}` : '';
    }

    onSave(finalFormatted);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const isDeliveryValid = mode === 'delivery' ? Boolean(street.trim() && houseNumber.trim()) : Boolean(pickupOption.trim());

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
            onClick={() => setMode('pickup')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${mode === 'pickup'
                ? 'bg-[#2B1B12] text-[#E2C38F] shadow-sm'
                : 'text-[#7A6854] hover:text-[#2B1B12]'
              }`}
          >
            <Store className="w-4 h-4" />
            <span>Recoger en local</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('delivery')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${mode === 'delivery'
                ? 'bg-[#2B1B12] text-[#E2C38F] shadow-sm'
                : 'text-[#7A6854] hover:text-[#2B1B12]'
              }`}
          >
            <Bike className="w-4 h-4" />
            <span>A Domicilio</span>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSave} className="space-y-4">
          {mode === 'pickup' ? (
            /* PICKUP MODE CONTENT */
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-[#7A6854] font-medium">
                <Utensils className="w-3.5 h-3.5 text-[#C49C64]" />
                <span>Selecciona o escribe el lugar de entrega:</span>
              </div>

              {/* Quick Pickup Presets */}
              <div className="flex flex-wrap gap-1.5">
                {PICKUP_PRESETS.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPickupOption(preset)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all font-['Plus_Jakarta_Sans'] cursor-pointer ${pickupOption === preset
                        ? 'bg-[#C49C64] text-[#2B1B12] border-[#C49C64] font-semibold shadow-sm'
                        : 'bg-[#F4EDDF] hover:bg-[#EFE4CD] text-[#2B1B12] border-[#E2D3BB]'
                      }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Custom Pickup Detail Input (Font-size 16px text-base on mobile to avoid zoom) */}
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
          ) : (
            /* DELIVERY MODE CONTENT */
            <div className="space-y-3">
              {/* Quick Street Prefixes */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#7A6854] font-medium mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C49C64]" />
                  <span>Tipo de vía:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STREET_PREFIXES.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleSelectPrefix(p)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all font-['Plus_Jakarta_Sans'] cursor-pointer ${street.toLowerCase().startsWith(p.toLowerCase())
                          ? 'bg-[#C49C64] text-[#2B1B12] border-[#C49C64] font-semibold'
                          : 'bg-[#F4EDDF] hover:bg-[#EFE4CD] text-[#2B1B12] border-[#E2D3BB]'
                        }`}
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Street & Number Split Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                    Calle / Carrera <span className="text-[#C49C64]">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="Ej: Cra 15 / Calle 45"
                    autoComplete="address-line1"
                    enterKeyHint="next"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                    Número / Casa / Apto <span className="text-[#C49C64]">*</span>
                  </label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={e => setHouseNumber(e.target.value)}
                    placeholder="Ej: # 22-10 Apto 302"
                    autoComplete="address-line2"
                    enterKeyHint="next"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Neighborhood & Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                    Barrio
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    placeholder="Ej: Palermo / El Cable"
                    autoComplete="address-level3"
                    enterKeyHint="next"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-['Syne'] font-bold text-[#7A6854] uppercase mb-1">
                    Edificio / Referencia
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    placeholder="Ej: Edif. Aurora, portón gris"
                    enterKeyHint="done"
                    className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-xl p-3 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setStreet('');
                setHouseNumber('');
                setNeighborhood('');
                setReference('');
                setPickupOption('Para llevar / En barra');
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
              className={`flex-1 py-3.5 px-6 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${savedSuccess
                  ? 'bg-[#2B1B12] text-[#E2C38F]'
                  : isDeliveryValid
                    ? 'bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12]'
                    : 'bg-[#E2D3BB] text-[#7A6854] cursor-not-allowed opacity-60'
                }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#E2C38F]" />
                  <span>GUARDADO CON ÉXITO</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  <span>CONFIRMAR {mode === 'pickup' ? 'RECOGIDA' : 'DIRECCIÓN'}</span>
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
  const { isAddressModalOpen, setIsAddressModalOpen, deliveryAddress, setDeliveryAddress } = useOrder();

  return (
    <AnimatePresence>
      {isAddressModalOpen && (
        <InnerModalContent
          key="address-modal"
          initialAddress={deliveryAddress}
          onClose={() => setIsAddressModalOpen(false)}
          onSave={setDeliveryAddress}
        />
      )}
    </AnimatePresence>
  );
};
