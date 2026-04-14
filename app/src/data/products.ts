import type { Product, AccordionItemData } from '../types';


//menu completo
export const exploreProducts: Product[] = [
    // CAFÉ CALIENTE 
    { id: 4, name: "Espresso", description: "Café concentrado e intenso.", price: "$5.000", image: "", alt: "Espresso", category: 'hot' },
    { id: 5, name: "Café Irlandés", description: "Doble espresso y whisky.", price: "$10.000", image: "", alt: "Café Irlandés", category: 'hot' },
    { id: 6, name: "Café Moka", description: "Espresso, chocolate, leche cremada y canela.", price: "$9.000", image: "", alt: "Café Moka", category: 'hot' },
    { id: 7, name: "Americano", description: "Espresso sencillo con agua.", price: "$3.500", image: "", alt: "Café Americano", category: 'hot' },
    { id: 8, name: "Latte", description: "Espresso y leche cremada.", price: "$5.000", image: "", alt: "Café Latte", category: 'latte' },
    { id: 9, name: "Latte pequeño", description: "Versión reducida de nuestro Latte clásico.", price: "$4.000", image: "/images/latte-pequeño.jpeg", alt: "Latte pequeño", category: 'latte' },
    { id: 10, name: "Cappuccino Tradicional", description: "1 espresso sencillo y leche cremada.", price: "$5.000", image: "/images/cappuccino.jpeg", alt: "Cappuccino", category: 'hot' },
    { id: 11, name: "Cappuccino Especial", description: "1 espresso doble y leche cremada, con chantilly.", price: "$7.000", image: "/images/cappuccino-especial.jpeg", alt: "Cappuccino Especial", category: 'hot' },
    { id: 12, name: "Cappuccino con licor", description: "Expresso, leche cremada y el licor de su preferencia.", price: "$9.000", image: "/images/cappuccino.jpeg", alt: "Cappuccino con licor", category: 'hot' },
    { id: 13, name: "Cappuccino con marshmallow", description: "Expresso, leche cremada, crema chantilly y marshmallow.", price: "$9.000", image: "/images/marshmallow.webp", alt: "Cappuccino con marshmallow", category: 'hot' },

    // CAFÉS FRÍOS [cite: 70, 71]
    { id: 14, name: "Americano frío", description: "Expresso doble, agua y hielo.", price: "$5.000", image: "/images/americano-frio.jpeg", alt: "Americano frío", category: 'cold' },
    { id: 15, name: "Latte frío", description: "Expresso sencillo, leche y hielo.", price: "$8.000", image: "/images/latte-frio.jpeg", alt: "Latte frío", category: 'latte' },
    { id: 16, name: "Hielato", description: "Leche condensada, espresso y leche espumada.", price: "$8.000", image: "/images/hielato.jpeg", alt: "Hielato", category: 'cold' },

    // AGUAPANELA, JUGOS Y CHOCOLATE [cite: 73, 75, 89]
    { id: 17, name: "Aguapanela", description: "Tradicional y refrescante.", price: "$2.000", image: "", alt: "Aguapanela", category: 'hot' },
    { id: 18, name: "Aguapanela con leche", description: "Aguapanela cremosa.", price: "$3.500", image: "", alt: "Aguapanela con leche", category: 'hot' },
    { id: 19, name: "Jugo natural en agua", description: "Fruta natural del día.", price: "$6.000", image: "", alt: "Jugo en agua", category: 'cold' },
    { id: 20, name: "Jugo natural en leche", description: "Fruta natural con leche.", price: "$7.000", image: "", alt: "Jugo en leche", category: 'cold' },
    { id: 21, name: "Chocolate en agua", description: "Chocolate tradicional.", price: "$3.000", image: "", alt: "Chocolate en agua", category: 'hot' },
    { id: 22, name: "Chocolate en leche", description: "Chocolate cremoso.", price: "$4.000", image: "/images/chocolate.jpeg", alt: "Chocolate en leche", category: 'hot' },
    { id: 23, name: "Chocolate marsmello", description: "Chocolate caliente con malvaviscos.", price: "$6.000", image: "/images/chocolatemars.jpeg", alt: "Chocolate con marshmallow", category: 'hot' },

    // COLADAS Y MILO [cite: 85, 92]
    { id: 24, name: "Colada (Cereza, Vainilla, Milo o Café)", description: "Elige tu sabor favorito.", price: "$6.000", image: "/images/colada.jpeg", alt: "Colada", category: 'hot' },
    { id: 25, name: "Milo frío", description: "Bebida achocolatada fría.", price: "$8.000", image: "", alt: "Milo frío", category: 'cold' },
    { id: 26, name: "Milo caliente", description: "Milo reconfortante.", price: "$5.000", image: "", alt: "Milo caliente", category: 'hot' },
    { id: 27, name: "Milo marsmellos", description: "Milo con malvaviscos.", price: "$7.000", image: "", alt: "Milo con marshmallow", category: 'hot' },

    // FRAPPES [cite: 100]
    { id: 28, name: "Frappe de Milo", description: "Granizado de milo.", price: "$10.000", image: "/images/frappe-milo.jpeg", alt: "Frappe Milo", category: 'frappe' },
    { id: 29, name: "Frappe de Café", description: "Clásico sabor a café helado.", price: "$10.000", image: "/images/frappe-cafe.jpeg", alt: "Frappe Café", category: 'frappe' },
    { id: 30, name: "Frappe de Nutella", description: "Para los amantes del chocolate y avellana.", price: "$10.000", image: "/images/frappe-nutella.jpeg", alt: "Frappe Nutella", category: 'frappe' },
    { id: 31, name: "Frappe de Mocca", description: "Mezcla de café y chocolate.", price: "$10.000", image: "/images/frappe-moca.jpeg", alt: "Frappe Mocca", category: 'frappe' },
    { id: 32, name: "Frappe de Coco Limón", description: "Refrescante y tropical.", price: "$10.000", image: "/images/frappe-coco-limon.jpeg", alt: "Frappe Coco Limón", category: 'frappe' },
    { id: 33, name: "Frappe Té Chai", description: "Especias y frescura.", price: "$12.000", image: "/images/frappe-te-chai.jpeg", alt: "Frappe Té Chai", category: 'frappe' },

    // LIMONADAS Y BEBIDAS [cite: 102, 104]
    { id: 34, name: "Limonada de Coco", description: "Cremosa y refrescante.", price: "$9.000", image: "", alt: "Limonada Coco", category: 'cold' },
    { id: 35, name: "Limonada de Mango Biche", description: "Con el toque ácido del mango.", price: "$10.000", image: "", alt: "Limonada Mango Biche", category: 'cold' },
    { id: 36, name: "Limonada Cerezada", description: "Refrescante sabor a cereza.", price: "$6.500", image: "/images/cerezada.png", alt: "Limonada Cerezada", category: 'cold' },
    { id: 37, name: "Tamarindo / Michelada", description: "Jugo de tamarindo solo o michelado.", price: "$4.000 - $6.000", image: "", alt: "Tamarindo", category: 'cold' },
    { id: 38, name: "Cervezas (Corona, Club, Águila, Poker)", description: "Variedad de cervezas nacionales e internacionales.", price: "$4.000 - $7.000", image: "", alt: "Cerveza", category: 'cold' },

    // DELICIAS [cite: 90]
    { id: 39, name: "Torta", description: "Porción de torta del día.", price: "$4.000", image: "/images/torta.jpeg", alt: "Torta", category: 'dessert' },
    { id: 40, name: "Cuaresmeros", description: "Tradición local.", price: "$1.200", image: "", alt: "Cuaresmeros", category: 'dessert' }
];


//los mas pedidos 
export const accordionItems: AccordionItemData[] = [
    {
        id: 1,
        title: 'Frappé',
        imageUrl: "/images/frappe-oreo.jpeg",
    },
    {
        id: 2,
        title: 'Café',
        imageUrl: "/images/capuccino.jpeg",
    },
    {
        id: 3,
        title: 'Latte',
        imageUrl: "/images/latte-frio.jpeg",
    },
    {
        id: 4,
        title: 'Bebidas Calientes',
        imageUrl: "/images/chocolatemars.jpeg",
    },
    {
        id: 5,
        title: 'Bebidas Frías',
        imageUrl: "/images/cerezada.png",
    },
];