import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, Avatar, TextField, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// ReadOnly 상태의 TextField를 위한 커스텀 스타일 컴포넌트
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

const AdminMypage = () => {
	const [adminData, setAdminData] = useState(null);

	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/admin/mypage', {
					withCredentials: true,
				});
				setAdminData(response.data);
			} catch (error) {
				console.error('Admin 데이터 로딩 중 오류:', error);
			}
		};

		fetchAdminData();
	}, []);

	if (!adminData) return <div>로딩 중...</div>;

	return (
		<Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
			<Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
				내 정보 보기
			</Typography>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={4}>
					<Avatar
						src="/path/to/admin-profile-image.jpg"
						sx={{ width: 128, height: 128, margin: 'auto' }}
					/>
				</Grid>
				<Grid item xs={8}>
					<form>
						<ReadOnlyTextField
							label="관리자 ID"
							name="adminId"
							value={adminData.adminId}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						<ReadOnlyTextField
							label="관리자 이름"
							name="adminName"
							value={adminData.adminName}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						<ReadOnlyTextField
							label="관리자 이메일"
							name="adminEmail"
							value={adminData.adminEmail}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
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
