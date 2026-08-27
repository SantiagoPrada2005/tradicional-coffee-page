import React, { useState, useMemo } from 'react';
import { orderProducts } from '../../../data/frappes';

import { OrderProvider } from '../context/OrderProvider';
import { OrderHeader } from './OrderHeader';
import { FrappeCarousel } from './FrappeCarousel';
import { ProductDetails } from './ProductDetails';
import { OrderBar } from './OrderBar';
import { CartDrawer } from './CartDrawer';
import { PreparationNoteModal } from './PreparationNoteModal';

type FilterTab = 'all' | 'cold' | 'frappe' | 'latte';

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'frappe', label: 'Frappes' },
  { id: 'cold', label: 'Cafés & Bebidas Frías' },
  { id: 'latte', label: 'Lattes' },
];

const OrderPageContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterTab>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return orderProducts;
    return orderProducts.filter(p => {
      if (selectedCategory === 'cold') return p.category === 'cold';
      if (selectedCategory === 'frappe') return p.category === 'frappe';
      if (selectedCategory === 'latte') return p.category === 'latte';
      return true;
    });
  }, [selectedCategory]);

  const handleCategoryChange = (category: FilterTab) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  const safeIndex = (activeIndex + filteredProducts.length) % Math.max(1, filteredProducts.length);
  const currentProduct = filteredProducts[safeIndex] || orderProducts[0];

  return (
    <div className="relative min-h-screen w-full bg-[#1C110C] text-[#F4EDDF] flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12 selection:bg-[#E2C38F] selection:text-[#1C110C]">
      {/* Ambient Lighting Backdrops */}
      <div
        className="fixed top-0 -left-20 w-[450px] md:w-[600px] h-[450px] md:h-[600px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(226,195,143,0.8) 0%, rgba(226,195,143,0.2) 50%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="fixed bottom-0 -right-20 w-[400px] md:w-[550px] h-[400px] md:h-[550px] rounded-full pointer-events-none opacity-15 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(226,195,143,0.8) 0%, rgba(226,195,143,0.15) 50%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Header */}
      <OrderHeader />

      {/* Category Pills Navigation */}
      <div className="w-full max-w-xl mx-auto px-4 z-10 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1 pb-2">
        {CATEGORY_TABS.map(tab => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleCategoryChange(tab.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-['Syne'] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E2C38F] text-[#1C110C] shadow-[0_2px_12px_rgba(226,195,143,0.35)]'
                  : 'bg-[#2B1B12]/80 hover:bg-[#422B19] text-[#E2C38F]/70 hover:text-[#E2C38F] border border-[#E2C38F]/20'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Hero / Main Interaction Area */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-6xl mx-auto px-4 my-auto py-2">
        {/* Products Carousel */}
        <FrappeCarousel
          products={filteredProducts}
          activeIndex={safeIndex}
          onIndexChange={setActiveIndex}
        />

        {/* Product Details & Actions */}
        <ProductDetails
          product={currentProduct}
          currentIndex={safeIndex}
          totalCount={filteredProducts.length}
        />
      </main>

      {/* Persistent Order & Navigation Helpers */}
      <OrderBar />
      <CartDrawer />
      <PreparationNoteModal />
    </div>
  );
};

export default function OrderPage() {
  return (
    <OrderProvider>
      <OrderPageContent />
    </OrderProvider>
  );
}
