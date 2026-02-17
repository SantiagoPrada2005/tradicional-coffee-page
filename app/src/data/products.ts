
export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    alt: string;
    category: 'nitro' | 'latte' | 'frappe' | 'cold' | 'hot' | 'dessert';
    tag?: {
        label: string;
        icon?: string;
    };
}

export const highlightedProducts: Product[] = [
    {
        id: 1,
        name: "Frappé de Chocolate",
        description: "Chocolate intenso con trozos de galleta y nuestra firma Tradicional.",
        price: "$4.95",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2bYF6dZamBRTJV2hEOXQiqRp6NXZx-1CAe_IHBLoPOCYkxHjCC2F9uzr6T6nXhhN8tx3Dgqk43cW_COdPUoPijftUYLJnu4zPygA3zx2r8Lmp3NcOtjf7j8O85hBhhmEMbah_VlCgh8bZ66U5Q7efYSLoQ0Uu2TAM_-cdp-mrNP1hO6NYExkimlxHJYxXcin-9JBMNZI0W4QtyU6lXZG13QpX3noqD3qhMnnL6FBALlag7wB1mgcN0tBvfvAH-s7XdYjp0hZqul42",
        alt: "Tradicional Chocolate Frappe with red straw",
        category: 'frappe',
        tag: {
            label: "Más pedido",
            icon: "local_fire_department"
        }
    },
    {
        id: 20,
        name: "Frappé de Oreo",
        description: "Oreo intenso con trozos de galleta y nuestra firma Tradicional.",
        price: "$4.95",
        image: "/images/frappe-oreo.jpeg",
        alt: "Tradicional Oreo Frappe with red straw",
        category: 'frappe',
        tag: {
            label: "Más pedido",
            icon: "local_fire_department"
        }
    },
    {
        id: 2,
        name: "Caramel Gold",
        description: "Vainilla cremosa con remolinos de caramelo y popote amarillo.",
        price: "$5.50",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcUvkjdzwjlYEQA_ZpKRnnryLZLEVaqkuPDe6PCiCv6A6yacRzMTMZkWxFZn1BUf_4361ei65TN31RRN5la8hRaLL5djrDRTN-kLJ1xZVEDH03TgIScjSyalf0DtLrm2s2-HNVpVB9PJwfirttvXHAWl3gYrfGoQ__Q0MuIvniD7Qz9shNUjplJLZX4Fsvwk9OtzsQPwht4dygGYYsYXt7QUw51rLkwmiRfWqBtkIXE7yXGzwwPx4V962BvoaAkWIHN7Y8Nt5cdG9E",
        alt: "Tradicional Caramel Frappe with yellow straw",
        category: 'frappe',
        tag: {
            label: "Nuevo"
        }
    },
    {
        id: 3,
        name: "Cookie & Cream",
        description: "El sabor de siempre, elevado con texturas crujientes reales.",
        price: "$5.75",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCksKvkjmLaTmpkwSmMuxWaNM2FQdko6uSgSapljqEFkF8Kr2BQ3w9c7w6Ctjtm_hGXwW-KceNHGFEdVZvqQtRuQs3f-ijqI0YtbIIVxHjcvpV2i6OWAPZ5YVg2zGZNFMCzu-XjONRTiQOEQwwpjllJNvDRmoHGhtumc3QHCms8VWDLd65bSfPyXZcjqmVAC_XcoOcAuTaVObSbKTJgYfs2-f2hLcvyYsOpX-NNiO5yLiM_P0ck7rYNobEEVpEkPp9oEowAhVa0yu2p",
        alt: "Sensory close-up of whipped cream and cookie crumbles",
        category: 'frappe'
    }
];

export const exploreProducts: Product[] = [
    {
        id: 4,
        name: "Espresso Tonic",
        description: "Cítrico y refrescante",
        price: "$3.95",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_BDQ1wfWEXpJ10Zfx_STtu0jlPnSgpGLZefTfRQ9CXjQ4f2EB3PeoUADEQsN-Axe3IR7PGEcIVikgXnvksnKSTA9exrGOK2T85yrZmxOKLQzBp7DTqFme8YsW4KZAFVpyhPUHRy6nsHDSQdaHiPKz5Pr-a1h3HPCYnVPR2FoOGvVp7rXiWvw6liXtw9aA1ddou5jqD3ockmd8_NaAd5mJInHLOzQJm3F7BAA_v12rtV5c9fmXAA241_-y6KfBST8GBON8BSyBVBJf",
        alt: "Small espresso shot glass",
        category: 'nitro'
    },
    {
        id: 5,
        name: "Botella Cold Brew",
        description: "Para llevar a casa",
        price: "$8.50",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClAn78kJYgAUiw2ETNQOgShQFHZI-xNC-qBF7OA3bLhsEEJmgX_3PEFyKaLGTXSPvG37ZulLE_Dum-MXBekc1dvA_j6ilhOk9N_icW6_Itp5KJkbtux4fvUpouGqXZrIB_N-_VTwInrtsIO0t4nQWv7JMFK8wa3SIvKTdIf6kOZYoONJc8mL6zpZ0X0UYl8-xr35xPqIokwCl3la8FabUwy8zXtqbrazhQpA-L1fLtL29xa52SLPYFel6-VKUhveZy7MDRwi00_gDo",
        alt: "Cold brew coffee bottle",
        category: 'nitro'
    },
    {
        id: 6,
        name: "Iced Latte Vainilla",
        description: "Suave y balanceado",
        price: "$4.50",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2bYF6dZamBRTJV2hEOXQiqRp6NXZx-1CAe_IHBLoPOCYkxHjCC2F9uzr6T6nXhhN8tx3Dgqk43cW_COdPUoPijftUYLJnu4zPygA3zx2r8Lmp3NcOtjf7j8O85hBhhmEMbah_VlCgh8bZ66U5Q7efYSLoQ0Uu2TAM_-cdp-mrNP1hO6NYExkimlxHJYxXcin-9JBMNZI0W4QtyU6lXZG13QpX3noqD3qhMnnL6FBALlag7wB1mgcN0tBvfvAH-s7XdYjp0hZqul42",
        alt: "Iced vanilla latte",
        category: 'latte'
    },
    {
        id: 7,
        name: "Capuccino Tradicional",
        description: "Espuma perfecta y cremosa",
        price: "$3.75",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_BDQ1wfWEXpJ10Zfx_STtu0jlPnSgpGLZefTfRQ9CXjQ4f2EB3PeoUADEQsN-Axe3IR7PGEcIVikgXnvksnKSTA9exrGOK2T85yrZmxOKLQzBp7DTqFme8YsW4KZAFVpyhPUHRy6nsHDSQdaHiPKz5Pr-a1h3HPCYnVPR2FoOGvVp7rXiWvw6liXtw9aA1ddou5jqD3ockmd8_NaAd5mJInHLOzQJm3F7BAA_v12rtV5c9fmXAA241_-y6KfBST8GBON8BSyBVBJf",
        alt: "Hot cappuccino",
        category: 'hot'
    },
    {
        id: 8,
        name: "Cheesecake de Arándanos",
        description: "Dulce y refrescante",
        price: "$4.25",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_BDQ1wfWEXpJ10Zfx_STtu0jlPnSgpGLZefTfRQ9CXjQ4f2EB3PeoUADEQsN-Axe3IR7PGEcIVikgXnvksnKSTA9exrGOK2T85yrZmxOKLQzBp7DTqFme8YsW4KZAFVpyhPUHRy6nsHDSQdaHiPKz5Pr-a1h3HPCYnVPR2FoOGvVp7rXiWvw6liXtw9aA1ddou5jqD3ockmd8_NaAd5mJInHLOzQJm3F7BAA_v12rtV5c9fmXAA241_-y6KfBST8GBON8BSyBVBJf",
        alt: "Blueberry cheesecake",
        category: 'dessert'
    }
];
