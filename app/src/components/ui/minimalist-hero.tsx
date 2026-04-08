import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  bgImageSrc: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="font-modern text-xs font-bold tracking-[0.2em] uppercase text-white/50 transition-colors hover:text-coffee-gold"
  >
    {children}
  </Link>
);

// The main reusable Hero Section component using GSAP
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  bgImageSrc,
  overlayText,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Initial GSAP intro timeline
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header staggered animation
    tl.from('.header-element', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    })

      // Left text group
      .from('.left-content > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, "-=0.4")

      // Background glow of the center image
      .from(glowRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, "-=0.6")

      // Center Image slide and pop
      .from(imageRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.15,
        duration: 1.2,
        ease: 'back.out(1.5)'
      }, "-=0.8")

      // Big Right Text
      .from('.right-content', {
        y: 40,
        opacity: 0,
        duration: 1
      }, "-=0.8")

      // Footer elements
      .from('.footer-element', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
      }, "-=0.6");
  }, { scope: containerRef });

  // Hover animations using GSAP
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.25,
      rotate: 12,
      filter: 'brightness(1.25) drop-shadow(0 25px 40px rgba(214, 191, 144, 0.4))',
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      rotate: -6,
      filter: 'brightness(1) drop-shadow(0 15px 30px rgba(0,0,0,0.4))',
      duration: 0.6,
      ease: 'power2.out'
    });
    gsap.to(glowRef.current, {
      scale: 1,
      opacity: 0.8,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-dvh w-full flex-col items-center justify-between overflow-hidden bg-coffee-dark px-5 py-6 md:p-12 font-body',
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url('${bgImageSrc}')`, filter: 'grayscale(20%) brightness(0.5)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-coffee-dark/80 z-0"></div>

      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <div className="header-element text-lg md:text-2xl font-bold tracking-widest font-logo text-white uppercase">
          {logoText}
        </div>

        <div className="header-element hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 grid w-full max-w-7xl grow grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-0">
        {/* Left Text Content */}
        <div className="left-content text-center md:text-left order-2 md:order-1">
          <div className="mb-4 flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-px bg-coffee-gold"></div>
            <span className="font-modern text-xs font-bold uppercase tracking-[0.3em] text-coffee-gold">Hecho en Roldanillo</span>
          </div>
          <p className="max-w-xs mx-auto md:mx-0 text-sm leading-relaxed text-white/80 font-body">{mainText}</p>
          <Link to={readMoreLink} className="mt-6 inline-block font-modern text-[10px] font-bold text-white uppercase tracking-[0.2em] underline decoration-coffee-gold underline-offset-4 hover:text-coffee-gold transition-colors">
            Descubrir Más
          </Link>
        </div>

        {/* Center Image */}
        <div className="relative flex justify-center items-center h-full order-1 md:order-2">
          {/* Subtle Glow Behind Image */}
          <div
            ref={glowRef}
            className="absolute z-0 h-[280px] w-[280px] md:h-[550px] md:w-[550px] rounded-full bg-coffee-gold/20 blur-[50px]"
          ></div>

          <img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-50 h-auto w-[220px] md:w-[420px] origin-center object-cover -rotate-6"
            style={{
              filter: 'brightness(1) drop-shadow(0 15px 30px rgba(0,0,0,0.4))'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/400x600/1a1512/d6bf90?text=Frappe`;
            }}
          />
        </div>

        {/* Right Text */}
        <div className="right-content flex items-end justify-center md:justify-end order-3">
          <h1 className="font-display italic text-4xl md:text-[5rem] font-extrabold text-white leading-[0.9] text-center md:text-right">
            {overlayText.part1}
            <br />
            <span className="text-coffee-gold">{overlayText.part2}</span>
          </h1>
        </div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between flex-col gap-4 md:flex-row pb-4">
        <div className="footer-element text-[10px] md:text-xs font-modern uppercase tracking-widest text-white/50 text-center md:text-left">
          {locationText}
        </div>

        {/* Menu button */}
        <div className="footer-element">
          <Link
            to="/menu"
            className="flex items-center gap-2 bg-coffee-gold px-8 py-3 md:px-12 md:py-4 rounded-full font-modern font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-coffee-dark hover:bg-white transition-all shadow-premium hover:shadow-premium-gold"
          >
            Ver Menú
          </Link>
        </div>
      </footer>
    </div>
  );
};
