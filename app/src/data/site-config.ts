
export const siteConfig = {
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
            { label: "Ubicaciones", href: "#" },
            { label: "Nosotros", href: "#" }
        ],
        actionButton: {
            label: "Cómo llegar",
            href: "https://maps.app.goo.gl/27562592929292929292929292929292"
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

export const socialCards = [
    {
        id: "instagram",
        platform: "Instagram",
        iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
        title: "Estilo de vida",
        action: "@tradicionalcoffee",
        actionIcon: "arrow_outward",
        image: "https://53.fs1.hubspotusercontent-na1.net/hub/21966144/hubfs/raw_assets/public/Tradicional%20Cold%20Hub/lifestyle-frappes.jpg?width=1000&name=lifestyle-frappes.jpg",
        alt: "Two frappes held up against urban background",
        url: "#"
    },
    {
        id: "tiktok",
        platform: "TikTok",
        iconPath: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.71 3.5 2.38 1.18-.23 2.04-1.17 2.17-2.38.06-2.21-.02-4.43-.02-6.63.01-2.9-.01-5.79 0-8.69.52.26 1.08.43 1.64.49 1.08.13 2.17-.11 3.14-.54-.01-1.29-.01-2.58-.02-3.87z",
        title: "Entre bastidores",
        action: "Ver video",
        actionIcon: "play_circle",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH0uhfqXG8Bfbkq_JoOmSjtEr4o47Cj0vOkAV2RQnneyEVmiMgZMDPTOjLj3mNvVvhYmGo89pM6bWvIY_HxBO0a2q7x3XQo0nEbBflWyc4ZvTmf_px2pL5C-c4pxGpJsj8bt5Kun0c9xE_6ayrb--AEFXgiFFuFk1RaD2tVJkQEuBK4i14w3gfFURWBJLVNUJgpPGkPgbBKjCVHT7i9hBkkRPzdTNJAs5bjS4F2ooUfmkgIU7U92Qf2KagfSGvPp5laSSH77LY3vxR",
        alt: "Dynamic pour shot of cold brew coffee with high contrast",
        url: "https://www.tiktok.com/@tradicionalcoffeerol?_r=1&_t=ZS-946EHHVD9U5",
        overlayIcon: "play_arrow"
    },
    {
        id: "menu",
        platform: "Menú",
        iconSymbol: "menu",
        title: "Menú",
        action: "Ver Menú",
        actionIcon: "arrow_outward",
        image: "/images/frappe-oreo.jpeg",
        alt: "Dark stylized map of city streets",
        url: "/menu",
        overlayAnimate: true
    }
];
