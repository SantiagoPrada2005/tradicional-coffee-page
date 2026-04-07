export interface AccordionItemData {
    id: number;
    title: string;
    imageUrl: string;
}

export const accordionItems: AccordionItemData[] = [
    {
        id: 1,
        title: 'Frappé',
        imageUrl: '/images/frappe-oreo.jpeg',
    },
    {
        id: 2,
        title: 'Café',
        imageUrl: '/images/frappe-cafe.jpeg',
    },
    {
        id: 3,
        title: 'Latte',
        imageUrl: '/images/frappe-te-chai.jpeg',
    },
    {
        id: 4,
        title: 'Bebidas Calientes',
        imageUrl: '/images/marshmallow.jpeg',
    },
    {
        id: 5,
        title: 'Bebidas Frías',
        imageUrl: '/images/limonada-cereza.jpeg',
    },
];