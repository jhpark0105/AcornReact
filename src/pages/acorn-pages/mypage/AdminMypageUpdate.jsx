import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const AdminMypageUpdate = ({ onUpdateSuccess }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(null); // 관리자 데이터 상태
	const [showModal, setShowModal] = useState(false); // 수정 확인 모달 표시 상태
	const [showDeleteModal, setShowDeleteModal] = useState(false); // 탈퇴 확인 모달 표시 상태

	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/admin/mypage', {
					withCredentials: true, // 인증 쿠키 포함
				});
				setFormData(response.data);
			} catch (error) {
				console.error('데이터 로딩 중 오류:', error);
				toast.error('데이터 로딩 중 오류가 발생했습니다.');
			}
		};

		fetchAdminData();
	}, []);

	const handleUpdate = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const confirmUpdate = async () => {
		try {
			const updatedData = { ...formData };

			console.log('Updated data sent to server:', updatedData);

			await axios.put(`http://localhost:8080/admin/${formData.adminId}`, updatedData, {
				withCredentials: true,
			});

			toast.success('수정이 완료되었습니다.'); // 토스트 표시

			setTimeout(() => {
				navigate('/main/admin/mypage/view'); // 수정 완료 후 마이페이지로 이동
			}, 4000); // 2초 후 페이지 이동
		} catch (error) {
			console.error('정보 수정 중 오류:', error);
			toast.error('수정에 실패했습니다. 다시 시도해주세요.');
		} finally {
			setShowModal(false); // 모달 닫기
		}
	};

	const handleDelete = () => {
		setShowDeleteModal(true);
	};

	const confirmDelete = async () => {
		try {
			await axios.delete(`http://localhost:8080/admin/${formData.adminId}`, {
				withCredentials: true, // 인증 쿠키 포함
			});
			setShowDeleteModal(false); // 모달 닫기
			setTimeout(() => {
				navigate('/');
			}, 1000);
		} catch (error) {
			console.error('계정 탈퇴 중 오류:', error);
			toast.error('탈퇴에 실패했습니다. 다시 시도해주세요.');
			setShowDeleteModal(false); // 모달 닫기
		}
	};

	if (!formData) return <div>로딩 중...</div>;

	return (
		<>
			<ToastContainer />
			<Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
				{showModal && (
					<ConfirmModal
						message="정보를 수정하시겠습니까?"
						onConfirm={confirmUpdate}
						onCancel={() => setShowModal(false)}
					/>
				)}
				{showDeleteModal && (
					<ConfirmModal
						message="정말로 탈퇴하시겠습니까?"
						onConfirm={confirmDelete}
						onCancel={() => setShowDeleteModal(false)}
					/>
				)}
				<Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
					내 정보 수정
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<form onSubmit={handleUpdate}>
							<ReadOnlyTextField
								label="관리자 ID"
								name="adminId"
								value={formData.adminId}
								fullWidth
								margin="normal"
								InputProps={{ readOnly: true }}
								disabled
							/>
							<TextField
								label="관리자 이름"
								name="adminName"
								value={formData.adminName}
								onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="관리자 연락처"
								name="adminPhone"
								value={formData.adminPhone}
								onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="관리자 이메일"
								name="adminEmail"
								value={formData.adminEmail}
								onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
								fullWidth
								margin="normal"
							/>
						</form>
					</Grid>
				</Grid>
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
					<Button type="submit" variant="contained" color="primary" onClick={handleUpdate} sx={{ mr: 2 }}>
						수정하기
					</Button>
					<Button variant="contained" color="error" onClick={handleDelete} sx={{ mr: 2 }}>
						탈퇴하기
					</Button>
					<Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
						뒤로가기
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default AdminMypageUpdate;
