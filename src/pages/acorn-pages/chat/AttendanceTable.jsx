import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TableHead,
	Box,
	Modal,
	Button,
} from "@mui/material";
import Pagination from "../../../acorn-components/components/Pagination";
import axios from "axios";
import AttendanceForm from "./AttendanceForm";

// 테이블 헤더 정의
const headCells = [
	{ id: "attendanceId", align: "left", label: "ID", width: "150px" },
	{ id: "attendanceDate", align: "left", label: "날짜", width: "150px" },
	{ id: "checkIn", align: "left", label: "출근", width: "150px" },
	{ id: "checkOut", align: "left", label: "퇴근", width: "150px" },
	{ id: "attendanceStatus", align: "left", label: "상태", width: "150px" },
	{ id: "memberId", align: "left", label: "직원 ID", width: "150px" },
];

const AttendanceTable = () => {
	const [attendances, setAttendances] = useState([]);
	const [filteredData, setFilteredData] = useState([]); // 검색 결과 상태
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
	const [itemsPerPage, setItemsPerPage] = useState(10); // 한 페이지당 항목 수
	const [selectedAttendance, setSelectedAttendance] = useState(null); // 선택된 데이터
	const [modalOpen, setModalOpen] = useState(false); // 모달 상태

	// 데이터 가져오기
	useEffect(() => {
		axios
			.get("/api/attendance/all")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setAttendances(response.data);
					setFilteredData(response.data); // 검색 기본 상태 설정
				} else {
					console.error("Expected an array but received:", response.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching attendance data:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	// 현재 페이지 데이터 계산
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	// 총 페이지 수 계산
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	// 수정 모달 열기
	const handleEditClick = (attendance) => {
		setSelectedAttendance(attendance);
		setModalOpen(true);
	};

	// 모달 닫기
	const handleCloseModal = () => {
		setSelectedAttendance(null);
		setModalOpen(false);
	};

	// 테이블 렌더링
	return (
		<Box>
			<h2>근태 기록</h2>

			{/* 로딩 상태 */}
			{loading ? (
				<p>Loading...</p>
			) : (
				<TableContainer style={{ marginTop: "20px" }}>
					<Table>
						{/* 테이블 헤더 */}
						<TableHead>
							<TableRow>
								{headCells.map((headCell) => (
									<TableCell
										key={headCell.id}
										align={headCell.align}
										sx={{ width: headCell.width }}
									>
										{headCell.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						{/* 테이블 데이터 */}
						<TableBody>
							{currentItems.length > 0 ? (
								currentItems.map((row) => (
									<TableRow key={row.attendanceId}>
										{headCells.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												onClick={
													column.id === "attendanceId"
														? () => handleEditClick(row)
														: undefined
												}
												style={{
													cursor: column.id === "attendanceId" ? "pointer" : "default",
													color: column.id === "attendanceId" ? "blue" : "inherit",
													textDecoration:
														column.id === "attendanceId" ? "underline" : "none",
												}}
											>
												{row[column.id]}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={headCells.length} align="center">
										근태 데이터가 없습니다.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{/* 페이지네이션 */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				itemsPerPage={itemsPerPage}
				setItemsPerPage={setItemsPerPage}
			/>

			{/* 수정 모달 */}
			<Modal open={modalOpen} onClose={handleCloseModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<AttendanceForm
						existingData={selectedAttendance}
						refreshTable={() => {
							setModalOpen(false);
							// 테이블 리프레시
							axios.get("/api/attendance/all").then((response) => {
								setAttendances(response.data);
								setFilteredData(response.data);
							});
						}}
					/>
					<Button
						variant="contained"
						color="error"
						onClick={handleCloseModal}
						sx={{ marginTop: 2 }}
					>
						닫기
					</Button>
				</Box>
			</Modal>
		</Box>
	);
};

export default AttendanceTable;
