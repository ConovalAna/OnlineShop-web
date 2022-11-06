import APIClient from "./api";
import { ICategory, IDeliveryMethod, IProduct } from "./store-api";

export function fetchProductCategories(): Promise<ICategory[]> {
    return StoreApi.Instance.fetchCategories();
}

export function fetchProductDeliveryMethods(): Promise<IDeliveryMethod[]> {
    return StoreApi.Instance.fetchDeliveryMethods();
}

export function addProduct(product: IProduct): Promise<any> {
    return StoreApi.Instance.addProduct(product);
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
        const categories = await this.doGET("products", {});
        return categories as IProduct[];
    }

    async addProduct(product: IProduct): Promise<any> {
        const response = await this.doPOST("products", product);
        return response;
    }

    async UpdateProduct(product: IProduct): Promise<any> {
        const response = await this.doPUT("products", product);
        return response;
    }


}