import React, { useState, useEffect } from "react";
import "./Tab.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Pagination from "./paging/Pagination";
import ListSearch from "./ListSearch";
import DateSearch from "./DateSearch";
import styles from "./ListSearch.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 항목 수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [selectedFilter, setSelectedFilter] = useState("serviceName"); // 선택된 필터
  const [startDate, setStartDate] = useState(null); // 시작 날짜
  const [endDate, setEndDate] = useState(null); // 종료 날짜

  useEffect(() => {
    // 예약 확정 리스트 가져오기
    fetch("http://localhost:8080/reservation/finish")
      .then((response) => response.json())
      .then((data) => setConfirmedReservations(data))
      .catch((error) => console.error("Error fetching confirmed reservations:", error));

    // 예약 취소 리스트 가져오기
    fetch("http://localhost:8080/reservation/cancel")
      .then((response) => response.json())
      .then((data) => setCancelledReservations(data))
      .catch((error) => console.error("Error fetching cancelled reservations:", error));
  }, []);

  useEffect(() => {
    // 탭 변경 시 초기 데이터 설정
    const initialData = activeTab === "tab1" ? confirmedReservations : cancelledReservations;
    setFilteredData(initialData);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 이동
  }, [activeTab, confirmedReservations, cancelledReservations]);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 검색 필터링 처리
  const handleSearchClick = () => {
    const reservations = activeTab === "tab1" ? confirmedReservations : cancelledReservations;
    let filtered = reservations;

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const serviceMatch = item.service?.serviceName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const customerMatch = item.customer?.customerName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const memberMatch = item.member?.memberName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        if (selectedFilter === "serviceName") return serviceMatch;
        if (selectedFilter === "customerName") return customerMatch;
        if (selectedFilter === "memberName") return memberMatch;
        return serviceMatch || customerMatch || memberMatch;
      });
    }

    // 날짜 범위 필터링
    if (startDate && endDate) {
      filtered = filtered.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate >= new Date(startDate) && reservationDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const columns = [
    { id: "reservationNo", label: "예약 번호" },
    { id: "serviceName", label: "서비스 명" },
    { id: "reservationDate", label: "예약 날짜" },
    { id: "reservationTime", label: "예약 시간" },
    { id: "customerName", label: "예약자" },
    { id: "memberName", label: "담당 직원" },
    { id: "servicePrice", label: "서비스 금액" },
  ];

  const renderRows = (data) => {
    return data.map((reservation, index) => (
      <TableRow key={index}>
        <TableCell>{reservation.reservationNo}</TableCell>
        <TableCell>{reservation.service?.serviceName || "정보 없음"}</TableCell>
        <TableCell>{reservation.reservationDate}</TableCell>
        <TableCell>{reservation.reservationTime}</TableCell>
        <TableCell>{reservation.customer?.customerName || "정보 없음"}</TableCell>
        <TableCell>{reservation.member?.memberName || "정보 없음"}</TableCell>
        <TableCell>
          {reservation.service?.servicePrice
            ? `${reservation.service.servicePrice.toLocaleString()} 원`
            : "정보 없음"}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      {/* 검색 필터 */}
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            padding: "16px",
            background: "transparent",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DateSearch selectedDate={startDate} setSelectedDate={setStartDate} />
            <span style={{height:45}}>-</span>
            <DateSearch selectedDate={endDate} setSelectedDate={setEndDate} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ListSearch
              searchTerm={searchTerm}
              onChange={setSearchTerm}
              handleSearchClick={handleSearchClick}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </Box>
      </Box>

    <div className="tabs-container">
      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => setActiveTab("tab1")}
        >
          예약 확정
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => setActiveTab("tab2")}
        >
          예약 취소
        </button>
      </div>

      
      {/* Tab content */}
      <div className="tab-content">
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
              {currentItems.length > 0 ? (
                renderRows(currentItems)
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {activeTab === "tab1"
                      ? "확정된 예약이 없습니다."
                      : "취소된 예약이 없습니다."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
    </>
  );
}

export default Tabs;