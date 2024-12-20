import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Pagination from "./paging/Pagination";
import ListSearch from "./Search/ListSearch";
import DateSearch from "./Search/DateSearch";
import styles from "./ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri";
import CustomerInsForm from "./CustomerInsForm"; // 고객 등록 컴포넌트
import CustomerDetail from "./CustomerDetail"; // 고객 상세 정보 및 수정 컴포넌트
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 적용

function CustomerList({ handleDetail }) {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedFilter, setSelectedFilter] = useState("customerName");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const refresh = () => {
    axios
      .get("http://localhost:8080/customer")
      .then((res) => {
        console.log("고객 데이터:", res.data); // 디버깅용
        setCustomers(res.data);
        setFilteredData(res.data);
      })
      .catch((error) => {
        console.error("고객 데이터를 가져오는데 실패했습니다.", error);
      });
  };
  

  useEffect(() => {
    refresh();
  }, []);

  const handleSearchClick = () => {
    const filtered = customers.filter((item) =>
      item[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
      return;
    }

    const formattedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
    const formattedEndDate = new Date(endDate).setHours(23, 59, 59, 999);

    const filteredCustomers = customers.filter((customer) => {
      const customerRegDate = new Date(customer.customerReg).setHours(0, 0, 0, 0);
      return customerRegDate >= formattedStartDate && customerRegDate <= formattedEndDate;
    });

    setFilteredData(filteredCustomers);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns = [
    { id: "customerId", label: "ID" },
    { id: "customerName", label: "이름" },
    { id: "customerGender", label: "성별" },
    { id: "customerTel", label: "연락처" },
    { id: "customerMail", label: "E-mail" },
    { id: "customerReg", label: "고객 등록일" },
    { id: "customerRank", label: "고객 등급" },
    { id: "customerNote", label: "특이사항" },
  ];

  const rows = currentItems.map((customer) => ({
    customerId: customer.customerId,
    customerName: (
      <span
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => {
          setSelectedCustomer(customer);
          setShowDetailModal(true);
          handleDetail(customer);
        }}
      >
        {customer.customerName}
      </span>
    ),
    customerGender: customer.customerGender || "정보 없음",
    customerTel: customer.customerTel || "정보 없음",
    customerMail: customer.customerMail || "정보 없음",
    customerReg: customer.customerReg || "정보 없음",
    customerRank: customer.customerRank || "정보 없음",
    customerNote: customer.customerNote || "없음",
  }));

  return (
    <Box sx={{ width: "100%", margin: "0 auto", padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DateSearch selectedDate={startDate} setSelectedDate={setStartDate} />
          <span>-</span>
          <DateSearch selectedDate={endDate} setSelectedDate={setEndDate} />
          <button className={styles.searchButton} onClick={handleSearch}>
            <RiSearchLine />
          </button>
        </Box>

        <ListSearch
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          handleSearchClick={handleSearchClick}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        <Button variant="contained" color="success" onClick={() => setShowModal(true)}>
          고객등록
        </Button>
      </Box>

      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  등록된 고객이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showModal && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">고객 등록</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <CustomerInsForm setShowModal={setShowModal} refresh={refresh} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedCustomer && (
        <CustomerDetail
          selectedCustomer={selectedCustomer}
          setShowDetailModal={setShowDetailModal}
          refresh={refresh}
        />
      )}
    </Box>
  );
}

CustomerList.propTypes = {
  handleDetail: PropTypes.func.isRequired,
};

export default CustomerList;