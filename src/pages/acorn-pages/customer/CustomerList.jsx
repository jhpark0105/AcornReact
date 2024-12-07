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
import styles from "./ListSearch.module.css"; // 스타일이 있다면 이 경로를 맞춰주세요
import { RiSearchLine } from "react-icons/ri";
import CustomerInsForm from "./CustomerInsForm"; // 이 경로 맞게 수정 필요
import CustomerDetail from "./CustomerDetail"; // 이 경로 맞게 수정 필요

function CustomerList({ handleDetail, refresh }) {
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


  // 고객 데이터를 서버에서 불러오는 함수
  useEffect(() => {
    axios
      .get("http://localhost:8080/customer") // API 호출
      .then((res) => {
        setCustomers(res.data);
        setFilteredData(res.data); // 초기 데이터 필터링
      })
      .catch((error) => {
        console.error("고객 데이터를 가져오는데 실패했습니다.", error);
      });
  }, []);



  // 이름, 등급, 번호 검색
  const handleSearchClick = () => {
    const filtered = customers.filter((item) =>
      item[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 고객 이름 클릭하면 모달창으로 상세정보
  // const handleDetail = (customer) => {
  //   setSelectedCustomer(customer);
  //   setShowDetailModal(true);
  //   setIsEditing(false);
  // }
  // const handleEdit = () => {
  //     setIsEditing(true);
  // }


  // 기간 검색용
  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString().slice(0, 10);
    const formattedEndDate = new Date(endDate).toISOString().slice(0, 10);

    const filteredCustomers = customers.filter((customer) => {
      const customerRegDate = customer.customerReg.slice(0, 10);
      return customerRegDate >= formattedStartDate && customerRegDate <= formattedEndDate;
    });

    setFilteredData(filteredCustomers);
    setCurrentPage(1);
  };

  // 페이지네이션을 위한 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 테이블 열 설정
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
          handleDetail(customer); // 부모 컴포넌트로 고객 상세 정보 전달
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
          고객 등록
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
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
                <CustomerInsForm setShowModal={setShowModal} />
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
