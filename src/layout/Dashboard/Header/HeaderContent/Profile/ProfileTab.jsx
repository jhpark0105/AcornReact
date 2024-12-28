import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Paper, Grid, Avatar, TextField, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// ReadOnly 상태의 TextField를 위한 커스텀 스타일 컴포넌트
const ReadOnlyTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
    cursor: 'default',
  },
});

// AdminMypage Component
const AdminMypage = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/mypage', {
          withCredentials: true,
        });
        setAdminData(response.data);
      } catch (error) {
        console.error('Admin 데이터 로딩 중 오류:', error);
      }
    };

    fetchAdminData();
  }, []);

  if (!adminData) return <div>로딩 중...</div>;

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
      <Typography variant="h5" align="center" sx={{ color: '#1976d2', marginBottom: 3 }}>
        어드민 마이페이지
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={4}>
          <Avatar
            src="/path/to/admin-profile-image.jpg"
            sx={{ width: 128, height: 128, margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          <form>
            <ReadOnlyTextField
              label="관리자 ID"
              name="adminId"
              value={adminData.adminId}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 이름"
              name="adminName"
              value={adminData.adminName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 이메일"
              name="adminEmail"
              value={adminData.adminEmail}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
            <ReadOnlyTextField
              label="관리자 연락처"
              name="adminPhone"
              value={adminData.adminPhone}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              disabled
            />
          </form>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={() => alert('수정 기능 준비 중')}>정보 수정</Button>
      </Box>
    </Paper>
  );
};

// ProfileTab Component
export default function ProfileTab() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, path) => {
    console.log(`Navigating to: ${path}`);
    setSelectedIndex(index);
    navigate(path);
  };

  const handleLogout = () => {
    axios.post('http://localhost:8080/logoutProcess', {}, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/main/login');
        }
      })
      .catch(error => {
        console.error("로그아웃 에러 : ", error);
      });
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0, '/main/admin/mypage/update')}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, '/main/admin/mypage/view')}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
