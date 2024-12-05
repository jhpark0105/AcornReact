import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function NoticeDetail() {
	const params = useParams();
	const noticeNo = params.no;

	const [notice, setNotice] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/notice/${noticeNo}`)
			.then((response) => {
				setNotice(response.data);
			})
			.catch((error) => {
				console.error('Error searching notice: ', error);
				alert('서비스 정보를 불러오는 데 오류가 발생했습니다.');
			});
	}, [noticeNo]);

	return (
		<Card sx={{ minWidth: 650, margin: 'auto', marginTop: 4 }}>
			<CardContent>
				<Typography variant="h5" gutterBottom>
					{notice.noticeTitle}
				</Typography>
				<Grid container>
					<Grid item xs={6}>
						<Typography color="text.secondary"># {notice.noticeNo}</Typography>
					</Grid>
					<Grid item xs={6} sx={{ textAlign: 'right' }}>
						<Typography color="text.secondary">작성일자: {notice.noticeReg}</Typography>
					</Grid>
				</Grid>
				<Divider sx={{ my: 2 }} />
				<Typography gutterBottom>{notice.noticeContent}</Typography>
			</CardContent>
		</Card>
	);
}
