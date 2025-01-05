import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Divider, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteConfirmationModal from './NoticeDelete'; // 공지사항 삭제 모달
import CommentDeleteModal from './CommentDeleteModal'; // 댓글 삭제 모달
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const noticeNo = params.no;
  const [notice, setNotice] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // 댓글 관련 상태
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(''); // 새 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(''); // 수정 중인 댓글 내용
  const [deleteCommentId, setDeleteCommentId] = useState(null); // 삭제할 댓글 ID
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState(false); // 댓글 삭제 모달 상태

  // 공지사항 데이터와 댓글 데이터를 가져오기
  useEffect(() => {
    // 공지사항 데이터 가져오기
    axios
      .get(`http://localhost:8080/notice/${noticeNo}`)
      .then((response) => {
        setNotice(response.data); // 공지사항 데이터 설정
      })
      .catch((error) => {
        toast.error('공지사항을 불러오는 도중 오류가 발생했습니다.');
        console.error('Error fetching notice: ', error);
      });
  
    // 댓글 데이터 가져오기
    axios
      .get(`http://localhost:8080/comment/${noticeNo}`)
      .then((response) => {
        setComments(response.data); // 댓글 상태 설정
        console.log('댓글 데이터:', response.data); // 디버깅용 로그
      })
      .catch((error) => {
        toast.error('댓글을 불러오는 도중 오류가 발생했습니다.');
        console.error('Error fetching comments: ', error);
      });
  }, [noticeNo]);  

  // 댓글 작성 입력창 초기화
  useEffect(() => {
    setNewComment(''); // 공지사항 번호 변경 시 댓글 입력창 초기화
  }, [noticeNo]);

  // 댓글 작성
  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.warning('댓글 내용을 입력해주세요.');
      return;
    }

    axios.post('http://localhost:8080/comment', {
      noticeNo,
      parentNo: null, // 기본 댓글
      authorType: 'ADMIN', // 관리자 고정
      authorId: 1, // 예: 관리자의 ID (고정값 또는 인증 정보에서 가져오기)
      content: newComment,
    }, {
      headers: {
        Authorization: 'Bearer <your-token>', // 관리자 인증 토큰 추가
      },
    })
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]); // 댓글 목록 업데이트
        setNewComment(''); // 입력창 초기화
        toast.success('댓글이 작성되었습니다.');
      })
      .catch((error) => {
        toast.error('댓글 작성 중 오류가 발생했습니다.');
        console.error('Error adding comment: ', error);
      });
  };

  // 댓글 수정
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentNo); // 수정 중인 댓글 ID 설정
    setEditingContent(comment.content); // 댓글 내용을 수정 입력창에 세팅
  };

  // 댓글 저장
  const handleSaveComment = (commentNo) => {
    axios.put(`http://localhost:8080/comment/${commentNo}`, { content: editingContent })
      .then(() => {
        // 수정 후 전체 댓글 다시 가져오기
        axios.get(`http://localhost:8080/comment/${noticeNo}`).then((response) => {
          setComments(response.data);
        });
        setEditingCommentId(null);
        setEditingContent('');
        toast.success('댓글이 저장되었습니다.');
      })
      .catch((error) => {
        toast.error('댓글 수정 중 오류가 발생했습니다.');
        console.error('Error editing comment:', error);
      });
  };

  // 댓글 삭제 모달 열기
  const handleOpenDeleteCommentModal = (commentNo) => {
    setDeleteCommentId(commentNo);
    setOpenDeleteCommentModal(true);
  };

  // 댓글 삭제 모달 닫기
  const handleCloseDeleteCommentModal = () => {
    setDeleteCommentId(null);
    setOpenDeleteCommentModal(false);
  };

  // 댓글 삭제
  const handleConfirmDeleteComment = () => {
    axios
      .delete(`http://localhost:8080/comment/${deleteCommentId}`, {
        headers: {
          Authorization: 'Bearer <your-token>',
        },
      })
      .then(() => {
        toast.success('댓글이 삭제되었습니다.');
        handleCloseDeleteCommentModal();
  
        // 삭제 후 댓글 목록 새로고침
        axios
          .get(`http://localhost:8080/comment/${noticeNo}`)
          .then((response) => {
            setComments(response.data); // 최신 댓글 상태로 업데이트
          })
          .catch((error) => {
            toast.error('댓글 목록을 다시 불러오는 도중 오류가 발생했습니다.');
            console.error('Error fetching comments:', error);
          });
      })
      .catch((error) => {
        toast.error('댓글 삭제 중 오류가 발생했습니다.');
        console.error('Error deleting comment:', error);
        handleCloseDeleteCommentModal();
      });
  };

  // 답글 작성 처리 함수
  const handleReplyComment = (parentCommentId, replyContent) => {
    if (!replyContent.trim()) return;
  
    axios
      .post(`http://localhost:8080/comment`, {
        noticeNo: noticeNo,
        content: replyContent,
        parentNo: parentCommentId,
        authorType: 'ADMIN', // 예: 관리자 고정
        authorId: 1, // 예: 관리자의 ID (고정값 또는 인증 정보에서 가져오기)
      })
      .then((response) => {
        const newReply = response.data;
  
        // 댓글 트리 업데이트
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.commentNo === parentCommentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReply],
              };
            }
            return comment;
          })
        );
  
        toast.success('답글이 작성되었습니다.');
      })
      .catch((error) => {
        toast.error('답글 작성 중 오류가 발생했습니다.');
        console.error('Error adding reply:', error);
      });
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <Box key={comment.commentNo} sx={{ marginLeft: comment.parentNo ? 1 : 0, marginBottom: 2 }}>
        {/* 댓글 본문 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            {comment.parentNo && (
              <Typography variant="body2" sx={{ color: 'gray', display: 'inline-block', marginRight: 1 }}>
                ↳
              </Typography>
            )}
            {editingCommentId === comment.commentNo ? (
              <TextField
                variant="outlined"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                sx={{
                  width: '96%',
                  marginRight: 2,
                }}
              />
            ) : (
              <Typography variant="body1" sx={{ display: 'inline-block' }}>
                {comment.content}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              작성자: {comment.authorType === 'CUSTOMER' ? '고객' : '관리자'} |{' '}
              작성일: {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss')}
              {comment.updatedAt &&
                new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime() && (
                  <> (수정)</>
                )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {comment.authorType === 'ADMIN' ? (
              // 관리자 댓글에 수정/삭제 버튼 표시
              editingCommentId === comment.commentNo ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSaveComment(comment.commentNo)}
                  >
                    저장
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingContent('');
                    }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditComment(comment)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenDeleteCommentModal(comment.commentNo)}
                  >
                    삭제
                  </Button>
                </>
              )
            ) : (
              // 고객 댓글에 답글 버튼 표시
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() =>
                  setComments((prevComments) =>
                    prevComments.map((c) =>
                      c.commentNo === comment.commentNo
                        ? { ...c, isReplying: !c.isReplying } // isReplying 상태 토글
                        : c
                    )
                  )
                }
              >
                답글
              </Button>
            )}
          </Box>
        </Box>
  
        {/* 답글 작성 인풋박스 */}
        {comment.isReplying && comment.authorType === 'CUSTOMER' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginTop: 2,
              marginLeft: 1, // 들여쓰기 효과
            }}
          >
            <Typography variant="body2" sx={{ flexShrink: 0 }}>
              ↳
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              placeholder="답글을 입력하세요"
              value={comment.replyContent || ''}
              onChange={(e) =>
                setComments((prevComments) =>
                  prevComments.map((c) =>
                    c.commentNo === comment.commentNo
                      ? { ...c, replyContent: e.target.value }
                      : c
                  )
                )
              }
              sx={{
                flexGrow: 1,
                maxWidth: '100%', // 최대 너비 제한
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                handleReplyComment(comment.commentNo, comment.replyContent || '');
                setComments((prevComments) =>
                  prevComments.map((c) =>
                    c.commentNo === comment.commentNo
                      ? { ...c, isReplying: false, replyContent: '' }
                      : c
                  )
                );
              }}
            >
              답글 작성
            </Button>
          </Box>
        )}
  
        {/* 대댓글(답글) 렌더링 */}
        {comment.replies && comment.replies.length > 0 && (
          <Box sx={{ marginLeft: 1, marginTop: 1 }}>{renderComments(comment.replies)}</Box>
        )}
      </Box>
    ));
  };  

  return (
    <Box sx={{ position: 'relative', padding: 4 }}>
      {/* 공지사항 삭제 버튼 */}
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpenDeleteModal(true)}
        sx={{
          position: 'absolute',
          top: 16,
          right: 32, // 삭제 버튼을 항상 우측 상단에 고정
        }}
      >
        삭제
      </Button>

      {/* 공지사항 상세 */}
      <Card sx={{ minWidth: 650, margin: 'auto', marginTop: 4 }}>
        <CardContent>
          {/* 공지 제목 */}
          <Typography variant="h5" gutterBottom>
            {notice.noticeTitle}
          </Typography>

          {/* 공지번호와 작성일 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 1,
            }}
          >
            {/* 공지번호 */}
            <Typography color="text.secondary"># {notice.noticeNo}</Typography>

            {/* 작성일 */}
            <Typography color="text.secondary" sx={{ textAlign: 'right' }}>
              작성일: {notice.noticeReg}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 공지 내용 */}
          <Typography style={{ whiteSpace: 'pre-line' }}>
            {notice.noticeContent}
          </Typography>

          {/* 공지 이미지 */}
          {notice.noticeImagePath && (
            <Box
              component="img"
              src={notice.noticeImagePath}
              alt="공지 이미지"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: 2,
                marginTop: 2,
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* 댓글 섹션 */}
      <Card sx={{ minWidth: 650, margin: 'auto', marginTop: 4, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          댓글
        </Typography>
        <Divider sx={{ my: 1 }} />

        {/* 댓글 트리 렌더링 */}
        {renderComments(comments)}

        {/* 새로운 댓글 작성 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <TextField
            fullWidth
            sx={{ flexGrow: 1, marginRight: 1, maxWidth: '100%' }}
            label="댓글을 입력하세요"
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              flexShrink: 0,
              minWidth: '90px',
              padding: '6px 8px',
            }}
            onClick={handleAddComment}
          >
            댓글 작성
          </Button>
        </Box>
      </Card>

      {/* 이전, 목록, 다음 버튼 */}
      <Stack
        spacing={2}
        direction="row"
        sx={{ marginTop: '20px', justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/main/notice/${notice.prevNo}`)}
          disabled={!notice.prevNo}
        >
          이전
        </Button>
        <Button variant="contained" onClick={() => navigate('/main/notice')}>
          목록
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/main/notice/${notice.nextNo}`)}
          disabled={!notice.nextNo}
        >
          다음
        </Button>
      </Stack>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirmDelete={() => {
          axios.delete(`http://localhost:8080/notice/${noticeNo}`).then(() => {
            setOpenDeleteModal(false);
            navigate('/main/notice', { state: { message: '공지사항 삭제 성공!' } });
          });
        }}
        noticeNo={noticeNo}
      />

      {/* 댓글 삭제 확인 모달 */}
      <CommentDeleteModal
        open={openDeleteCommentModal}
        handleClose={handleCloseDeleteCommentModal}
        handleConfirmDelete={handleConfirmDeleteComment}
      />

      <ToastContainer />
    </Box>
  );
}