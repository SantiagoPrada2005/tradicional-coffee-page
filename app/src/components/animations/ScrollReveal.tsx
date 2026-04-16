import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    className?: string;
    staggerChildren?: number;
    id?: string;
}

const animationConfigs: Record<AnimationType, gsap.TweenVars> = {
    'fade-up': { y: 40, opacity: 0 },
    'fade-down': { y: -40, opacity: 0 },
    'fade-left': { x: -40, opacity: 0 },
    'fade-right': { x: 40, opacity: 0 },
    'zoom-in': { scale: 0.85, opacity: 0 },
    'zoom-out': { scale: 1.15, opacity: 0 },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 0.8,
    className = '',
    staggerChildren = 0,
    id,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = containerRef.current;
        if (!el) return;

        const fromVars = animationConfigs[animation];

        if (staggerChildren > 0) {
            gsap.from(el.children, {
                ...fromVars,
                duration,
                delay,
                stagger: staggerChildren,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        } else {
            gsap.from(el, {
                ...fromVars,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }
    }, { scope: containerRef });

    return (
        <div id={id} ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
