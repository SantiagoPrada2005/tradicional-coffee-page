import type { Product } from '../types/product';

export type { Product };

export function parseProductPrice(priceStr: string): number {
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
}

export const orderProducts: Product[] = [
  // CAFÉS FRÍOS
  {
    id: 14,
    name: "Americano frío",
    description: "Expresso doble, agua y hielo.",
    price: "$5.000",
    image: "/images/americano-frio.jpeg",
    alt: "Americano frío",
    category: 'cold',
    tag: { label: "CAFÉ FRÍO" }
  },
  {
    id: 15,
    name: "Latte frío",
    description: "Expresso sencillo, leche y hielo.",
    price: "$8.000",
    image: "/images/latte-frio.jpeg",
    alt: "Latte frío",
    category: 'latte',
    tag: { label: "LATTE FRÍO" }
  },
  {
    id: 16,
    name: "Hielato",
    description: "Leche condensada, espresso y leche espumada.",
    price: "$8.000",
    image: "/images/hielato.jpeg",
    alt: "Hielato",
    category: 'cold',
    tag: { label: "ESPECIALIDAD" }
  },

  // FRAPPES
  {
    id: 28,
    name: "Frappe de Milo",
    description: "Granizado de milo.",
    price: "$10.000",
    image: "/images/frappe-milo.jpeg",
    alt: "Frappe Milo",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 29,
    name: "Frappe de Café",
    description: "Clásico sabor a café helado.",
    price: "$10.000",
    image: "/images/frappe-cafe.jpeg",
    alt: "Frappe Café",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 30,
    name: "Frappe de Nutella",
    description: "Para los amantes del chocolate y avellana.",
    price: "$10.000",
    image: "/images/frappe-nutella.jpeg",
    alt: "Frappe Nutella",
    category: 'frappe',
    tag: { label: "FRAPPÉ · FAVORITO" }
  },
  {
    id: 31,
    name: "Frappe de Mocca",
    description: "Mezcla de café y chocolate.",
    price: "$10.000",
    image: "/images/frappe-moca.jpeg",
    alt: "Frappe Mocca",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 32,
    name: "Frappe de Coco Limón",
    description: "Refrescante y tropical.",
    price: "$10.000",
    image: "/images/frappe-coco-limon.jpeg",
    alt: "Frappe Coco Limón",
    category: 'frappe',
    tag: { label: "FRAPPÉ" }
  },
  {
    id: 33,
    name: "Frappe Té Chai",
    description: "Especias y frescura.",
    price: "$12.000",
    image: "/images/frappe-te-chai.jpeg",
    alt: "Frappe Té Chai",
    category: 'frappe',
    tag: { label: "FRAPPÉ ESPECIAL" }
  },

  // BEBIDAS FRÍAS
  {
    id: 25,
    name: "Milo frío",
    description: "Bebida achocolatada fría.",
    price: "$8.000",
    image: "/images/colada.jpeg",
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
    image: "/images/frappe-coco-limon.jpeg",
    alt: "Limonada Coco",
    category: 'cold',
    tag: { label: "LIMONADA" }
  },
  {
    id: 35,
    name: "Limonada Cerezada",
    description: "Refrescante sabor a cereza.",
    price: "$6.500",
    image: "/images/cerezada.png",
    alt: "Limonada Cerezada",
    category: 'cold',
    tag: { label: "LIMONADA" }
  }
];

export const FRAPPES_CATALOG = orderProducts;
