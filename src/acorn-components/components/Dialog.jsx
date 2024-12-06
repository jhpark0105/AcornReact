import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
const CustomDialog = ({ title, content, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomDialog;