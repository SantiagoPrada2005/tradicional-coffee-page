import React, { useState, useMemo } from 'react';
import { orderProducts } from '../../../data/frappes';
import { OrderProvider } from '../context/OrderProvider';
import { OrderHeader } from './OrderHeader';
import { FrappeCarousel } from './FrappeCarousel';
import { DesktopInfoColumn } from './DesktopInfoColumn';
import { DesktopConfigPanel } from './DesktopConfigPanel';
import { ProductDetails } from './ProductDetails';
import { OrderBar } from './OrderBar';
import { CartDrawer } from './CartDrawer';
import { PreparationNoteModal } from './PreparationNoteModal';
import { DeliveryAddressModal } from './DeliveryAddressModal';

type FilterTab = 'all' | 'frappe' | 'cold' | 'latte';

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'frappe', label: 'Frappes' },
  { id: 'cold', label: 'Cafés & Frías' },
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
    <div className="relative h-screen h-[100dvh] max-h-[100dvh] w-full bg-[#1C110C] text-[#F4EDDF] flex flex-col justify-between overflow-hidden selection:bg-[#E2C38F] selection:text-[#1C110C]">
      {/* Ambient Lighting Backdrops */}
      <div
        className="fixed top-0 -left-20 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(226,195,143,0.8) 0%, rgba(226,195,143,0.2) 50%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="fixed bottom-0 -right-20 w-[300px] md:w-[550px] h-[300px] md:h-[550px] rounded-full pointer-events-none opacity-15 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(226,195,143,0.8) 0%, rgba(226,195,143,0.15) 50%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Top Zone: Header & Categories with Double Spacing */}
      <div className="w-full flex flex-col flex-shrink-0 z-20 pt-[max(0.5rem,1.8vh)]">
        <OrderHeader />

        {/* Category Pills Navigation */}
        <div className="w-full max-w-xl mx-auto px-3 flex items-center justify-start sm:justify-center gap-2 flex-nowrap overflow-x-auto no-scrollbar pt-1.5 pb-2">
          {CATEGORY_TABS.map(tab => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-['Syne'] font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
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
      </div>

      {/* Main Experience Layout */}
      <main className="flex-1 flex items-center justify-center z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 min-h-0 overflow-hidden my-auto py-1">
        {/* Desktop 3-Column Layout (Cockpit) */}
        <div className="hidden lg:grid grid-cols-[340px_1fr_340px] items-center gap-6 xl:gap-10 w-full">
          {/* Left Column: Product Info */}
          <DesktopInfoColumn product={currentProduct} />

          {/* Center Column: Medallion Carousel & Peeks */}
          <div className="flex flex-col items-center justify-center">
            <FrappeCarousel
              products={filteredProducts}
              activeIndex={safeIndex}
              onIndexChange={setActiveIndex}
            />
          </div>

          {/* Right Column: Order Configuration & Accumulated Panel */}
          <DesktopConfigPanel product={currentProduct} />
        </div>

        {/* Mobile & Tablet Viewport-Fit Stack (With Doubled Dynamic Breathing Room Top and Bottom) */}
        <div className="flex lg:hidden flex-col items-center justify-between w-full max-w-md mx-auto h-full overflow-hidden pt-[max(0.5rem,2.5vh)] pb-[max(1rem,5.5vh)]">
          {/* Center Carousel Area */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full my-auto py-1">
            <FrappeCarousel
              products={filteredProducts}
              activeIndex={safeIndex}
              onIndexChange={setActiveIndex}
            />
          </div>

          {/* Bottom Product Details & Action Controls with Doubled Top Air */}
          <div className="w-full flex-shrink-0 pt-[max(0.5rem,2vh)]">
            <ProductDetails
              product={currentProduct}
              currentIndex={safeIndex}
              totalCount={filteredProducts.length}
            />
          </div>
        </div>
      </main>

      {/* Persistent Order & Navigation Helpers */}
      <OrderBar />
      <CartDrawer />
      <PreparationNoteModal />
      <DeliveryAddressModal />
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
