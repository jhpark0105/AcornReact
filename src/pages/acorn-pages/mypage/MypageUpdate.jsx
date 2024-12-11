import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Avatar, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ConfirmModal from './ConfirmModal';  // 수정 확인 모달

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

const MypageUpdate = () => {
  const { branchCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 컴포넌트 렌더링 후 매니저 데이터 갖고옴
  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/manager/mypage`, {
          withCredentials: true // 크로스 도메인 요청 시 쿠키 포함
        });
        setFormData(response.data);
      } catch (error) {
        console.error('데이터 로딩 중 오류:', error);
      }
    };

    fetchManagerData();
  }, []);

  // 수정폼 입력값 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정 버튼 클릭 시, 수정 확인 모달 표시
  const handleUpdate = (e) => {
    e.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)
    setShowModal(true); // 모달 창 띄우기
  };

  // 매니저 데이터 수정 후, 모달 닫고 매니저 view 로 이동
  const confirmUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/manager/mypage/update`, formData, {
        withCredentials: true // 쿠키 포함 설정
      });
      setShowModal(false);
      navigate(`/main/manager/mypage/view`);
    } catch (error) {
      console.error('관리자 수정 중 오류:', error);
    }
  };

  if (!formData) return <div>로딩 중...</div>;

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
      {showModal && (
        <ConfirmModal
          message="관리자 정보를 수정하시겠습니까?"
          onConfirm={confirmUpdate}
          onCancel={() => setShowModal(false)}
        />
      )}
      <Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
        마이페이지 수정
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={4}>
          <Avatar
            src="/path/to/profile-image.jpg"  // 실제 이미지 경로
            sx={{ width: 128, height: 128, margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          <form onSubmit={handleUpdate} className="form-group">
            <ReadOnlyTextField 
              label="지점명" 
              name="branchName" 
              value={formData.branchName} 
              fullWidth 
              margin="normal" 
              InputProps={{ readOnly: true }} 
              disabled
            />
            <ReadOnlyTextField 
              label="지점 코드" 
              name="branchCode" 
              value={formData.branchCode} 
              fullWidth 
              margin="normal" 
              InputProps={{ readOnly: true }} 
              disabled
            />
            <TextField 
              label="관리자 이름" 
              name="managerName" 
              value={formData.managerName} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="관리자 연락처" 
              name="managerTel" 
              value={formData.managerTel} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="관리자 이메일" 
              name="managerMail" 
              value={formData.managerMail} 
              onChange={handleChange} 
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
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Box>
    </Paper>
  );
};

export default MypageUpdate;