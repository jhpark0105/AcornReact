import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';  // ToastContainer 임포트
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteConfirmationModal from './NoticeDelete';  // 모달 컴포넌트 임포트
import 'react-toastify/dist/ReactToastify.css'; // Toastify 스타일 import

export default function NoticeDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const noticeNo = params.no;
  const [notice, setNotice] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 모달 상태 관리

  useEffect(() => {
    axios
      .get(`http://localhost:8080/notice/${noticeNo}`)
      .then((response) => {
        setNotice(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error searching notice: ', error);
        alert('공지사항을 불러오는 도중 오류가 발생했습니다.');
      });
  }, [noticeNo]);

  // 삭제 확인 모달 열기
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  // 삭제 확인 후 처리
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/notice/${noticeNo}`)
      .then((res) => {
        if (res.data.isSuccess) {
          setOpenDeleteModal(false); // 모달 닫기
          navigate('/main/notice', { state: { message: '공지사항 삭제 성공!' } }); // 상태 전달
        }
      })
      .catch((error) => {
        toast.error("공지사항 삭제 중 오류가 발생했습니다.");  // toast 메시지
        console.error('Error deleting notice: ', error);
      });
  };

  return (
    <Box sx={{ position: 'relative', padding: 4 }}>
      {/* 삭제 버튼 */}
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteClick} // 삭제 버튼 클릭 시 모달 열기
        sx={{ position: 'absolute', top: 16, right: 32 }}
      >
        삭제
      </Button>

      {/* Card 컴포넌트 */}
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
          <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
            {notice.noticeContent}
          </Typography>
        </CardContent>
      </Card>

      {/* 이전, 목록, 다음 버튼 */}
      <Stack spacing={2} direction="row" sx={{ marginTop: '20px', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate(`/main/notice/${notice.prevNo}`)} disabled={!notice.prevNo}>
          이전
        </Button>
        <Button variant="contained" onClick={() => navigate('/main/notice')}>
          목록
        </Button>
        <Button variant="contained" onClick={() => navigate(`/main/notice/${notice.nextNo}`)} disabled={!notice.nextNo}>
          다음
        </Button>
      </Stack>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)} // 모달 닫기
        handleConfirmDelete={handleConfirmDelete} // 삭제 확인 시 호출되는 함수
        noticeNo={noticeNo} // 공지번호 전달
      />

      {/* ToastContainer 추가 */}
      <ToastContainer /> {/* ToastContainer 추가! */}
    </Box>
  );
}