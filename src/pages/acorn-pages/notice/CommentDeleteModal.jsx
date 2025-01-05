import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default function CommentDeleteModal({ open, handleClose, handleConfirmDelete }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          댓글을 삭제하시겠습니까?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            삭제
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}