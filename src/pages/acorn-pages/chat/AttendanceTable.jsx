import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceTable = () => {
	const [attendances, setAttendances] = useState([]);

	useEffect(() => {
		axios.get("/api/attendance/all")
			.then((response) => {
				setAttendances(response.data);
			})
			.catch((error) => {
				console.error("Error fetching attendance data:", error);
			});
	}, []);

	return (
		<div>
			<h2>근태 기록</h2>
			<table>
				<thead>
				<tr>
					<th>ID</th>
					<th>날짜</th>
					<th>출근</th>
					<th>퇴근</th>
					<th>상태</th>
					<th>직원 ID</th>
				</tr>
				</thead>
				<tbody>
				{attendances.map((attendance) => (
					<tr key={attendance.attendanceId}>
						<td>{attendance.attendanceId}</td>
						<td>{attendance.attendanceDate}</td>
						<td>{attendance.checkIn}</td>
						<td>{attendance.checkOut}</td>
						<td>{attendance.attendanceStatus}</td>
						<td>{attendance.memberId}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default AttendanceTable;
