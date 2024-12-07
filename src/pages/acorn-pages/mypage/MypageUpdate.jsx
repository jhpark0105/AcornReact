import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Avatar, TextField, Button, Grid, Box, Typography } from '@mui/material';
import ConfirmModal from './ConfirmModal';  // 수정 확인 모달

const MypageUpdate = () => {
  const { branchCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/manager/mypage/update`, formData, {
        withCredentials: true // 쿠키 포함 설정
      });
      setShowModal(false);
      navigate(`/main/manager/mypage/view/${branchCode}`);
    } catch (error) {
      console.error('매니저 수정 중 오류:', error);
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
            <TextField label="지점명" name="branchName" value={formData.branchName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <TextField label="지점 코드" name="branchCode" value={formData.branchCode} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <TextField label="관리자 이름" name="managerName" value={formData.managerName} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="관리자 연락처" name="managerTel" value={formData.managerTel} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="관리자 이메일" name="managerMail" value={formData.managerMail} onChange={handleChange} fullWidth margin="normal" />
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
