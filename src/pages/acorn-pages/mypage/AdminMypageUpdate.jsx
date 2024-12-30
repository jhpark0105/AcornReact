import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';

/**
 * ReadOnlyTextField 스타일링
 * 특정 필드를 읽기 전용으로 표시하며 사용자 입력을 방지
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
 * AdminMypageUpdate 컴포넌트
 * 관리자 마이페이지를 수정할 수 있는 폼을 렌더링
 */
const AdminMypageUpdate = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(null); // 관리자 데이터 상태
	const [showModal, setShowModal] = useState(false); // 수정 확인 모달 표시 상태

	/**
	 * 컴포넌트가 마운트될 때 관리자 데이터를 서버에서 가져옴
	 */
	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/admin/mypage', {
					withCredentials: true, // 인증 쿠키 포함
				});
				setFormData(response.data);
			} catch (error) {
				console.error('데이터 로딩 중 오류:', error);
			}
		};

		fetchAdminData();
	}, []);

	/**
	 * 입력 필드 변경 처리 함수
	 * 사용자의 입력값을 formData 상태에 반영
	 * @param {Object} e - 입력 이벤트 객체
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/**
	 * 수정 버튼 클릭 시 실행
	 * 수정 확인 모달 표시
	 * @param {Object} e - 클릭 이벤트 객체
	 */
	const handleUpdate = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	/**
	 * 수정 확인 모달에서 확인 버튼 클릭 시 실행
	 * 서버에 PUT 요청을 보내 수정 내용을 저장하고 완료 후 이전 페이지로 이동
	 */
	const confirmUpdate = async () => {
		try {
			await axios.put(`http://localhost:8080/admin/${formData.adminId}`, formData, {
				withCredentials: true, // 인증 쿠키 포함
			});
			setShowModal(false);
			navigate('/main/admin/mypage/view'); // 수정 완료 후 이동할 페이지
		} catch (error) {
			console.error('관리자 수정 중 오류:', error);
		}
	};

	// 데이터 로딩 중 상태 표시
	if (!formData) return <div>로딩 중...</div>;

	return (
		<Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
			{/** 수정 확인 모달 */}
			{showModal && (
				<ConfirmModal
					message="관리자 정보를 수정하시겠습니까?"
					onConfirm={confirmUpdate}
					onCancel={() => setShowModal(false)}
				/>
			)}
			{/** 페이지 제목 */}
			<Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
				내 정보 수정
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<form onSubmit={handleUpdate}>
						{/** 관리자 ID (읽기 전용 필드) */}
						<ReadOnlyTextField
							label="관리자 ID"
							name="adminId"
							value={formData.adminId}
							fullWidth
							margin="normal"
							InputProps={{ readOnly: true }}
							disabled
						/>
						{/** 관리자 이름 입력 필드 */}
						<TextField
							label="관리자 이름"
							name="adminName"
							value={formData.adminName}
							onChange={handleChange}
							fullWidth
							margin="normal"
						/>
						{/** 관리자 연락처 입력 필드 */}
						<TextField
							label="관리자 연락처"
							name="adminTel"
							value={formData.adminTel}
							onChange={handleChange}
							fullWidth
							margin="normal"
						/>
						{/** 관리자 이메일 입력 필드 */}
						<TextField
							label="관리자 이메일"
							name="adminEmail"
							value={formData.adminEmail}
							onChange={handleChange}
							fullWidth
							margin="normal"
						/>
					</form>
				</Grid>
			</Grid>
			{/** 버튼 영역 */}
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<Button type="submit" variant="contained" color="primary" onClick={handleUpdate} sx={{ mr: 2 }}>
					수정하기
				</Button>
				<Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
					뒤로가기
				</Button>
			</Box>
		</Paper>
	);
};

export default AdminMypageUpdate;
