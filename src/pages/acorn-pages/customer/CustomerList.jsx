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
    refresh(); // 초기 데이터 불러오기
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


  // 테이블 데이터 생성
  const rows = currentItems.map((customer) => ({
    customerId: customer.customerId,
    customerName: (
      <span
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => {  // 고객 이름 클릭 시
          setSelectedCustomer(customer);  // 선택된 고객 정보 업데이트
          setShowDetailModal(true);  // 상세보기 모달
          handleDetail(customer); // 부모 컴포넌트로 고객 상세 정보 전달
        }}
      >
        {customer.customerName}
      </span>
    ),
    customerGender: customer.customerGender || "정보 없음",  //각각 정보 없는 경우 기본값으로
    customerTel: customer.customerTel || "정보 없음",
    customerMail: customer.customerMail || "정보 없음",
    customerReg: customer.customerReg || "정보 없음",
    customerRank: customer.customerRank || "정보 없음",
    customerNote: customer.customerNote || "없음",
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

        <Button variant="contained" color="success" onClick={() => setShowModal(true)}>
          고객등록
        </Button>
      </Box>

      {/* 고객 목록 테이블 */}
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

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}  // 현재 페이지
        totalPages={totalPages}  // 전체 페이지 수
        onPageChange={setCurrentPage}  // 페이지 변경 핸들로
      />

      {/* 고객 등록 모달 */}
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
                <CustomerInsForm setShowModal={setShowModal} refresh={refresh} show={showModal} />  {/* 고객 등록 폼 */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 고객 상세 정보 모달 */}
      {showDetailModal && selectedCustomer && (
        <CustomerDetail
          selectedCustomer={selectedCustomer}  // 선택된 고객 정보 전달
          setShowDetailModal={setShowDetailModal}  // 상세 보기 모달 닫기
          refresh={refresh}  // 새로 고침
        />
      )}
    </Box>
  );
}

CustomerList.propTypes = {
  handleDetail: PropTypes.func.isRequired,  // 상세 정보 전달 함수
  refreshData: PropTypes.func.isRequired, // 데이터 갱신 함수
};

export default CustomerList;