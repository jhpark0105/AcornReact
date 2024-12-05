import React from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button 
} from '@mui/material';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Dialog
      open={true}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          borderRadius: 12,
          padding: '16px'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        확인
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description" 
          style={{ 
            textAlign: 'center', 
            color: 'rgba(0, 0, 0, 0.87)', 
            fontSize: '1rem'
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
      <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="primary" 
          autoFocus
          style={{ minWidth: '120px' }}
        >
          확인
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outlined" 
          color="secondary"
          style={{ minWidth: '120px' }}
        >
          취소
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}