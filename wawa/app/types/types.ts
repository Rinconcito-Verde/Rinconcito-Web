export interface product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    short_description: string | null;
    price: number;
    discount: number;
    sales_tax: number;
    currency: string;
    sort_order: number;
    image: string;
    type: string;
    expiration_date: string | null;
    created_at: string | null;
    updated_at: string;
    category_id: number;
}

export interface cartProduct extends product {
    quantity: number;
    totalPrice: number;
}