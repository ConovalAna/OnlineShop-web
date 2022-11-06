import { Box, Container, Typography } from '@mui/material';
import { ProductModel } from '../../../models/product';
import React from 'react';
import ProductFields from './product-fields';
import { IProduct, IStock } from '../../../api/store-api';
import {
    fetchProductCategories,
    fetchProductDeliveryMethods,
} from '../../../api/StoreApi';
import { useQuery } from 'react-query';
export default function AddProduct(props: any) {
    const productCategories = useQuery({
        queryKey: ['productCategories'],
        queryFn: fetchProductCategories,
    });

    const productDeliveryMethods = useQuery({
        queryKey: ['productDeliveryMethods'],
        queryFn: fetchProductDeliveryMethods,
    });
    const onSubmit = (product: ProductModel) => {
        const productToSubmit: IProduct = {
            productId: 0,
            name: product.name ?? '',
            descriptions: product.descriptions ?? '',
            metaKeywords: product.metaKeywords ?? '',
            price: product.price ?? 0,
            discountAmount: product.discountAmount ?? 0,
            vatAmount: product.vatAmount ?? 0,
            barcode: product.barcode ?? '',
            categoryId:
                productCategories.data?.find(
                    (pc) => pc.name == product.category
                )?.categoryId ?? 0,
            deliveryTypeId:
                productDeliveryMethods.data?.find(
                    (pd) =>
                        pd.deliveryName === product.deliveryMethod?.[0] ?? ''
                )?.deliveryTypeId ?? 0,
            stock:
                product.stock?.map((stock) => {
                    var s: IStock = {
                        stockId: stock.id,
                        quantity: stock.quantity,
                        size: stock.size,
                        color: stock.color,
                    };
                    return s;
                }) ?? [],
        };

        console.log(productToSubmit);
    };
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <Box {...props}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1,
                        }}
                    >
                        <Typography sx={{ m: 1 }} variant="h4">
                            Add new product
                        </Typography>
                    </Box>
                    <ProductFields onSubmitCallback={onSubmit} />
                </Box>
            </Container>
        </Box>
    );
}
