import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, Avatar, TextField, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// readonly 상태의 TextField를 위한 커스텀 스타일 컴포넌트
const ReadOnlyTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // 기본 테두리 색상
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // 호버 시 테두리 색상 변경 방지
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // 포커스 시 테두리 색상 변경 방지
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', // 텍스트 색상 유지
    cursor: 'default', // 커서 스타일 변경
  },
});

const MypageView = () => {
  const navigate = useNavigate();
  const [managerData, setManagerData] = useState(null);
  
  // 컴포넌트 렌더링 후 매니저 데이터 갖고옴
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
            <ReadOnlyTextField
              label="지점명"
              name="branchName"
              value={managerData.branchName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="지점 코드"
              name="branchCode"
              value={managerData.branchCode}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 이름"
              name="managerName"
              value={managerData.managerName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 연락처"
              name="managerTel"
              value={managerData.managerTel}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 이메일"
              name="managerMail"
              value={managerData.managerMail}
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

export default MypageView;