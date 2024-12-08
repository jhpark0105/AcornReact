import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderList from "./OrderList"; // 서비스 목록을 표시하는 컴포넌트

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 발주 목록 조회
  const fetchOrders = () => {
    axios.get(`http://localhost:8080/order/B004`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        toast.error("서비스 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error fetching services:", error);
      });
  };

  return (
    <div className="App">
      <ToastContainer />

      <OrderList 
        orders={orders} // 서비스 목록 데이터를 전달
      />

    </div>
  );
};

export default Order;
