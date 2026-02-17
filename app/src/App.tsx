import { Routes, Route } from 'react-router-dom'
import ColdProductCarousel from './components/ColdProductCarousel'
import ColdHubHero from './components/ColdHubHero'
import SocialLocationHub from './components/SocialLocationHub'
import MenuPage from './components/MenuPage'
import './index.css'

function App() {
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
