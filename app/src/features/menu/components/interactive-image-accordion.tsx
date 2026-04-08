import React, { useState, useEffect } from 'react';
import { accordionItems, type AccordionItemData } from '../../../data/products';

// --- Types ---
interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-xl font-display italic font-bold whitespace-nowrap tracking-wide
          transition-all duration-300 ease-in-out
          ${isActive
            ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
            : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = accordionItems.filter(item => item.id >= 1 && item.id <= 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % filteredItems.length);
    }, 2500); // tiempo en milisegundos 

    return () => clearInterval(interval);
  }, [activeIndex, filteredItems.length]);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    // 1. AQUÍ ESTÁ LA MAGIA: min-h-[100dvh] flex flex-col justify-center
    <div className="bg-[#D2B48C] font-body min-h-100dvh flex flex-col justify-center">

      {/* 2. Reduje py-12 md:py-24 a py-8 md:py-12 para que no empuje el contenido hacia afuera */}
      <section className="container mx-auto px-4 py-8 md:py-12 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-display italic text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-white leading-tight">
              Los más <span className="text-coffee-dark">pedidos</span>
            </h1>
            <p className="mt-6 text-lg font-body text-white/90 max-w-xl mx-auto md:mx-0">
              Disfruta de nuestros productos más populares, elaborados con pasión y los mejores ingredientes para brindarte una experiencia inolvidable.
            </p>
            <div className="mt-8">
              <a
                href="#menu"
                className="inline-block bg-coffee-dark text-coffee-gold font-modern text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-coffee-dark transition-colors duration-300"
              >
                Ver Menú
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4 max-w-full">
              {accordionItems.filter(item => item.id >= 1 && item.id <= 5).map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}