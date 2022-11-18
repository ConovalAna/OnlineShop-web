export interface ICategory {
    categoryId: number,
    name: string,
    parentCategoryId: number,
}

export interface IImageUrl {
    productImageId: number,
    url: string
}

export interface IStock {
    stockId: number,
    quantity: number,
    size: number,
    color: string
}

export interface IDeliveryMethod {
    deliveryTypeId: number,
    deliveryName: string
}

export interface IProduct {
    productId: number,
    name: string,
    descriptions: string,
    metaKeywords: string,
    price: number,
    discountAmount: number,
    vatAmount: number,
    barcode: string,
    categoryId: number,
    isDeleted?: boolean,
    created?: string,
    updated?: string,
    imagesUrl?: string[],
    stocks?: IStock[],
    category?: ICategory,
    deliveryTypes?: IDeliveryMethod[]
}