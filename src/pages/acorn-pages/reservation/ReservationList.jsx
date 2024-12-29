import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button} from "@mui/material";
import Pagination from "./paging/Pagination";
import ListSearch from "./ListSearch";
import DateSearch from "./DateSearch";
import { toast } from 'react-toastify';

function ReservationList({ reservations, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수
  const [selectedFilter, setSelectedFilter] = useState("serviceName"); // 선택된 기준 필터
  const [startDate, setStartDate] = useState(null); // 기간 조회 - 시작 날짜
  const [endDate, setEndDate] = useState(null); // 기간 조회 - 끝 날짜

  // 초기 렌더링 시 filteredData를 reservations로 설정
  useEffect(() => {
    if (reservations && reservations.length > 0) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // 접속 당일 날짜
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()); // 접속 날짜로부터 + 1달

      // 시작일 종료일 지정 
      setStartDate(startOfMonth);
      setEndDate(endOfMonth);

      // 필터링된 데이터 설정 (초기 데이터는 한 달만 필터링)
      const filtered = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate >= startOfMonth && reservationDate <= endOfMonth;
      });

      setFilteredData(filtered);
    }
  }, [reservations]); // 예약데이터 변경될 때마다 필터링

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 검색어에 따른 필터링 처리
  const handleSearchClick = () => {
    let filtered = reservations;

    // 검색어에 따른 필터링
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

        //선택된필터에 따라 필터링
        if (selectedFilter === "serviceName") return serviceMatch;
        if (selectedFilter === "customerName") return customerMatch;
        if (selectedFilter === "memberName") return memberMatch;
        return serviceMatch || customerMatch || memberMatch;
      });
    }

    // 날짜 범위 필터링
    if (startDate && endDate) {
      // 1. 시작 날짜가 종료 날짜보다 이후일 경우
      if (startDate > endDate) {
        toast.error("시작 날짜가 종료 날짜보다 이후일 수 없습니다."); // 경고 메시지
        setStartDate(null); // 날짜 초기화
        setEndDate(null);
        return; // 필터링 중단
      }
    
      // 2. 유효한 범위의 날짜를 기반으로 필터링
      filtered = filtered.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate >= startDate && reservationDate <= endDate;
      });
    } else if (!startDate && endDate) {
      // 3. 시작 날짜가 비어 있는 경우
      toast.error("시작 날짜를 입력하세요."); // 경고 메시지
    } else if (startDate && !endDate) {
      // 4. 종료 날짜가 비어 있는 경우
      toast.error("종료 날짜를 입력하세요."); // 경고 메시지
    } else {
      // 5. 날짜가 모두 비어 있는 경우 (전체 검색)
      filtered = reservations; // 원본 데이터를 그대로 사용
    }
    setFilteredData(filtered);// 필터링된 데이터 상태 업데이트
    setCurrentPage(1);// 검색 후 첫 페이지로 이동
  };

  const headCells = [
    { id: "reservationNo", label: "예약 번호" , width:"100px"},
    { id: "serviceName", label: "서비스 명" ,width:"100px"},
    { id: "reservationDate", label: "예약 날짜" ,width:"150px"},
    { id: "reservationTime", label: "예약 시간" ,width:"150px"},
    { id: "customerName", label: "예약자" ,width:"100px"},
    { id: "memberName", label: "담당 직원" ,width:"100px"},
    { id: "reservationComm", label: "특이사항" ,width:"200px"},
  ];

  /**
   * 테이블 헤더
   * @param {string} order - 정렬 방향
   * @param {string} orderBy - 정렬 기준 필드
   */
  function ReservationTableHead({ order, orderBy }) {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{width:headCell.width}}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  ReservationTableHead.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };


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
          <span style={{height:45}}>-</span>
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
          style={{
            whiteSpace: "nowrap",
            padding: "8px 20px",
            marginTop: "-20px", // 위로 5px 이동
          }}
        >
          예약 등록
        </Button>
      </Box>

      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <ReservationTableHead/>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {headCells.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  등록된 예약이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
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
