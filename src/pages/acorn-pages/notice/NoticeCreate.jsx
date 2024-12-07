import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography, Container, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NoticeCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    noticeTitle: '',
    noticeCheck: false,
    noticeContent: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.noticeTitle.trim().length || !formData.noticeContent.trim().length) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }
    console.log('Sending data:', formData); // 전송하는 데이터 확인

    axios
      .post('http://localhost:8080/notice', formData)
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data);
          console.log(response.data.message);
          return axios.get('http://localhost:8080/notice/latest');
        } else {
          throw new Error(response.data.message);
        }
      })
      .then((latestNoResponse) => {
        const latestNoticeNo = latestNoResponse.data.noticeNo;
        navigate(`/main/notice/${latestNoticeNo}`);
      })
      .catch((err) => {
        console.error('notice insert:', err);
      });
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            공지사항 작성
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="noticeTitle"
              label="공지 제목"
              name="noticeTitle"
              value={formData.noticeTitle}
              onChange={handleChange}
              autoFocus
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
              multiline
              rows={4}
              value={formData.noticeContent}
              onChange={handleChange}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
                취소
              </Button>
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
