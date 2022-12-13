import { Box, Container } from '@mui/material';
import React from 'react';
import OrderListResults from './order-list-results';
import OrderListToolbar from './order-list-toolbar';
export default function Orders() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <OrderListToolbar />
                <Box sx={{ mt: 3 }}>
                    <OrderListResults />
                </Box>
            </Container>
        </Box>
    );
}
