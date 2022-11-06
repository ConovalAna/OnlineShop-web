import { Box, Container } from '@mui/material';
import React from 'react';
import ProductListResults from './product-list-results';
import ProductListToolbar from './product-list-toolbar';
import { products } from './products.mock';
export default function Products() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <ProductListToolbar />
                <Box sx={{ mt: 3 }}>
                    <ProductListResults products={products} />
                </Box>
            </Container>
        </Box>
    );
}
