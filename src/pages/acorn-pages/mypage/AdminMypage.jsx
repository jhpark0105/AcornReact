import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, Avatar, TextField, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * ReadOnly 상태의 TextField를 위한 커스텀 스타일 컴포넌트
 * - 읽기 전용 필드의 스타일을 유지하며 사용자 입력을 방지
 */
const ReadOnlyTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
		'&:hover fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
	},
	'& .MuiInputBase-input.Mui-disabled': {
		WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
		cursor: 'default',
	},
});

/**
 * AdminMypage 컴포넌트
 * - 관리자 정보 조회 및 읽기 전용 필드로 표시
 */
const AdminMypage = () => {
	const [adminData, setAdminData] = useState(null); // 관리자 데이터를 저장하는 상태

	/**
	 * useEffect로 컴포넌트 마운트 시 관리자 데이터를 서버에서 가져옴
	 */
	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/admin/mypage', {
					withCredentials: true, // 쿠키를 포함한 인증 요청
				});
				setAdminData(response.data);
			} catch (error) {
				console.error('Admin 데이터 로딩 중 오류:', error);
			}
		};

		fetchAdminData();
	}, []);

	// 데이터 로딩 중일 때 로딩 메시지 표시
	if (!adminData) return <div>로딩 중...</div>;

	return (
		<Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
			{/* 제목 표시 */}
			<Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
				내 정보 보기
			</Typography>
			{/* 관리자 정보 표시 영역 */}
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={4}>
					{/* 관리자 프로필 이미지 표시 */}
					<Avatar
						src="/path/to/admin-profile-image.jpg"
						sx={{ width: 128, height: 128, margin: 'auto' }}
					/>
				</Grid>
				<Grid item xs={8}>
					<form>
						{/* 관리자 ID (읽기 전용) */}
						<ReadOnlyTextField
							label="관리자 ID"
							name="adminId"
							value={adminData.adminId}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						{/* 관리자 이름 (읽기 전용) */}
						<ReadOnlyTextField
							label="관리자 이름"
							name="adminName"
							value={adminData.adminName}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						{/* 관리자 이메일 (읽기 전용) */}
						<ReadOnlyTextField
							label="관리자 이메일"
							name="adminEmail"
							value={adminData.adminEmail}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						{/* 관리자 연락처 (읽기 전용) */}
						<ReadOnlyTextField
							label="관리자 연락처"
							name="adminPhone"
							value={adminData.adminPhone}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
					</form>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default AdminMypage;
