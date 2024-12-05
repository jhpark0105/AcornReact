import axios from "axios";
import React from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import ProductBList from './productB/ProductBList';
import PRODUCT_B from './PRODUCT_B';
import PRODUCT from './PRODUCTS';

const Product = () => {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<PRODUCT_B />} /> */}
                <Route path="/productB" element={<ProductBList />} />
                <Route path="/product" element={<PRODUCT />} />
            </Routes>
        </>
    );
}

export default Product;