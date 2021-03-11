export interface ProductResponse {
    data: Product[];
    success: boolean;
}
export class Product {
    constructor() {}
    id: number;
    // tslint:disable-next-line: variable-name
    category_id: number;
    name: string;
    price: number;
    stock: number;
    expiration: Date;
    description: string;
    featured: string;
    unit: string;
    recommend: number;
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
    benefits?: string;
    visibility?: boolean;
    pivot?: Pivot;
    status?: Pivot;
    highlighted: boolean = false;
}

export interface Pivot {
    order_id: number;
    product_id: number;
    quantity: number;
    unit: string;
    final_price: number;
    created_at: string;
    updated_at: string;
}
