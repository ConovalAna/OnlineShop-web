import { threadId } from "worker_threads";
import APIClient from "./api";
import { ICategory, IDeliveryMethod, IProduct } from "./store-api";


export function fetchProductCategories(): Promise<ICategory[]> {
    return StoreApi.Instance.fetchCategories();
}

export function fetchProductDeliveryMethods(): Promise<IDeliveryMethod[]> {
    return StoreApi.Instance.fetchDeliveryMethods();
}

export function addProductAsync(product: IProduct): Promise<any> {
    return StoreApi.Instance.addProduct(product);
}

export function editProductAsync(product: IProduct): Promise<any> {
    return StoreApi.Instance.UpdateProduct(product);
}

export function fetchProductsAsync(): Promise<IProduct[]> {
    return StoreApi.Instance.fetchProducts();
}

export function deleteProductsAsync(productId: number): Promise<any> {
    return StoreApi.Instance.DeleteProduct(productId);
}

export function fetchProductAsync(productId: number): Promise<IProduct> {
    return StoreApi.Instance.fetchProduct(productId);
}

export function addToFavoriteAsync(productId: number, userId: number): Promise<IProduct> {
    return StoreApi.Instance.AddToFavorite(productId, userId);
}


class StoreApi extends APIClient {
    private static _instance: StoreApi;
    private constructor() {
        super("https://localhost:7278/api/");
    }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    async fetchCategories(): Promise<ICategory[]> {
        const categories = await this.doGET("categories", {});
        return categories as ICategory[];
    }

    async fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
        const deliveryMethods = await this.doGET("DeliveryType", {});
        return deliveryMethods as IDeliveryMethod[];
    }


    async fetchProducts(): Promise<IProduct[]> {
        const products = await this.doGET("products", {});
        return products as IProduct[];
    }

    async fetchProduct(productId: number): Promise<IProduct> {
        const product = await this.doGET(`products/${productId}`, {});
        return product as IProduct;
    }

    async addProduct(product: IProduct): Promise<any> {
        const response = await this.doPOST("products", product);
        return response;
    }

    async UpdateProduct(product: IProduct): Promise<any> {
        const response = await this.doPUT("products", product);
        return response;
    }

    async DeleteProduct(productId: number): Promise<any> {
        const response = await this.doDELETE(`products/${productId}`, {});
        return response;
    }

    async AddToFavorite(productId: number, userId: number): Promise<any> {
        const response = await this.doPOST(`products/favorite/${productId}?userId=${userId}`, {});
        return response;
    }

}