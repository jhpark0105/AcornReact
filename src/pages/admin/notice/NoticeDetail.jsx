import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NoticeDetail() {
	const navigate = useNavigate();
	const params = useParams();
	const noticeNo = params.no;
	const [notice, setNotice] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/admin-notice/${noticeNo}`)
			.then((response) => {
				setNotice(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error searching notice: ', error);
				alert('공지사항을 불러오는 도중 오류가 발생했습니다.');
			});
	}, [noticeNo]);

	return (
		<>
			{/* Card 컴포넌트: 최소 너비 650px, 가운데 정렬, 상단 마진 4단위 */}
			<Card sx={{ minWidth: 650, margin: 'auto', marginTop: 4 }}>
				<CardContent>
					{/* Typography: h5 크기, 하단에 여백 추가 */}
					<Typography variant="h5" gutterBottom>
						{notice.noticeTitle}
					</Typography>
					<Grid container>
						{/* Grid 항목: 전체 너비의 6/12 (50%) 차지 */}
						<Grid item xs={6}>
							<Typography color="text.secondary"># {notice.noticeNo}</Typography>
						</Grid>
						<Grid item xs={6} sx={{ textAlign: 'right' }}>
							<Typography color="text.secondary">작성일: {notice.noticeReg}</Typography>
						</Grid>
					</Grid>
					{/* Divider: 상하 마진 2단위 */}
					<Divider sx={{ my: 2 }} />
					{/* Typography: 내용에 줄바꿈 유지 */}
					<Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
						{notice.noticeContent}
					</Typography>
				</CardContent>
			</Card>
			{/* Stack: 자식 요소들 사이 간격 2단위, 가로 방향 정렬, 상단 마진 20px, 중앙 정렬 */}
			<Stack spacing={2} direction="row" sx={{ marginTop: '20px', justifyContent: 'center' }}>
				{/* 이전 번호가 없으면 버튼 비활성화, 있으면 이전 버튼 클릭 가능 */}
				<Button variant="contained" onClick={() => navigate(`/admin/notice/${notice.prevNo}`)} disabled={!notice.prevNo}>
					이전
				</Button>
				<Button variant="contained" onClick={() => navigate('/admin/notice')}>
					목록
				</Button>
				{/* 다음 번호가 없으면 버튼 비활성화, 있으면 다음 버튼 클릭 가능 */}
				<Button variant="contained" onClick={() => navigate(`/admin/notice/${notice.nextNo}`)} disabled={!notice.nextNo}>
					다음
				</Button>
			</Stack>
		</>
	);
}
