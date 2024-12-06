import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NavigateButton({ prevNo, nextNo }) {
  const navigate = useNavigate();

  const handleNavigation = (action) => {
    switch (action) {
      case 'prev':
        if (prevNo) navigate(`/main/notice/${prevNo}`);
        break;
      case 'list':
        navigate('/main/notice');
        break;
      case 'next':
        if (nextNo) navigate(`/main/notice/${nextNo}`);
        break;
      default:
        break;
    }
  };

  return (
    <Stack spacing={2} direction="row" sx={{ marginTop: '20px', justifyContent: 'center' }}>
      <Button variant="contained" onClick={() => handleNavigation('prev')} disabled={!prevNo}>
        이전
      </Button>
      <Button variant="contained" onClick={() => handleNavigation('list')}>
        목록
      </Button>
      <Button variant="contained" onClick={() => handleNavigation('next')} disabled={!nextNo}>
        다음
      </Button>
    </Stack>
  );
}
