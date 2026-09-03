import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ColdHubHero from './features/home/components/ColdHubHero'
import SocialLocationHub from './features/home/components/SocialLocationHub'
import MenuPage from './features/menu/components/MenuPage'
import OrderPage from './features/order/components/OrderPage'
import { siteConfig } from './data/site-config'
import { LandingAccordionItem } from './features/menu/components/interactive-image-accordion'
import { initMetaPixel, trackPageView } from './lib/metaPixel'
import { captureAttribution, trackAnalyticsPageView } from './lib/analytics'

const AdminDashboard = lazy(() => import('./features/admin/pages/AdminDashboard'));

function App() {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    captureAttribution();
    trackPageView();
    trackAnalyticsPageView(location.pathname);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = `${siteConfig.brand.name} | Café Frío Hecho en Colombia`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', siteConfig.brand.description);
      }
    } else if (location.pathname === '/order') {
      document.title = `${siteConfig.brand.name} | Pedir Frappes`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <section id="hero" className="w-full">
              <ColdHubHero />
            </section>
            <section id="accordion" className="w-full">
              <LandingAccordionItem />
            </section>
            <section id="social" className="w-full">
              <SocialLocationHub />
            </section>
          </>
        } />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-[#170E08] flex items-center justify-center text-[#E2C38F] font-mono text-xs">
                  Cargando Tradicional Admin...
                </div>
              }
            >
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

export default App
