import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProductBList from './productB/ProductBList';
import PRODUCT_B from './PRODUCT_B';
import PRODUCT from './PRODUCT';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<PRODUCT_B />}></Route>
          <Route path="/productB" element={<ProductBList />}></Route>
          <Route path="/product" element={<PRODUCT />}></Route>
      </Routes>
    </>
  );
}

export default App;