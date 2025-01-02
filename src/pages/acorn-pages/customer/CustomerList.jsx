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

import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerList({ handleDetail,  }) {  // refresh를 refreshData로 이름 변경
  const [customers, setCustomers] = useState([]);  // 고객 목록 상태
  const [showModal, setShowModal] = useState(false);  // 고객 등록 모달 표시 상태
  const [selectedCustomer, setSelectedCustomer] = useState(null);  // 선택된 고객 상태
  const [showDetailModal, setShowDetailModal] = useState(false);  // 고객 상세 보기 모달 표시
  const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태
  const [filteredData, setFilteredData] = useState([]);  // 필터링된 데이터 상태
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
  const itemsPerPage = 10;  // 한 페이지에 보여줄 아이템 개수
  const [selectedFilter, setSelectedFilter] = useState("customerName");  // 검색 필터(기본값은 이름)
  const [startDate, setStartDate] = useState(null);  // 검색 시작 날짜 상태
  const [endDate, setEndDate] = useState(null);  // 검색 종료 날짜 상태

  // 고객 데이터를 서버에서 불러오는 함수
  const refresh = () => {  // 여기서만 refresh라는 이름을 유지할 수 있음
    axios
      .get("http://localhost:8080/customer") // API 호출
      .then((res) => {
        setCustomers(res.data);  // 고객 목록 갱신
        setFilteredData(res.data); // 새로 고침 후 데이터 갱신
      })
      .catch((error) => {
        console.error("고객 데이터를 가져오는데 실패했습니다.", error);
      });
  };

  useEffect(() => {
    refresh();  // 초기 데이터 불러오기
  }, []);

  // 이름, 등급, 번호 검색
  const handleSearchClick = () => {
    const filtered = customers.filter((item) =>
      item[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 기간 검색용
  const handleSearch = () => {
    if (!startDate || !endDate) {  // 시작, 종료 날짜 모두 선택 안 된 경우
      alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");  // 알림
      return;
    }

    // 날짜를 UTC 시간대로 변환하여 'YYYY-MM-DD' 형식으로 추출
    const formattedStartDate = new Date(startDate).setHours(0, 0, 0, 0); // 시작일의 자정 (00:00:00)
    const formattedEndDate = new Date(endDate).setHours(23, 59, 59, 999); // 종료일의 마지막 시간 (23:59:59)

    const filteredCustomers = customers.filter((customer) => {
      const customerRegDate = new Date(customer.customerReg).setHours(0, 0, 0, 0); // 고객 등록일도 자정으로 맞추기
      return customerRegDate >= formattedStartDate && customerRegDate <= formattedEndDate;
    });

    setFilteredData(filteredCustomers);  // 필터링된 데이터로 업데이트
    setCurrentPage(1);  // 검색 결과 첫 페이지로 이동
  };

  // 페이지네이션을 위한 계산
  const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 아이템 인덱스
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 아이템 인덱스
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지에 표시할 아이템
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // 전체 페이지 수 계산


  // 테이블 열 설정
  const headCells = [
    { id: "customerId", label: "ID", width: "100px" },
    { id: "customerName", label: "이름", width: "150px" },
    { id: "customerGender", label: "성별", width: "100px" },
    { id: "customerTel", label: "연락처", width: "200px" },
    { id: "customerMail", label: "E-mail", width: "250px" },
    { id: "customerReg", label: "고객 등록일", width: "150px" },
    { id: "customerRank", label: "고객 등급", width: "150px" },
    { id: "customerNote", label: "특이사항", width: "300px" },
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
          console.log("Customer clicked:", customer);
          setSelectedCustomer(customer);
          setShowDetailModal(true);
        }}
      >
        {customer.customerName}
      </span>
    ),
    customerGender: customer.customerGender || " ",
    customerTel: customer.customerTel || " ",
    customerMail: customer.customerMail || " ",
    customerReg: customer.customerReg || " ",
    customerRank: customer.customerRank || " ",
    customerNote: customer.customerNote || " ",
  }));

  return (
    <Box sx={{ width: "100%", margin: "0 auto", padding: "16px" }}>
      {/* 검색 및 필터링 UI */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* 기간 검색 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DateSearch selectedDate={startDate} setSelectedDate={setStartDate} />  {/* 시작 날짜 */}
          <span>-</span>
          <DateSearch selectedDate={endDate} setSelectedDate={setEndDate} />  {/* 종료 날짜 */}
          <button className={styles.searchButton} onClick={handleSearch}>  {/* 검색 버튼 */} 
            <RiSearchLine />
          </button>
        </Box>

        {/* 이름, 등급, 연락처 검색 */}
        <ListSearch
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          handleSearchClick={handleSearchClick}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
          style={{
            whiteSpace: "nowrap",
            padding: "8px 20px",
            marginTop: "5px",
          }}
        >
          고객 등록
        </Button>
      </Box>

      {/* 고객 목록 테이블 */}
      <TableContainer sx={{ marginTop: "20px", overflowX: "auto" }}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sx={{
                    width: headCell.width,
                    minWidth: headCell.width,
                    maxWidth: headCell.width,
                  }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {headCells.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  등록된 고객이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}  // 현재 페이지
        totalPages={totalPages}  // 전체 페이지 수
        onPageChange={setCurrentPage}  // 페이지 변경 핸들로
      />

      {/* 고객 등록 모달 */}
      {showModal && (
        <CustomerInsForm setShowModal={setShowModal} refresh={refresh} />
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