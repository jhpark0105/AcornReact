import React, { useState } from "react";
import axios from "axios";

const AttendanceActions = () => {
	const [memberId, setMemberId] = useState("");
	const [password, setPassword] = useState("");

	const handleCheckIn = () => {
		axios.post("/api/attendance/check-in", null, {
			params: { memberId, password }
		})
			.then((response) => {
				alert(response.data);
			})
			.catch((error) => {
				console.error("Error during check-in:", error);
				alert(error.response.data);
			});
	};

	const handleCheckOut = () => {
		axios.post("/api/attendance/check-out", null, {
			params: { memberId }
		})
			.then((response) => {
				alert(response.data);
			})
			.catch((error) => {
				console.error("Error during check-out:", error);
				alert(error.response.data);
			});
	};

	return (
		<div>
			<h2>출근/퇴근</h2>
			<label>
				사번:
				<input
					type="text"
					value={memberId}
					onChange={(e) => setMemberId(e.target.value)}
					placeholder="사번 입력"
				/>
			</label>
			<br />
			<label>
				비밀번호:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="비밀번호 입력"
				/>
			</label>
			<br />
			<button onClick={handleCheckIn}>출근</button>
			<button onClick={handleCheckOut}>퇴근</button>
		</div>
	);
};

export default AttendanceActions;
