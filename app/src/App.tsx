import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ColdHubHero from './features/home/components/ColdHubHero'
import SocialLocationHub from './features/home/components/SocialLocationHub'
import MenuPage from './features/menu/components/MenuPage'
import { siteConfig } from './data/site-config'
import { LandingAccordionItem } from './features/menu/components/interactive-image-accordion'

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = `${siteConfig.brand.name} | Café Frío Hecho en Colombia`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', siteConfig.brand.description);
      }
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
      </Routes>
    </div>
  )
}

export default App
