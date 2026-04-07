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
      rotate: 12, // Tilted more to the left
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
      rotate: -6, // Back to standard left tilt
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
        'relative flex h-dvh w-full flex-col items-center justify-between overflow-hidden bg-coffee-dark p-6 md:p-12 font-body',
        className
      )}
    >
      {/* Background Image / Fondo Hero */}
      <div
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center grayscale-20% brightness-[0.5]"
        style={{ backgroundImage: `url('${bgImageSrc}')` }}
      />
      <div className="absolute inset-0 bg-liner-to-t from-coffee-dark via-coffee-dark/40 to-coffee-dark/80 z-0"></div>

      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <div className="header-element text-xl md:text-2xl font-bold tracking-widest font-logo text-white uppercase">
          {logoText}
        </div>

        <div className="header-element hidden items-center space-x-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button className="header-element flex flex-col space-y-1.5 md:hidden" aria-label="Open menu">
          <span className="block h-0.5 w-6 bg-coffee-gold"></span>
          <span className="block h-0.5 w-6 bg-coffee-gold"></span>
          <span className="block h-0.5 w-5 bg-coffee-gold"></span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 grid w-full max-w-7xl grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <div className="left-content order-2 md:order-1 text-center md:text-left mt-8 md:mt-0">
          <div className="mb-4 flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-px bg-coffee-gold"></div>
            <span className="font-modern text-xs font-bold uppercase tracking-[0.3em] text-coffee-gold">Hecho en Roldanillo</span>
          </div>
          <p className="mx-auto md:mx-0 max-w-xs text-sm leading-relaxed text-white/80 font-body">{mainText}</p>
          <Link to={readMoreLink} className="mt-6 inline-block font-modern text-[10px] font-bold text-white uppercase tracking-[0.2em] underline decoration-coffee-gold underline-offset-4 hover:text-coffee-gold transition-colors">
            Descubrir Más
          </Link>
        </div>

        {/* Center Image */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          {/* Subtle Glow Behind Image */}
          <div
            ref={glowRef}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-coffee-gold/20 blur-[50px] md:h-[450px] md:w-[450px] lg:h-[550px] lg:w-[550px]"
          ></div>

          <img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // Made it larger, added -rotate-6 initial tilt, and ensured no CSS transitions conflict with GSAP
            className="relative z-50 h-auto w-1000px origin-center object-cover -rotate-6 md:w-200 lg:w-10xl 7xl:w-12xl"
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
        <div className="right-content order-3 flex items-center justify-center text-center md:items-end md:justify-end mt-8 md:mt-0">
          <h1 className="font-display italic text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white leading-[0.9] text-center md:text-right">
            {overlayText.part1}
            <br />
            <span className="text-coffee-gold">{overlayText.part2}</span>
          </h1>
        </div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between pb-4">
        <div className="footer-element text-xs font-modern uppercase tracking-widest text-white/50 hidden md:block">
          {locationText}
        </div>

        {/* Menu button */}
        <div className="footer-element grow flex justify-center md:grow-0 md:justify-end w-full md:w-auto mt-6 md:mt-0">
          <Link
            to="/menu"
            className="flex items-center gap-2 bg-coffee-gold px-12 py-4 rounded-full font-modern font-bold text-[11px] uppercase tracking-[0.2em] text-coffee-dark hover:bg-white transition-all shadow-premium hover:shadow-premium-gold"
          >
            Ver Menú
          </Link>
        </div>
      </footer>
    </div>
  );
};
