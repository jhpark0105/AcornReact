import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography, Container, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NoticeCreate() {
	const navigate = useNavigate();

	// 입력 폼 상태 초기화
	const [formData, setFormData] = useState({
		noticeTitle: '',
		noticeCheck: false,
		noticeContent: ''
	});

	// 입력 필드 변경 핸들러
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			// 타입이 checkbox일 경우 체크박스의 값, 아닐 경우 해당 필드의 값 할당
			//   noticeTitle: formData.noticeTitle
			//   noticeCheck: formData.noticeCheck
			//   noticeContent: formData.noticeContent
			[name]: type === 'checkbox' ? checked : value
		});
	};

	// 폼 제출을 처리하는 핸들러
	const handleSubmit = (e) => {
		e.preventDefault(); // submit 기본동작 차단
		// 제목과 내용이 비어있는지 확인
		if (!formData.noticeTitle.trim().length || !formData.noticeContent.trim().length) {
			toast.error('제목과 내용을 모두 입력해주세요.');
			return;
		}
		console.log('Sending data:', formData); // 전송하는 데이터 확인

		// 공지 작성 ajax 요청
		axios
			.post('http://localhost:8080/admin-notice', formData)
			.then((response) => {
				if (response.data.isSuccess) {
					console.log(response.data);
					console.log(response.data.message);
					// 요청 성공 시 최신 공지사항 번호 반환
					return axios.get('http://localhost:8080/admin-notice/latest');
				} else {
					throw new Error(response.data.message);
				}
			})
			.then((latestNoResponse) => {
				const latestNoticeNo = latestNoResponse.data.noticeNo;
				// 생성된 공지사항 상세페이지로 이동
				navigate(`/admin/notice/${latestNoticeNo}`);
			})
			.catch((err) => {
				console.error('notice insert:', err);
			});
	};

	return (
		<>
			<ToastContainer /> {/* 토스트 컨테이너 */}
			<Container maxWidth="sm">
				{/* 최대 너비 'small'로 제한 */}
				{/* elveation: 그림자 깊이, p: 패딩 단위, mt: margin-top 단위 */}
				<Paper elevation={3} sx={{ p: 4, mt: 4 }}>
					{/* gutterBottom: 일정한 margin-bottom 추가 */}
					<Typography variant="h5" gutterBottom>
						공지사항 작성
					</Typography>
					{/* form과 같은 역할, noValidate: submit 시 form데이터의 유효성검사 안함 */}
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal" // 기본 마진 적용
							required // 필수 입력필드 표시
							fullWidth // 너비 100%
							id="noticeTitle"
							label="공지 제목"
							name="noticeTitle"
							value={formData.noticeTitle}
							onChange={handleChange}
							autoFocus // 페이지 렌더링 시 자동 포커스
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.noticeCheck} onChange={handleChange} name="noticeCheck" />}
							label="중요한 공지"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="noticeContent"
							label="본문"
							id="noticeContent"
							multiline // 여러 줄 입력 가능
							rows={4} // 기본 4줄 높이
							value={formData.noticeContent}
							onChange={handleChange}
						/>
						<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
							{/* 테두리선 스타일 버튼, 기능은 history.back()과 유사 */}
							<Button type="button" variant="outlined" onClick={() => navigate(-1)}>
								취소
							</Button>
							{/* 색이 채워진 스타일 버튼 */}
							<Button type="submit" variant="contained">
								작성
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</>
	);
}
