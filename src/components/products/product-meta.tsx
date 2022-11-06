import { Typography } from '@mui/material';
import React from 'react';
import { ProductMetaWrapper } from '../../style/product';
export default function ProductMeta({
    product,
    matches,
}: {
    product: any;
    matches: boolean;
}) {
    return (
        <ProductMetaWrapper>
            <Typography variant={matches ? 'h6' : 'h5'} lineHeight={2}>
                {product.name}
            </Typography>
            <Typography variant={matches ? 'caption' : 'body1'}>
                ${product.price}
            </Typography>
        </ProductMetaWrapper>
    );
}
