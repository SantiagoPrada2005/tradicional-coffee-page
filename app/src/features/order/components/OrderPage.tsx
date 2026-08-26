import React, { useState } from 'react';
import { FRAPPES_CATALOG } from '../../../data/frappes';
import { OrderProvider } from '../context/OrderProvider';
import { OrderHeader } from './OrderHeader';
import { FrappeCarousel } from './FrappeCarousel';
import { ProductDetails } from './ProductDetails';
import { OrderBar } from './OrderBar';
import { CartDrawer } from './CartDrawer';
import { PreparationNoteModal } from './PreparationNoteModal';

const OrderPageContent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentFrappe = FRAPPES_CATALOG[activeIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#1C110C] text-[#F4EDDF] flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12 selection:bg-[#E2C38F] selection:text-[#1C110C]">
      {/* Ambient Lighting Backdrops (Option 1 Design) */}
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

      {/* Hero / Main Interaction Area */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-6xl mx-auto px-4 my-auto py-2">
        {/* Frappes Carousel */}
        <FrappeCarousel
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />

        {/* Product Details & Actions */}
        <ProductDetails
          frappe={currentFrappe}
          totalCount={FRAPPES_CATALOG.length}
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
