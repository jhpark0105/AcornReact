import React from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';

/**
 * 삭제 확인 모달
 * @param {boolean} open - 모달의 열림/닫힘 상태
 * @param {function} handleClose - 모달 닫기 함수
 * @param {function} handleConfirmDelete - 삭제 확인 시 호출되는 함수
 * @param {string} noticeNo - 삭제할 공지번호
 */
 
const DeleteConfirmationModal = ({ open, handleClose, handleConfirmDelete, noticeNo }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          삭제 확인
        </Typography>
        <Typography id="modal-modal-description" sx={{ mb: 2 }}>
          정말로 {noticeNo}번 공지사항을 삭제하시겠습니까?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            삭제
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
            취소
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;