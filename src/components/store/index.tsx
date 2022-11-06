import React from 'react';
import Header from '../header';
import Banner from '../banner';
import Promotions from '../promotions';
import Products from '../products';
import { Stack, Container, Typography, Box } from '@mui/material';

export default function Store() {
    return (
        <>
            <Container
                disableGutters
                maxWidth="xl"
                sx={{
                    background: '#fff',
                }}
            >
                <Stack>
                    <Header />
                    <Banner />
                    <Promotions />
                    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
                        <Typography variant="h4">Our Products</Typography>
                    </Box>
                    <Products />
                </Stack>
            </Container>
        </>
    );
}
