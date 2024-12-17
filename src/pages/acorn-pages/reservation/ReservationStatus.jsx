import React, { useState } from "react";
import "./Tab.css";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

function Tabs({reservations}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [filteredData, setFilteredData] = useState([]); // 예시용 기본 상태값

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
  

  // 페이지네이션 관련 변수
  const itemsPerPage = 10;
  const currentPage = 1;

  // currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // rows 계산
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
    <div className="tabs-container">
      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => handleTabClick("tab1")}
        >
          예약 확정
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => handleTabClick("tab2")}
        >
          예약 취소
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "tab1" && (
          <div>
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
                        확정된 예약이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {activeTab === "tab2" && (
          <div>
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
                      취소된 예약이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;