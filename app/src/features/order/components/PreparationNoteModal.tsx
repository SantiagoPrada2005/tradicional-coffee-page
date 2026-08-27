import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import { useOrder } from '../context/useOrder';

const QUICK_TAGS = [
  'Sin mucho hielo',
  'Poco dulce',
  'Leche deslactosada',
  'Extra chantilly',
  'Sin chantilly',
  'Hielo por separado',
];

interface InnerModalProps {
  initialNote: string;
  onClose: () => void;
  onSave: (note: string) => void;
}

const InnerModalContent: React.FC<InnerModalProps> = ({ initialNote, onClose, onSave }) => {
  const [localNote, setLocalNote] = useState(initialNote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localNote);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleAddTag = (tag: string) => {
    if (!localNote.trim()) {
      setLocalNote(tag);
    } else if (!localNote.includes(tag)) {
      setLocalNote(prev => `${prev.trim()}, ${tag}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0604]/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#FBF6EB] text-[#2B1B12] rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#E2D3BB] z-10 overflow-hidden"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFE4CD] hover:bg-[#E2D3BB] flex items-center justify-center text-[#2B1B12] transition-colors cursor-pointer"
          aria-label="Cerrar modal de notas"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <span className="font-['Syne'] tracking-[0.16em] text-[11px] font-bold text-[#C49C64] uppercase block mb-1">
            NOTA DE PREPARACIÓN
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#2B1B12] leading-tight">
            ¿Algo especial con tu pedido?
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6854] font-['Plus_Jakarta_Sans'] mt-1">
            Tu barista la tendrá en cuenta al preparar cada frappé.
          </p>
        </div>

        {/* Quick suggestions tags */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-[#7A6854] font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C49C64]" />
            <span>Sugerencias rápidas:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-['Plus_Jakarta_Sans'] cursor-pointer ${
                  localNote.includes(tag)
                    ? 'bg-[#C49C64] text-[#2B1B12] border-[#C49C64] font-semibold'
                    : 'bg-[#F4EDDF] hover:bg-[#EFE4CD] text-[#2B1B12] border-[#E2D3BB]'
                }`}
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="relative">
            <textarea
              value={localNote}
              onChange={e => setLocalNote(e.target.value)}
              placeholder="Escribe aquí tus instrucciones personalizadas..."
              rows={3}
              maxLength={200}
              enterKeyHint="done"
              className="w-full bg-[#F4EDDF] text-[#2B1B12] placeholder-[#7A6854]/60 text-base md:text-sm font-['Plus_Jakarta_Sans'] rounded-2xl p-4 border border-[#E2D3BB] focus:border-[#C49C64] focus:ring-1 focus:ring-[#C49C64] outline-none transition-all resize-none"
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-[#7A6854] font-mono">
              {localNote.length}/200
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setLocalNote('');
                onSave('');
              }}
              className="px-4 py-3 rounded-full text-xs font-['Syne'] font-bold text-[#7A6854] hover:text-[#2B1B12] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Limpiar
            </button>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              className={`flex-1 py-3.5 px-6 rounded-full font-['Syne'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                savedSuccess
                  ? 'bg-[#2B1B12] text-[#E2C38F]'
                  : 'bg-[#C49C64] hover:bg-[#D6A354] text-[#2B1B12]'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#E2C38F]" />
                  <span>NOTA GUARDADA</span>
                </>
              ) : (
                <span>GUARDAR NOTA</span>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const PreparationNoteModal: React.FC = () => {
  const { isNoteModalOpen, setIsNoteModalOpen, preparationNote, setPreparationNote } = useOrder();

  return (
    <AnimatePresence>
      {isNoteModalOpen && (
        <InnerModalContent
          key="note-modal"
          initialNote={preparationNote}
          onClose={() => setIsNoteModalOpen(false)}
          onSave={setPreparationNote}
        />
      )}
    </AnimatePresence>
  );
};
