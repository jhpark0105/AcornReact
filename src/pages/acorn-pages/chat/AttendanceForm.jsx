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
import { toast } from "react-toastify";

const TodayAttendanceTable = () => {
	const todayDate = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
	const [todayAttendance, setTodayAttendance] = useState([]);
	const [allMembers, setAllMembers] = useState([]);

	useEffect(() => {
		// 모든 직원과 오늘 근태 데이터를 가져오기
		axios
			.all([
				axios.get("http://localhost:8080/member"), // 모든 직원 데이터 API 호출
				axios.get("http://localhost:8080/api/attendance/all"), // 모든 근태 데이터 API 호출
			])
			.then(
				axios.spread((membersResponse, attendanceResponse) => {
					if (Array.isArray(membersResponse.data) && Array.isArray(attendanceResponse.data)) {
						setAllMembers(membersResponse.data);

						// 오늘 날짜 근태 데이터 필터링
						const filteredAttendance = attendanceResponse.data.filter(
							(record) => record.attendanceDate === todayDate
						);
						setTodayAttendance(filteredAttendance);
					} else {
						toast.error("올바르지 않은 데이터 형식입니다.");
					}
				})
			)
			.catch(() => {
				toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
			});
	}, [todayDate]);

	// 모든 직원 데이터에 대해 근태 데이터 매칭
	const mergedData = allMembers.map((member) => {
		const attendance = todayAttendance.find(
			(record) => record.memberId === member.memberId
		);
		return {
			memberId: member.memberId,
			memberName: member.memberName,
			attendanceDate: attendance?.attendanceDate || todayDate,
			checkIn: attendance?.checkIn || "미등록",
			checkOut: attendance?.checkOut || "미등록",
			attendanceStatus: attendance?.attendanceStatus || "미등록",
		};
	});

	return (
		<Box>
			<h2>오늘의 근태</h2>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>직원 사번</TableCell>
							<TableCell>직원 이름</TableCell>
							<TableCell>날짜</TableCell>
							<TableCell>출근 시간</TableCell>
							<TableCell>퇴근 시간</TableCell>
							<TableCell>상태</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{mergedData.length > 0 ? (
							mergedData.map((record) => (
								<TableRow key={record.memberId}>
									<TableCell>{record.memberId}</TableCell>
									<TableCell>{record.memberName}</TableCell>
									<TableCell>{record.attendanceDate}</TableCell>
									<TableCell>{record.checkIn}</TableCell>
									<TableCell>{record.checkOut}</TableCell>
									<TableCell>{record.attendanceStatus}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} align="center">
									오늘 근태 기록이 없습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TodayAttendanceTable;
