import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
    brand: {
        name: "Tradicional Coffee",
        shortName: "Tradicional Coffee",
        logo: "/images/logo.png",
        description: "Disfruta de la tradición del café en cada sorbo.\nLa experiencia definitiva en el corazón de Roldanillo, ofreciendo café artesanal de alta calidad, innovadores granizados y bebidas refrescantes. Un espacio para conectar y crear momentos memorables."
    },
    hero: {
        title: "Sabor auténtico en el corazón de Roldanillo",
        cta: "Ver Menú",
        tags: ["Frappes", "Iced Latte", "Espresso Tonic", "Coffees"]
    },
    contact: {
        email: "hola@tradicionalcoldhub.com",
        phone: "+57 300 123 4567",
        address: "Roldanillo, Valle del Cauca, Colombia"
    },
    navigation: {
        header: [
            { label: "Menú", href: "/menu" },
            { label: "Ubicación", href: "/#mapa" },
            { label: "Nosotros", href: "/#redes" }
        ],
        actionButton: {
            label: "Cómo llegar",
            href: "https://www.google.com/maps/search/?api=1&query=Tradicional+Coffee+Roldanillo"
        }
    },
    social: {
        instagram: {
            handle: "@tradicionalcoffee",
            url: "https://www.instagram.com/tradicional_coffee_roldanillo/",
            label: "Instagram"
        },
        tiktok: {
            handle: "Tradicional Cold Hub",
            url: "https://www.tiktok.com/@tradicionalcoffeerol?_r=1&_t=ZS-946EHHVD9U5",
            label: "TikTok"
        },
        generic: [
            { platform: "public", icon: "public", url: "#" },
            { platform: "mail", icon: "mail", url: "#" }
        ]
    },
    footer: {
        company: [
            { label: "Nosotros", href: "#" },
            { label: "Carreras", href: "#" },
            { label: "Prensa", href: "#" }
        ],
        legal: [
            { label: "Términos", href: "#" },
            { label: "Privacidad", href: "#" },
            { label: "Cookies", href: "#" }
        ],
        copyright: `© ${new Date().getFullYear()} Tradicional Cold Hub. Todos los derechos reservados.`
    },
    newsletter: {
        title: "Únete a más de",
        highlight: "10k amantes",
        suffix: "del café frío",
        description: "Suscríbete a nuestro newsletter para ofertas exclusivas"
    }
};
