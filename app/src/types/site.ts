export interface SiteBrand {
    name: string;
    shortName: string;
    logo: string;
    description: string;
}

export interface SiteHero {
    title: string;
    cta: string;
    tags: string[];
}

export interface SiteContact {
    email: string;
    phone: string;
    address: string;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface SocialLink {
    handle?: string;
    url: string;
    label?: string;
    platform?: string;
    icon?: string;
}

export interface SiteConfig {
    brand: SiteBrand;
    hero: SiteHero;
    contact: SiteContact;
    navigation: {
        header: NavLink[];
        actionButton: NavLink;
    };
    social: {
        instagram: SocialLink;
        tiktok: SocialLink;
        generic: SocialLink[];
    };
    footer: {
        company: NavLink[];
        legal: NavLink[];
        copyright: string;
    };
    newsletter: {
        title: string;
        highlight: string;
        suffix: string;
        description: string;
    };
}

export interface SocialCard {
    id: string;
    platform: string;
    iconPath?: string;
    iconSymbol?: string;
    title: string;
    action: string;
    actionIcon: string;
    image: string;
    alt: string;
    url: string;
    overlayIcon?: string;
    overlayAnimate?: boolean;
}
