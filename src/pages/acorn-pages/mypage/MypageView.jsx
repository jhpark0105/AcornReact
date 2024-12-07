import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, Avatar, TextField, Box, Typography } from '@mui/material';

const MypageView = () => {
  //const { branchCode } = useParams();
  const navigate = useNavigate();
  const [managerData, setManagerData] = useState(null);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/manager/mypage`, {
          withCredentials: true // 크로스 도메인 요청 시 쿠키 포함
        });
        setManagerData(response.data);
      } catch (error) {
        console.error('데이터 로딩 중 오류:', error);
      }
    };

    fetchManagerData();
  },[]);

  if (!managerData) return <div>로딩 중...</div>;

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
      <Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
        마이페이지 보기
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={4}>
          <Avatar
            src="/path/to/profile-image.jpg" // 실제 이미지 경로 설정
            sx={{ width: 128, height: 128, margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          <form>
            <TextField
              label="지점명"
              name="branchName"
              value={managerData.branchName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="지점 코드"
              name="branchCode"
              value={managerData.branchCode}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="관리자 이름"
              name="managerName"
              value={managerData.managerName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="관리자 연락처"
              name="managerTel"
              value={managerData.managerTel}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="관리자 이메일"
              name="managerMail"
              value={managerData.managerMail}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </form>
        </Grid>
      </Grid>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Box> */}
    </Paper>
  );
};

export default MypageView;
