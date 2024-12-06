import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProductBList from './productB/ProductBList';
import PRODUCT_B from './PRODUCT_B';
import PRODUCT_S from './PRODUCT_S';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<PRODUCT_B />}></Route>
          <Route path="/productB" element={<ProductBList />}></Route>
          <Route path="/productS" element={<PRODUCT_S />}></Route>
      </Routes>
    </>
  );
}
export default App;