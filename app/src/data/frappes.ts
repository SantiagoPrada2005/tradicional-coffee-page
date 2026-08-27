import type { Product } from '../types/product';

export type { Product };

export function parseProductPrice(priceStr: string): number {
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
}

export const orderProducts: Product[] = [
  // FRAPPES
  {
    id: 29,
    name: "Frappe de Café",
    description: "Clásico sabor a café helado.",
    price: "$12.000",
    image: "/images/frappe-cafe.webp",
    alt: "Frappe Café",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 30,
    name: "Frappe de Nutella",
    description: "Para los amantes del chocolate y avellana.",
    price: "$12.000",
    image: "/images/frappe-nutella.webp",
    alt: "Frappe Nutella",
    category: 'frappe',
    tag: { label: "FRAPPÉ · FAVORITO" }
  },
  {
    id: 28,
    name: "Frappe de Milo",
    description: "Lo mejor del Milo, cremosidad y sabor unico.",
    price: "$12.000",
    image: "/images/frappe-milo.webp",
    alt: "Frappe Milo",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 31,
    name: "Frappe de Mocca",
    description: "Mezcla de café y chocolate.",
    price: "$12.000",
    image: "/images/frappe-moca.webp",
    alt: "Frappe Mocca",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 32,
    name: "Frappe de Coco Limón",
    description: "Refrescante y tropical.",
    price: "$12.000",
    image: "/images/frappe-coco-limon.webp",
    alt: "Frappe Coco Limón",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 40,
    name: "Frappe de Oreo",
    description: "Delicioso frappé con galletas Oreo y crema chantilly.",
    price: "$12.000",
    image: "/images/frappe-oreo.webp",
    alt: "Frappe de Oreo",
    category: 'frappe',
    tag: { label: "FRAPPÉ · POPULAR" }
  },
  {
    id: 33,
    name: "Frappe Té Chai",
    description: "Preparacion americana unica con canela y especies aromáticas.",
    price: "$15.000",
    image: "/images/frappe-te-chai.webp",
    alt: "Frappe Té Chai",
    category: 'frappe',
    tag: { label: "FRAPPÉ ESPECIAL" }
  },
  {
    id: 41,
    name: "Frappuccino",
    description: "El sabor del frappé de café, con crema de whisky logrando un sabor unico.",
    price: "$15.000",
    image: "/images/frappucchino.webp",
    alt: "Frappuccino",
    category: 'frappe',
    tag: { label: "ESPECIALIDAD" }
  },

  // CAFÉS FRÍOS
  {
    id: 14,
    name: "Americano frío",
    description: "Expresso doble, agua y hielo.",
    price: "$5.000",
    image: "/images/americano-frio.webp",
    alt: "Americano frío",
    category: 'cold',
    tag: { label: "CAFÉ FRÍO" }
  },
  {
    id: 15,
    name: "Latte frío",
    description: "Expresso sencillo, leche y hielo.",
    price: "$8.000",
    image: "/images/latte-frio.webp",
    alt: "Latte frío",
    category: 'latte',
    tag: { label: "LATTE FRÍO" }
  },
  {
    id: 16,
    name: "Hielato",
    description: "Leche condensada, espresso y leche espumada.",
    price: "$8.000",
    image: "/images/hielato.webp",
    alt: "Hielato",
    category: 'cold',
    tag: { label: "ESPECIALIDAD" }
  },



  // BEBIDAS FRÍAS
  {
    id: 25,
    name: "Milo frío",
    description: "Bebida achocolatada fría.",
    price: "$8.000",
    image: "/images/milo-frio.webp",
    alt: "Milo frío",
    category: 'cold',
    tag: { label: "BEBIDA FRÍA" }
  },

  // LIMONADAS Y BEBIDAS
  {
    id: 34,
    name: "Limonada de Coco",
    description: "Cremosa y refrescante.",
    price: "$9.000",
    image: "/images/frappe-coco-limon.webp",
    alt: "Limonada Coco",
    category: 'cold',
    tag: { label: "LIMONADA" }
  },
  {
    id: 35,
    name: "Limonada Cerezada",
    description: "Refrescante sabor a cereza.",
    price: "$10.000",
    image: "/images/limonada-cereza.webp",
    alt: "Limonada Cerezada",
    category: 'cold',
    tag: { label: "LIMONADA" }
  }
];

export const FRAPPES_CATALOG = orderProducts;
