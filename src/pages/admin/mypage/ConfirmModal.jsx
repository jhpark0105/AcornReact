import React from 'react';
import { 
  Dialog, // 전체 모달 컴포넌트
  DialogActions, // 모달 하단의 버튼 영역
  DialogContent, // 모달의 본문 내용 영역
  DialogContentText, // 본문 내용 텍스트 스타일링
  DialogTitle, // 모달의 제목 영역
  Button // 버튼 컴포넌트
} from '@mui/material';

// ConfirmModal 컴포넌트 정의
export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Dialog
      open={true} // 모달을 항상 열려 있도록 설정
      onClose={onCancel} // 모달 바깥을 클릭하거나 닫을 때 실행될 핸들러
      aria-labelledby="alert-dialog-title" // 접근성을 위한 제목 ID 설정
      aria-describedby="alert-dialog-description" // 접근성을 위한 설명 ID 설정
      PaperProps={{ // 모달의 스타일 지정
        style: {
          borderRadius: 12, // 모서리를 둥글게 설정
          padding: '16px' // 내부 여백 설정
        }
      }}
    >
      {/* 모달의 제목 */}
      <DialogTitle 
        id="alert-dialog-title" 
        style={{ textAlign: 'center', fontWeight: 'bold' }} // 중앙 정렬 및 굵은 글씨체
      >
        확인
      </DialogTitle>
      
      {/* 모달의 본문 내용 */}
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description" 
          style={{ 
            textAlign: 'center', // 텍스트 중앙 정렬
            color: 'rgba(0, 0, 0, 0.87)', // 텍스트 색상
            fontSize: '1rem' // 글씨 크기 설정
          }}
        >
          {message} {/* 부모 컴포넌트에서 전달받은 메시지 표시 */}
        </DialogContentText>
      </DialogContent>
      
      {/* 모달 하단의 버튼 영역 */}
      <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
        {/* "확인" 버튼 */}
        <Button 
          onClick={onConfirm} // 확인 버튼 클릭 시 실행될 핸들러
          variant="contained" // 버튼 스타일 (채워진 형태)
          color="primary" // 버튼 색상 (primary)
          autoFocus // 버튼에 기본 포커스 설정
          style={{ minWidth: '120px' }} // 버튼의 최소 너비
        >
          확인
        </Button>
        
        {/* "취소" 버튼 */}
        <Button 
          onClick={onCancel} // 취소 버튼 클릭 시 실행될 핸들러
          variant="outlined" // 버튼 스타일 (외곽선 형태)
          color="secondary" // 버튼 색상 (secondary)
          style={{ minWidth: '120px' }} // 버튼의 최소 너비
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
