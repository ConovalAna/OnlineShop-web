import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import OrderActions from './order-actions';
import {
    useProductCategoriesQuery,
    useAllOrdersQuery,
} from '../../../api/use-store-api';
export default function OrderListResults() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const ordersQuery = useAllOrdersQuery();
    const productCategories = useProductCategoriesQuery();

    const handleLimitChange = (event: any) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>User email</TableCell>
                                <TableCell>User account id</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Number of products</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordersQuery.data
                                ?.slice(page * limit, page * limit + limit)
                                .map((order) => (
                                    <TableRow hover key={order.orderId}>
                                        <TableCell>
                                            {order.orderId}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {order.email}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{order.userAccountId}</TableCell>
                                        <TableCell>{order?.created}</TableCell>

                                        <TableCell>{order?.productOrders?.length}</TableCell>
                                        <TableCell>
                                            {/* <OrderActions
                                                productId={product.productId}
                                            /> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={ordersQuery.data?.length ?? 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
