import { useState } from 'react';
import { Route, Routes } from "react-router";

import { Box, Tabs } from "@mui/material";

import Test1 from "./service/Test1";
import Test2 from "./service/Test2";

import LinkTab from './libs/LinkTab';


const AdminOrders = () => {
  const [value, setValue] = useState(0);

  /**
   * 링크 클릭 시 클릭한 요소의 value를 상태변수에 저장
   * @param {*} event 
   * @param {*} newValue 
   * @method samePageLinkNavigation(event) 
   */
  const handleChange = (event, newValue) => {
      setValue(newValue);
    }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
      >
        <LinkTab label="전체 보기" href="/admin/orders/service" />
        <LinkTab label="지점 매출" href="/admin/orders/service/branch" />
      </Tabs>

      <Routes>
        <Route path="service" element={<Test1/>}></Route>
        <Route path="service/branch" element={<Test2/>}></Route>
      </Routes>
    </Box>
  )
}

export default AdminOrders;


