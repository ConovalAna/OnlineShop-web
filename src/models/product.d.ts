


export type ProductModel = {
    name?: string;
    category?: string;
    descriptions?: string;
    metaKeywords?: string;
    price?: number;
    discountAmount?: number;
    discountPercent?: number;
    vatAmount?: number;
    barcode?: string;
    provider?: string;
    deliveryMethod?: string[];
    stock?: StockModel[];
    imagesUrl?: string[];
}

export type StockModel = {
    id: number;
    quantity: number;
    size: Size;
    color: string;
}

export enum Size {
    XXXS = 1,
    XXS,
    XS,
    S,
    M,
    L,
    XL,
    XXL,
    XXXL,
    XXXXL,
    XXXXXL,
    XXXXXXL,
    XXXXXXXL
}

export enum DeliveryMethod { EasyBox, GLS }