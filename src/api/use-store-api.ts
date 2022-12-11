import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProductsAsync,getFavoriteAsync, fetchCartAsync, fetchOrdersAsync, fetchProductAsync, fetchProductCategories, fetchProductsAsync } from "./StoreApi";

export const useProductsQuery = () =>
    useQuery(['products'], fetchProductsAsync, { staleTime: 20000 })

export const useCartItemsQuery = () =>
    useQuery(['cartItems'], fetchCartAsync, { staleTime: Infinity })

export const useFavoriteQuery = (user:any) =>
    useQuery(['favorite'], getFavoriteAsync, { staleTime: Infinity, enabled: !!user })

export const useOrdersQuery = () =>
    useQuery(['orders'], fetchOrdersAsync, { staleTime: 10000 })

export const useProductCategoriesQuery = () =>
    useQuery(
        ['productCategories'],
        fetchProductCategories,
        { staleTime: Infinity }
    );

export const useProductDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteProductsAsync, {
        onSuccess: () => {
            const message = 'success';
            alert(message);
        },
        onError: () => {
            alert('there was an error');
        },
        onSettled: () => {
            queryClient.invalidateQueries('products');
        },
    })
};

export const useFetchProductQuery = (productId: number) => {
    return useQuery(['product', productId], () => fetchProductAsync(productId), { staleTime: Infinity })
}

