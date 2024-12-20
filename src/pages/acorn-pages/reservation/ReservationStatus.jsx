import React, { useState, useEffect } from "react";
import "./Tab.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);

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
          <NumericFormat
            value={reservation.service?.servicePrice || 0}
            displayType="text"
            thousandSeparator
            suffix=" 원"
          />
        </TableCell>
      </TableRow>
    ));
  };

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
                {confirmedReservations.length > 0 ? (
                  renderRows(confirmedReservations)
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
        )}
        {activeTab === "tab2" && (
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
                {cancelledReservations.length > 0 ? (
                  renderRows(cancelledReservations)
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
        )}
      </div>
    </div>
  );
}

export default Tabs;
