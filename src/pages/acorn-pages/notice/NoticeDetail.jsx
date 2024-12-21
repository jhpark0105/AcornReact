import axios from 'axios'; // HTTP 요청을 위해 axios 라이브러리 임포트
import { useEffect, useState } from 'react'; // React 상태 관리와 효과 훅 사용
import { ToastContainer, toast } from 'react-toastify'; // Toast 메시지를 위한 라이브러리 임포트
import { useNavigate, useParams } from 'react-router-dom'; // 라우팅과 URL 파라미터를 처리하기 위한 라이브러리
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteConfirmationModal from './NoticeDelete'; // 삭제 확인 모달 컴포넌트 임포트
import 'react-toastify/dist/ReactToastify.css'; // Toastify 기본 스타일

export default function NoticeDetail() {
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const params = useParams(); // URL에서 파라미터를 가져오기 위한 훅
  const noticeNo = params.no; // URL에서 공지 번호 추출
  const [notice, setNotice] = useState({}); // 공지 데이터를 저장할 상태
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 삭제 확인 모달 열림 상태 관리

  useEffect(() => {
    axios.get(`http://localhost:8080/notice/${noticeNo}`) // 공지 상세 데이터를 가져오기 위한 API 호출
      .then((response) => {
        console.log("Notice Data:", response.data); // 전체 notice 객체를 직접 확인
        console.log("noticeImagePath:", response.data.noticeImagePath); // 이미지 경로를 확인
        setNotice(response.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        toast.error('공지사항을 불러오는 도중 오류가 발생했습니다.');
        console.error('Error searching notice: ', error);
      });
  }, [noticeNo]); // noticeNo가 변경될 때마다 실행

  // 삭제 확인 모달 열기 함수
  const handleDeleteClick = () => {
    setOpenDeleteModal(true); // 모달 열림 상태를 true로 변경
  };

  // 삭제 확인 후 실행되는 함수
  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8080/notice/${noticeNo}`) // 공지 삭제 API 호출
      .then((res) => {
        if (res.data.isSuccess) {
          setOpenDeleteModal(false); // 모달 닫기
          navigate('/main/notice', { state: { message: '공지사항 삭제 성공!' } }); // 상태와 함께 목록 페이지로 이동
        }
      })
      .catch((error) => {
        toast.error("공지사항 삭제 중 오류가 발생했습니다.");
        console.error('Error deleting notice: ', error);
      });
  };

  return (
    <Box sx={{ position: 'relative', padding: 4 }}>
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteClick} // 삭제 버튼 클릭 시 모달 열기
        sx={{ position: 'absolute', top: 16, right: 32 }}
      >
        삭제
      </Button>

      {/* 공지 상세 카드 */}
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
          
          <Grid container spacing={2}>
          {/* 왼쪽: 공지 내용 */}
          <Grid item xs={notice.noticeImagePath ? 8 : 12}> {/* 이미지가 있을 경우 8칸, 없으면 12칸 */}
            <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
              {notice.noticeContent}
            </Typography>
          </Grid>

          {/* 오른쪽: 이미지 */}
          {notice.noticeImagePath && (
            <Grid item xs={4}> {/* 이미지가 있는 경우 오른쪽에 4칸 사용 */}
              <Box
                component="img"
                src={`http://localhost:8080${notice.noticeImagePath}`} // 서버 URL + 이미지 경로
                alt="공지 이미지"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Grid>
          )}
        </Grid>
        </CardContent>
      </Card>

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
        open={openDeleteModal} // 모달 열림 상태
        handleClose={() => setOpenDeleteModal(false)} // 모달 닫기 함수
        handleConfirmDelete={handleConfirmDelete} // 삭제 확인 함수
        noticeNo={noticeNo} // 삭제 대상 공지 번호 전달
      />

      <ToastContainer />
    </Box>
  );
}