import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ColdProductCarousel from './components/ColdProductCarousel'
import ColdHubHero from './components/ColdHubHero'
import SocialLocationHub from './components/SocialLocationHub'
import MenuPage from './components/MenuPage'
import { siteConfig } from './data/site-config'
import './index.css'

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
  }, [location]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <section id="hero" className="w-full">
              <ColdHubHero />
            </section>
            <section id="carousel" className="w-full">
              <ColdProductCarousel />
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
