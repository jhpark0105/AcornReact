import React, { useState, useEffect } from "react";
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
import ListSearch from "./ListSearch";
import DateSearch from "./DateSearch";
import { RiSearchLine } from "react-icons/ri";
import styles from "./ListSearch.module.css";

function ReservationList({ reservations, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [selectedFilter, setSelectedFilter] = useState("serviceName");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (reservations && reservations.length > 0) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 이번 달 1일
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 이번 달 마지막 날

      setStartDate(startOfMonth);
      setEndDate(endOfMonth);

      const filtered = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate >= startOfMonth && reservationDate <= endOfMonth;
      });

      setFilteredData(filtered);
    }
  }, [reservations]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchClick = () => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const serviceMatch = item.service.serviceName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const customerMatch = item.customer.customerName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const memberMatch = item.member.memberName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        if (selectedFilter === "serviceName") return serviceMatch;
        if (selectedFilter === "customerName") return customerMatch;
        if (selectedFilter === "memberName") return memberMatch;
        return serviceMatch || customerMatch || memberMatch;
      });
    }

    if (startDate && endDate) {
      filtered = filtered.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate >= startDate && reservationDate <= endDate;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const columns = [
    { id: "reservationNo", label: "예약 번호" },
    { id: "serviceName", label: "서비스 명" },
    { id: "reservationDate", label: "예약 날짜" },
    { id: "reservationTime", label: "예약 시간" },
    { id: "customerName", label: "예약자" },
    { id: "memberName", label: "담당 직원" },
    { id: "reservationComm", label: "특이사항" },
  ];

  const rows = currentItems.map((reservation) => ({
    reservationNo: reservation.reservationNo,
    serviceName: reservation.service?.serviceName || "정보 없음",
    reservationDate: reservation.reservationDate,
    reservationTime: reservation.reservationTime,
    customerName: (
      <span
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => handleDetail(reservation)}
      >
        {reservation.customer?.customerName || "정보 없음"}
      </span>
    ),
    memberName: reservation.member?.memberName || "정보 없음",
    reservationComm: reservation.reservationComm || "없음",
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
          <ListSearch
            searchTerm={searchTerm}
            onChange={setSearchTerm}
            handleSearchClick={handleSearchClick}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
        >
          예약 등록
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
                  등록된 예약이 없습니다.
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
    </Box>
  );
}

ReservationList.propTypes = {
  reservations: PropTypes.array.isRequired,
  handleDetail: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ReservationList;
