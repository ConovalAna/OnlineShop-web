import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

import LoginPage from '../components/authentication/LoginPage';
import RegisterPage from '../components/authentication/RegisterPage';
import { NotFound } from '../components/NotFound';
import Store from '../components/store';
import Admin from '../components/admin';
import AdminProducts from '../components/admin/products';
import AddProduct from '../components/admin/product/add-product';

const Routing = () => (
    <Router>
        <Routes>
            <Route path="/" element={<AuthenticatedRoute />}>
                <Route path="/" element={<Admin />} />
                <Route path="/" element={<Admin />}>
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AddProduct />} />
                </Route>
            </Route>
            <Route path="/" element={<UnauthenticatedRoute />}>
                <Route path="/" element={<Store />} />
            </Route>
            <Route path="/login" element={<UnauthenticatedRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/register" element={<UnauthenticatedRoute />}>
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<LoginPage />} />
        </Routes>
    </Router>
);

export default Routing;
