import React from 'react';
import { MinimalistHero } from './ui/minimalist-hero';
import { siteConfig } from '../data/site-config';

const ColdHubHero: React.FC = () => {
    const navLinks = siteConfig.navigation.header.map(item => ({
        label: item.label,
        href: item.href
    }));

    return (
        <section>
            <MinimalistHero
                logoText={siteConfig.brand.name}
                navLinks={navLinks}
                mainText="Disfruta de la mejor experiencia en café frío. Preparado con los mejores granos de origen y nuestra receta tradicional."
                readMoreLink="/menu"
                bgImageSrc="/images/fondo-hero.jpeg"
                imageSrc="/images/frappe-oreo-hero-Picsart-BackgroundRemover.jpeg"
                imageAlt="Frappé Oreo Tradicional Coffee"
                overlayText={{
                    part1: 'deliciosamente',
                    part2: 'frío.',
                }}
                locationText="Roldanillo, Valle del Cauca"
            />
        </section>
    );
};

export default ColdHubHero;
