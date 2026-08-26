export interface FrappeItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  price: number;
  formattedPrice: string;
  image: string;
  alt: string;
  badge?: string;
  accentColor?: string;
}

export const FRAPPES_CATALOG: FrappeItem[] = [
  {
    id: "frappe-oreo",
    number: "01",
    name: "Frappe Oreo",
    tagline: "El consentido de la casa",
    category: "FRAPPE · CLÁSICO",
    description: "Frappe de café, leche cremada y abundante galleta Oreo triturada, coronado con chantilly y lluvia de galleta.",
    price: 16000,
    formattedPrice: "$16.000",
    image: "/images/frappe-oreo.jpeg",
    alt: "Frappe Oreo Tradicional Coffee",
    badge: "MÁS PEDIDO",
    accentColor: "#E2C38F"
  },
  {
    id: "frappe-mochaccino",
    number: "02",
    name: "Frappe Mochaccino",
    tagline: "Café de origen & chocolate",
    category: "FRAPPE · ESPECIAL",
    description: "Mezcla perfecta de espresso doble recién extraído, salsa de chocolate artesanal y leche batida con hielo.",
    price: 16000,
    formattedPrice: "$16.000",
    image: "/images/frappe-moca.jpeg",
    alt: "Frappe Mochaccino Tradicional Coffee",
    accentColor: "#D6A354"
  },
  {
    id: "frappe-milo",
    number: "03",
    name: "Frappe de Milo",
    tagline: "El sabor de siempre, ultra frío",
    category: "FRAPPE · CLÁSICO",
    description: "Granizado cremoso con generoso concentrado de Milo, leche espumada y una capa crocante en la cima.",
    price: 14000,
    formattedPrice: "$14.000",
    image: "/images/frappe-milo.jpeg",
    alt: "Frappe de Milo",
    accentColor: "#9C6239"
  },
  {
    id: "frappe-cafe",
    number: "04",
    name: "Frappe de Café",
    tagline: "Intensidad pura y frescura",
    category: "FRAPPE · ORIGEN",
    description: "Nuestra selección de café especial de Roldanillo batido al punto de nieve con leche fría y un toque dulce sutil.",
    price: 14000,
    formattedPrice: "$14.000",
    image: "/images/frappe-cafe.jpeg",
    alt: "Frappe de Café Clásico",
    accentColor: "#C49C64"
  },
  {
    id: "frappe-nutella",
    number: "05",
    name: "Frappe de Nutella",
    tagline: "Pura avellana y chocolate",
    category: "FRAPPE · GOURMET",
    description: "Auténtica Nutella mezclada con café suave, leche fresca y textura densa para los amantes del cacao.",
    price: 16000,
    formattedPrice: "$16.000",
    image: "/images/frappe-nutella.jpeg",
    alt: "Frappe de Nutella",
    badge: "FAVORITO",
    accentColor: "#704128"
  },
  {
    id: "frappe-coco-limon",
    number: "06",
    name: "Frappe Coco Limón",
    tagline: "Cítrico, tropical y adictivo",
    category: "FRAPPE · FRUTAL",
    description: "Crema de coco natural combinada con extracto fresco de limón Tahití para un golpe refrescante inigualable.",
    price: 14000,
    formattedPrice: "$14.000",
    image: "/images/frappe-coco-limon.jpeg",
    alt: "Frappe Coco Limón",
    accentColor: "#E2D3BB"
  },
  {
    id: "frappe-te-chai",
    number: "07",
    name: "Frappe Té Chai",
    tagline: "Especias aromáticas y frío",
    category: "FRAPPE · ESPECIAL",
    description: "Infusión de canela, cardamomo, clavo y jengibre en leche fría batida con hielo frappé.",
    price: 15000,
    formattedPrice: "$15.000",
    image: "/images/frappe-techai.jpeg",
    alt: "Frappe Té Chai",
    accentColor: "#C58B43"
  },
  {
    id: "frappe-maracuya",
    number: "08",
    name: "Frappe Maracuyá",
    tagline: "La fruta de la pasión helada",
    category: "FRAPPE · FRUTAL",
    description: "Pulpa 100% natural de maracuyá colombiano con base cremosa helada y equilibrio perfecto ácido-dulce.",
    price: 15000,
    formattedPrice: "$15.000",
    image: "/images/cerezada.png",
    alt: "Frappe de Maracuyá",
    accentColor: "#F4C430"
  },
  {
    id: "frappe-arequipe",
    number: "09",
    name: "Frappe de Arequipe",
    tagline: "Tradición dulce colombiana",
    category: "FRAPPE · CLÁSICO",
    description: "Arequipe artesanal del Valle con café espresso suave, coronado con espiral de caramelo.",
    price: 15000,
    formattedPrice: "$15.000",
    image: "/images/frappe-moca.jpeg",
    alt: "Frappe de Arequipe",
    accentColor: "#D19447"
  },
  {
    id: "frappe-caramelo-salado",
    number: "10",
    name: "Frappe Caramelo Salado",
    tagline: "Contraste dulce y salado",
    category: "FRAPPE · GOURMET",
    description: "Sirope de toffee tostado con escamas de sal marina, espresso y crema suave.",
    price: 16000,
    formattedPrice: "$16.000",
    image: "/images/frappe-cafe.jpeg",
    alt: "Frappe Caramelo Salado",
    accentColor: "#BD7B35"
  },
  {
    id: "frappe-frutos-rojos",
    number: "11",
    name: "Frappe Frutos Rojos",
    tagline: "Explosión silvestre helada",
    category: "FRAPPE · FRUTAL",
    description: "Mora silvestre, fresas y arándanos reducidos en compota artesanal con textura granizada cremosa.",
    price: 15000,
    formattedPrice: "$15.000",
    image: "/images/cerezada.png",
    alt: "Frappe Frutos Rojos",
    accentColor: "#A93A4D"
  },
  {
    id: "frappe-vainilla",
    number: "12",
    name: "Frappe Vainilla Francesa",
    tagline: "Aroma suave y reconfortante",
    category: "FRAPPE · CLÁSICO",
    description: "Vainilla bourbon macerada con leche espumada fría y base de café arábica suave.",
    price: 14000,
    formattedPrice: "$14.000",
    image: "/images/latte-frio.jpeg",
    alt: "Frappe Vainilla Francesa",
    accentColor: "#DFD1B0"
  },
  {
    id: "frappe-chocolate-blanco",
    number: "13",
    name: "Frappe Chocolate Blanco",
    tagline: "Cremosidad aterciopelada",
    category: "FRAPPE · GOURMET",
    description: "Manteca de cacao refinada y leche condensada con toque de espresso frío y virutas de chocolate.",
    price: 16000,
    formattedPrice: "$16.000",
    image: "/images/hielato.jpeg",
    alt: "Frappe Chocolate Blanco",
    accentColor: "#F5ECD8"
  },
  {
    id: "frappe-baileys",
    number: "14",
    name: "Frappe Especial Baileys",
    tagline: "Crema irlandesa & espresso",
    category: "FRAPPE · ADULTOS",
    description: "Nuestra creación premium con licor de crema irlandesa Baileys, doble shot de café y chantilly.",
    price: 18000,
    formattedPrice: "$18.000",
    image: "/images/frappehero.webp",
    alt: "Frappe Especial Baileys Tradicional Coffee",
    badge: "PREMIUM",
    accentColor: "#BE9E69"
  }
];
