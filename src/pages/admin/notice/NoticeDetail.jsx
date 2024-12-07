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
              <Typography color="text.secondary">작성일: {notice.noticeReg}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>{notice.noticeContent}</Typography>
        </CardContent>
      </Card>
      <Stack spacing={2} direction="row" sx={{ marginTop: '20px', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate(`/admin/notice/${notice.prevNo}`)} disabled={!notice.prevNo}>
          이전
        </Button>
        <Button variant="contained" onClick={() => navigate('/admin/notice')}>
          목록
        </Button>
        <Button variant="contained" onClick={() => navigate(`/admin/notice/${notice.nextNo}`)} disabled={!notice.nextNo}>
          다음
        </Button>
      </Stack>
    </>
  );
}
