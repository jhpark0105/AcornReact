import React, { useState } from "react";
import axios from "axios";
import {
	Box,
	TextField,
	Button,
	Typography,
	Grid,
	Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";


const AttendanceActions = () => {
	const [memberId, setMemberId] = useState("");
	const [password, setPassword] = useState("");

	const handleCheckIn = () => {
		axios
			.post("/api/attendance/check-in", null, {
				params: { memberId, password },
			})
			.then((response) => {
				toast.success(response.data || "출근 처리가 완료되었습니다!");
			})
			.catch((error) => {
				console.error("Error during check-in:", error);
				toast.error(
					error.response?.data || "출근 처리 중 오류가 발생했습니다."
				);
			});
	};

	const handleCheckOut = () => {
		axios
			.post("/api/attendance/check-out", null, {
				params: { memberId },
			})
			.then((response) => {
				toast.success(response.data || "퇴근 처리가 완료되었습니다!");
			})
			.catch((error) => {
				console.error("Error during check-out:", error);
				toast.error(
					error.response?.data || "퇴근 처리 중 오류가 발생했습니다."
				);
			});
	};

	return (
		<Paper elevation={3} sx={{ padding: 3, margin: "20px auto", maxWidth: 400 }}>
			<ToastContainer />
			<Typography variant="h5" component="h2" gutterBottom align="center">
				출근 / 퇴근 관리
			</Typography>
			<Box component="form" noValidate autoComplete="off">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="사번"
							variant="outlined"
							value={memberId}
							onChange={(e) => setMemberId(e.target.value)}
							placeholder="사번 입력"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="비밀번호"
							type="password"
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="비밀번호 입력"
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleCheckIn}
							sx={{ marginTop: 1 }}
						>
							출근
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							onClick={handleCheckOut}
							sx={{ marginTop: 1 }}
						>
							퇴근
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AttendanceActions;
