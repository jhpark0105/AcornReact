import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TableHead,
	Box,
} from "@mui/material";
import axios from "axios";
import Pagination from "./paging/Pagination.jsx";
import ListSearch from "./Search/ListSearch.jsx";
import DateSearch from "./Search/DateSearch.jsx";
import AttendanceDetailModal from "./AttendanceDetailModal.jsx";
import "./AttendanceTable.css";
import { RiSearchLine } from "react-icons/ri";
import { toast } from "react-toastify";
import styles from "./ListSearch.module.css";

const headCells = [
	{ id: "attendanceId", label: "ID" },
	{ id: "attendanceDate", label: "날짜" },
	{ id: "checkIn", label: "출근" },
	{ id: "checkOut", label: "퇴근" },
	{ id: "attendanceStatus", label: "상태" },
	{ id: "memberName", label: "직원 이름" },
];

const AttendanceTable = () => {
	const [attendances, setAttendances] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [searchTerm, setSearchTerm] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [selectedAttendance, setSelectedAttendance] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [updating, setUpdating] = useState(false); // 추가된 상태

	useEffect(() => {
		fetchAttendanceData();
	}, []);

	const fetchAttendanceData = () => {
		axios
			.get("http://localhost:8080/api/attendance/all")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setAttendances(response.data);
					setFilteredData(response.data);
				} else {
					toast.error("올바르지 않은 데이터 형식입니다.");
				}
			})
			.catch(() => {
				toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
			});
	};

	const handleSearchClick = () => {
		let filtered = attendances;

		if (searchTerm) {
			filtered = filtered.filter((item) =>
				item.memberName?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (startDate && endDate) {
			filtered = filtered.filter((attendance) => {
				const attendanceDate = new Date(attendance.attendanceDate);
				return attendanceDate >= startDate && attendanceDate <= endDate;
			});
		}

		setFilteredData(filtered);
		setCurrentPage(1);
		toast.info("검색 결과가 업데이트되었습니다.");
	};

	const handleNameClick = (attendance) => {
		setSelectedAttendance(attendance);
		setShowModal(true);
		setUpdating(false);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setSelectedAttendance(null);
		setUpdating(false);
	};

	const handleSave = () => {
		axios
			.put(`http://localhost:8080/api/attendance/update`, selectedAttendance)
			.then((response) => {
				// 서버 응답에서 성공 여부 확인
				if (response.data.Success) {
					toast.success("근태 정보가 수정되었습니다.");
				} else {
					toast.error("근태 정보 수정에 실패했습니다.");
				}


				setAttendances((prevAttendances) =>
					prevAttendances.map((attendance) =>
						attendance.attendanceId === selectedAttendance.attendanceId
							? { ...attendance, ...selectedAttendance }
							: attendance
					)
				);
				// 필터링된 데이터도 즉시 업데이트
				setFilteredData((prevFilteredData) =>
					prevFilteredData.map((attendance) =>
						attendance.attendanceId === selectedAttendance.attendanceId
							? { ...attendance, ...selectedAttendance } // 수정 데이터 반영
							: attendance
					)
				);

				setShowModal(false);
				setUpdating(false);
			})
			.catch(() => {
				toast.error("저장 중 오류가 발생했습니다.");
			});
	};


	const handleUpdate = () => {
		setUpdating(true);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
					<button className={styles.searchButton} onClick={handleSearchClick}>
						<RiSearchLine />
					</button>
				</Box>
				<ListSearch
					searchTerm={searchTerm}
					onChange={setSearchTerm}
					handleSearchClick={handleSearchClick}
				/>
			</Box>

			<TableContainer sx={{ width: "100%", overflowX: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							{headCells.map((col) => (
								<TableCell key={col.id}>{col.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{currentItems.length > 0 ? (
							currentItems.map((row, index) => (
								<TableRow key={index}>
									{headCells.map((col) => (
										<TableCell
											key={col.id}
											onClick={
												col.id === "memberName"
													? () => handleNameClick(row)
													: undefined
											}
											style={
												col.id === "memberName"
													? { color: "blue", cursor: "pointer", textDecoration: "underline" }
													: {}
											}
										>
											{row[col.id] || "미등록"}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={headCells.length} align="center">
									데이터가 없습니다.
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

			{showModal && selectedAttendance && (
				<AttendanceDetailModal
					existingData={selectedAttendance}
					handleDetailChange={(e) => {
						const { name, value } = e.target;
						setSelectedAttendance((prev) => ({
							...prev,
							[name]: value,
						}));
					}}
					handleSave={handleSave}
					handleUpdate={handleUpdate}
					setShowDetailModal={handleModalClose}
					updating={updating}
				/>
			)}
		</Box>
	);
};

export default AttendanceTable;
