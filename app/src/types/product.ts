export type ProductCategory = 'nitro' | 'latte' | 'frappe' | 'cold' | 'hot' | 'dessert' | 'all';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    alt: string;
    category: ProductCategory;
    tag?: {
        label: string;
        icon?: string;
    };
}

export interface AccordionItemData {
    id: number;
    title: string;
    imageUrl: string;
}
