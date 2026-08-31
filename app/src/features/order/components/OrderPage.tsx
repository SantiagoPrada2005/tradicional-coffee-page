import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, IceCream, CupSoda } from 'lucide-react';
import type { Product } from '../../../types/product';
import { orderProducts, parseProductPrice } from '../../../data/frappes';
import { trackViewContent } from '../../../lib/metaPixel';
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

type FilterCategory = 'all' | 'frappe' | 'coffee' | 'cold';

interface CategoryTab {
  id: FilterCategory;
  label: string;
  icon: React.ElementType;
  filter: (product: Product) => boolean;
}

const CATEGORIES: CategoryTab[] = [
  {
    id: 'all',
    label: 'Todos',
    icon: Sparkles,
    filter: () => true,
  },
  {
    id: 'frappe',
    label: 'Frappés',
    icon: IceCream,
    filter: (p) => p.category === 'frappe',
  },
  {
    id: 'coffee',
    label: 'Cafés Fríos',
    icon: Coffee,
    filter: (p) =>
      p.category === 'latte' ||
      p.name.toLowerCase().includes('americano') ||
      p.name.toLowerCase().includes('hielat') ||
      Boolean(p.tag?.label?.toUpperCase().includes('CAFÉ')) ||
      Boolean(p.tag?.label?.toUpperCase().includes('ESPECIALIDAD')),
  },
  {
    id: 'cold',
    label: 'Bebidas Frías',
    icon: CupSoda,
    filter: (p) =>
      p.category === 'cold' &&
      !p.name.toLowerCase().includes('americano') &&
      !p.name.toLowerCase().includes('hielat'),
  },
];

const OrderPageContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategoryConfig = useMemo(
    () => CATEGORIES.find((cat) => cat.id === selectedCategory) ?? CATEGORIES[0],
    [selectedCategory]
  );

  const filteredProducts = useMemo(() => {
    return orderProducts.filter(activeCategoryConfig.filter);
  }, [activeCategoryConfig]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: orderProducts.length,
      frappe: 0,
      coffee: 0,
      cold: 0,
    };
    orderProducts.forEach((p) => {
      CATEGORIES.forEach((cat) => {
        if (cat.id !== 'all' && cat.filter(p)) {
          counts[cat.id]++;
        }
      });
    });
    return counts;
  }, []);

  const handleCategoryChange = (category: FilterCategory) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  const safeIndex = (activeIndex + filteredProducts.length) % Math.max(1, filteredProducts.length);
  const currentProduct = filteredProducts[safeIndex] || orderProducts[0];

  useEffect(() => {
    if (currentProduct) {
      trackViewContent({
        id: currentProduct.id,
        name: currentProduct.name,
        price: parseProductPrice(currentProduct.price),
        category: currentProduct.category,
      });
    }
  }, [currentProduct?.id]);

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

      {/* Top Zone: Header & Categories */}
      <div className="w-full flex flex-col flex-shrink-0 z-20 pt-[max(0.5rem,1.8vh)]">
        <OrderHeader />

        {/* Category Navigation */}
        <div
          role="tablist"
          aria-label="Categorías de productos"
          className="w-full max-w-2xl mx-auto px-3 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar pt-1.5 pb-2"
        >
          {CATEGORIES.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const Icon = tab.icon;
            const count = categoryCounts[tab.id];

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(tab.id)}
                className={`relative group px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-['Syne'] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 sm:gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#E2C38F] ${
                  isActive
                    ? 'text-[#1C110C]'
                    : 'text-[#E2C38F]/75 hover:text-[#E2C38F] hover:bg-[#422B19]/40'
                }`}
              >
                {/* Animated Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#E2C38F] rounded-full shadow-[0_2px_14px_rgba(226,195,143,0.35)] -z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {!isActive && (
                  <div className="absolute inset-0 rounded-full bg-[#2B1B12]/80 border border-[#E2C38F]/15 group-hover:border-[#E2C38F]/30 -z-0 transition-colors" />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1C110C]' : 'text-[#C49C64] group-hover:text-[#E2C38F]'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#1C110C]/15 text-[#1C110C]'
                        : 'bg-[#1C110C]/60 text-[#E2C38F]/60 group-hover:text-[#E2C38F]/90'
                    }`}
                  >
                    {count}
                  </span>
                </span>
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
